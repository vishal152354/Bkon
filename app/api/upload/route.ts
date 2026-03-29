import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// @ts-ignore
import pdfParse from "pdf-parse"

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      )
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { success: false, error: "Only PDF files are currently supported for parsing." },
        { status: 400 }
      )
    }

    // Convert file to Buffer for pdf-parse
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Parse the PDF
    let pdfText = ""
    try {
      const data = await pdfParse(buffer)
      pdfText = data.text
    } catch (parseError: any) {
      console.error("PDF Parsing Error:", parseError)
      return NextResponse.json(
        { success: false, error: "Failed to read text from PDF." },
        { status: 500 }
      )
    }

    if (!pdfText.trim()) {
      return NextResponse.json(
        { success: false, error: "PDF appears to be empty or unreadable." },
        { status: 400 }
      )
    }

    const schemaDefinition = `
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "linkedin": "string",
  "portfolio": "string",
  "skills": {
    "technical": ["string"],
    "soft": ["string"]
  },
  "experience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string",
      "achievements": ["string"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "university": "string",
      "year": "string"
    }
  ],
  "aiScore": number (0-100),
  "insights": {
    "strengths": ["string"],
    "weaknesses": ["string"],
    "missingSkills": ["string"],
    "recommendation": "string"
  }
}
    `

    // Use OpenAI to extract structured data via JSON mode
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert HR assistant and technical recruiter. Extract and evaluate candidate information from the following resume text. Output strictly valid JSON matching this schema: ${schemaDefinition}. Generate a random unique ID for the candidate. Give an AI score out of 100 based on the candidate's quality, experience, and formatting.`
        },
        { role: "user", content: pdfText },
      ],
      response_format: { type: "json_object" },
    })

    const responseContent = completion.choices[0]?.message?.content
    if (!responseContent) {
      throw new Error("Failed to parse candidate data from OpenAI")
    }

    const candidate = JSON.parse(responseContent)

    return NextResponse.json({ success: true, candidate })
  } catch (error: any) {
    console.error("Upload API Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
