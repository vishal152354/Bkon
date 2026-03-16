"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, TrendingUp, Award } from "lucide-react"
import { candidates } from "@/lib/mock-data"
import Link from "next/link"
import { motion } from "framer-motion"

const stats = [
  { title: "Total Candidates", value: "132", icon: Users, change: "+12%" },
  { title: "Resumes Uploaded", value: "256", icon: FileText, change: "+8%" },
  { title: "Avg. AI Score", value: "78.4", icon: TrendingUp, change: "+3.2" },
  { title: "Top Score", value: "96", icon: Award, change: "David Kim" },
]

export default function DashboardPage() {
  const topCandidates = [...candidates].sort((a, b) => b.aiScore - a.aiScore).slice(0, 5)

  return (
    <>
      <DashboardHeader title="Dashboard" />
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Overview</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your hiring pipeline at a glance.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <stat.icon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <span className="text-xs text-primary">{stat.change}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Top Candidates</CardTitle>
                  <Link href="/dashboard/candidates" className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {topCandidates.map((candidate, index) => (
                    <motion.div
                      key={candidate.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={`/dashboard/candidates/${candidate.id}`}
                        className="flex items-center justify-between rounded-lg border border-border/50 p-4 transition-colors hover:bg-accent/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-sm font-medium text-primary">
                              {candidate.name.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{candidate.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {candidate.experience[0]?.role} at {candidate.experience[0]?.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="hidden flex-wrap gap-1.5 md:flex">
                            {candidate.skills.technical.slice(0, 3).map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs font-normal">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-sm font-bold text-primary">{candidate.aiScore}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
