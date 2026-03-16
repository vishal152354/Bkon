"use client"

import { useState, useCallback } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, CheckCircle2, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { candidates } from "@/lib/mock-data"
import Link from "next/link"
import { toast } from "sonner"

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  progress: number
  status: "uploading" | "processing" | "done"
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [showParsed, setShowParsed] = useState(false)

  const simulateUpload = useCallback((fileName: string) => {
    const id = Math.random().toString(36).substring(7)
    const newFile: UploadedFile = {
      id,
      name: fileName,
      size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
      type: fileName.endsWith(".pdf") ? "PDF" : "DOCX",
      progress: 0,
      status: "uploading",
    }
    setFiles(prev => [...prev, newFile])

    const interval = setInterval(() => {
      setFiles(prev =>
        prev.map(f => {
          if (f.id !== id) return f
          if (f.progress >= 100) {
            clearInterval(interval)
            return { ...f, progress: 100, status: "done" as const }
          }
          const newProgress = Math.min(f.progress + Math.random() * 30 + 10, 100)
          return {
            ...f,
            progress: newProgress,
            status: newProgress >= 100 ? "done" as const : newProgress >= 70 ? "processing" as const : "uploading" as const,
          }
        })
      )
    }, 500)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const droppedFiles = Array.from(e.dataTransfer.files)
      droppedFiles.forEach(file => simulateUpload(file.name))
      toast.success(`${droppedFiles.length} file(s) uploaded`)
    },
    [simulateUpload]
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    selectedFiles.forEach(file => simulateUpload(file.name))
    toast.success(`${selectedFiles.length} file(s) uploaded`)
  }

  const handleDemoUpload = () => {
    const demoFiles = ["Sarah_Chen_Resume.pdf", "Marcus_Johnson_CV.pdf", "Emily_Rodriguez_Resume.docx"]
    demoFiles.forEach((name, i) => {
      setTimeout(() => simulateUpload(name), i * 300)
    })
    toast.success("Demo files uploaded")
    setTimeout(() => setShowParsed(true), 4000)
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  return (
    <>
      <DashboardHeader title="Resume Upload" />
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Upload Resumes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload candidate resumes for AI-powered analysis.
            </p>
          </div>

          <Card className="border-border/50">
            <CardContent className="p-0">
              <div
                className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Upload className="size-6 text-primary" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  Drop your resumes here
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  or click to browse. Supports PDF and DOCX.
                </p>
                <div className="mt-6 flex gap-3">
                  <label>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx"
                      multiple
                      onChange={handleFileInput}
                    />
                    <Button variant="outline" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                  <Button onClick={handleDemoUpload}>
                    Upload Demo Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="mb-4 text-sm font-semibold text-foreground">Uploaded Files</h3>
                <div className="flex flex-col gap-3">
                  {files.map(file => (
                    <motion.div
                      key={file.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Card className="border-border/50">
                        <CardContent className="flex items-center gap-4 p-4">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <FileText className="size-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-foreground">{file.name}</p>
                              <Badge variant="secondary" className="text-xs">{file.type}</Badge>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{file.size}</span>
                              {file.status === "uploading" && (
                                <span className="text-xs text-muted-foreground">Uploading...</span>
                              )}
                              {file.status === "processing" && (
                                <span className="flex items-center gap-1 text-xs text-primary">
                                  <Loader2 className="size-3 animate-spin" />
                                  Processing...
                                </span>
                              )}
                              {file.status === "done" && (
                                <span className="flex items-center gap-1 text-xs text-chart-2">
                                  <CheckCircle2 className="size-3" />
                                  Complete
                                </span>
                              )}
                            </div>
                            {file.progress < 100 && (
                              <Progress value={file.progress} className="mt-2 h-1" />
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="size-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showParsed && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="mb-4 text-sm font-semibold text-foreground">Parsed Candidates</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {candidates.slice(0, 3).map((candidate, index) => (
                    <motion.div
                      key={candidate.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/dashboard/candidates/${candidate.id}`}>
                        <Card className="border-border/50 transition-colors hover:bg-accent/50">
                          <CardContent className="p-5">
                            <div className="flex items-center gap-3">
                              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                                <span className="text-sm font-medium text-primary">
                                  {candidate.name.split(" ").map(n => n[0]).join("")}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{candidate.name}</p>
                                <p className="text-xs text-muted-foreground">{candidate.experience[0]?.role}</p>
                              </div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {candidate.skills.technical.slice(0, 4).map(skill => (
                                <Badge key={skill} variant="secondary" className="text-xs font-normal">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">AI Score</span>
                              <span className="text-sm font-bold text-primary">{candidate.aiScore}/100</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
