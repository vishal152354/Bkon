"use client"

import { Upload, Cpu, LineChart } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Resume",
    description: "Drag and drop resumes in PDF or DOCX format. Upload multiple files at once.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analysis",
    description: "Our AI engine parses, extracts, and scores candidates in seconds.",
  },
  {
    icon: LineChart,
    step: "03",
    title: "Candidate Insights",
    description: "Get detailed reports on skills, experience, and hiring recommendations.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/30 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Three simple steps to transform your hiring process.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="size-6 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Step {step.step}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
