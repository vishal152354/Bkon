"use client"

import { FileSearch, Brain, BarChart3, Target } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: FileSearch,
    title: "AI Resume Parsing",
    description: "Extract structured data from any resume format with high accuracy using advanced NLP models.",
  },
  {
    icon: Brain,
    title: "Candidate Skill Extraction",
    description: "Automatically identify and categorize technical and soft skills from candidate profiles.",
  },
  {
    icon: Target,
    title: "Automated Candidate Scoring",
    description: "AI-powered scoring system ranks candidates based on role fit and experience level.",
  },
  {
    icon: BarChart3,
    title: "HR Analytics Dashboard",
    description: "Comprehensive analytics to track hiring trends, skill gaps, and candidate pipelines.",
  },
]

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">
            Everything you need to hire smarter
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Powerful AI tools designed to streamline your entire recruitment workflow.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50 bg-card transition-colors hover:bg-accent/50">
                <CardContent className="flex gap-5 p-6">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
