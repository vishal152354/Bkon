import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

// @ts-ignore
import pdfParse from "pdf-parse"

export const runtime = "nodejs"

const STORAGE_BUCKET = "resumes"

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Prefer the server-only key, but fall back to the current env name so existing setups keep working.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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

    // Upload to Supabase Storage
    const fileExtension = file.name.split('.').pop()
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`
    const filePath = `candidates/${uniqueFileName}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, buffer, {
        contentType: "application/pdf",
        upsert: false,
      })

    if (uploadError) {
      console.error("Supabase upload error:", uploadError)
      return NextResponse.json(
        { success: false, error: uploadError.message || "Failed to upload to Supabase." },
        { status: 500 }
      )
    }

    const { data: publicUrlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath)

    let candidate = null
    let warning: string | null = null
    let pdfText = ""

    try {
      const data = await pdfParse(buffer)
      pdfText = data.text
    } catch (parseError: any) {
      console.error("PDF Parsing Error:", parseError)
      warning = parseError.message || "The file was uploaded, but the PDF text could not be read."
    }

    if (!warning && !pdfText.trim()) {
      warning = "The file was uploaded, but the PDF appears to be empty or unreadable."
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

    if (!warning) {
      try {
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

        candidate = JSON.parse(responseContent)
      } catch (candidateError: any) {
        console.error("Candidate extraction error:", candidateError)
        warning = candidateError.message || "The file was uploaded, but candidate extraction failed."
      }
    }

    return NextResponse.json({
      success: true,
      candidate,
      path: uploadData.path,
      url: publicUrlData.publicUrl,
      warning,
    })
  } catch (error: any) {
    console.error("Upload API Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
