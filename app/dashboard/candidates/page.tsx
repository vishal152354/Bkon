"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Upload, Loader2, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Candidate {
    id: string
    name: string
    email: string
    phone: string
    location: string
    linkedin: string
    portfolio: string
    skills: { technical: string[]; soft: string[] }
    experience: { company: string; role: string; duration: string }[]
    education: { degree: string; university: string; year: string }[]
    ai_score: number
    insights: { strengths: string[]; weaknesses: string[]; missingSkills: string[]; recommendation: string }
    file_url: string
    created_at: string
}

function scoreColor(score: number) {
    if (score >= 85) return "text-emerald-400"
    if (score >= 70) return "text-yellow-400"
    return "text-red-400"
}

function scoreBg(score: number) {
    if (score >= 85) return "bg-emerald-500/10"
    if (score >= 70) return "bg-yellow-500/10"
    return "bg-red-500/10"
}

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState<Candidate[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchCandidates() {
            setLoading(true)
            const { data, error } = await supabase
                .from("candidates")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) {
                setError(error.message)
            } else {
                setCandidates(data || [])
            }
            setLoading(false)
        }
        fetchCandidates()
    }, [])

    const filtered = candidates.filter(c =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.location?.toLowerCase().includes(search.toLowerCase()) ||
        c.skills?.technical?.some(s => s.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <>
            <DashboardHeader title="Candidates" />
            <div className="flex-1 overflow-auto p-6">
                <div className="mx-auto max-w-6xl">
                    {/* Header row */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">All Candidates</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {loading ? "Loading…" : `${candidates.length} candidate${candidates.length !== 1 ? "s" : ""} in your database`}
                            </p>
                        </div>
                        <Button asChild size="sm">
                            <Link href="/dashboard/upload">
                                <Upload className="mr-2 size-4" />
                                Upload Resume
                            </Link>
                        </Button>
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, email, location, or skill…"
                            className="pl-9"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {/* States */}
                    {loading && (
                        <div className="flex items-center justify-center py-24">
                            <Loader2 className="size-6 animate-spin text-muted-foreground" />
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
                            <AlertCircle className="size-5 shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {!loading && !error && filtered.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <Upload className="mb-4 size-12 text-muted-foreground/40" />
                            <p className="text-lg font-medium text-foreground">No candidates yet</p>
                            <p className="mt-1 text-sm text-muted-foreground">Upload a resume to see candidates here.</p>
                            <Button asChild className="mt-6" size="sm">
                                <Link href="/dashboard/upload">Upload your first resume</Link>
                            </Button>
                        </div>
                    )}

                    {/* Candidate cards */}
                    {!loading && !error && filtered.length > 0 && (
                        <div className="flex flex-col gap-3">
                            {filtered.map((candidate, index) => (
                                <motion.div
                                    key={candidate.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: index * 0.04 }}
                                >
                                    <Card className="border-border/50 transition-colors hover:border-border hover:bg-accent/30">
                                        <CardContent className="p-5">
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                {/* Left: Avatar + Info */}
                                                <div className="flex items-center gap-4">
                                                    <div className={`flex size-11 shrink-0 items-center justify-center rounded-full ${scoreBg(candidate.ai_score)}`}>
                                                        <span className={`text-sm font-bold ${scoreColor(candidate.ai_score)}`}>
                                                            {candidate.name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "?"}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-foreground">{candidate.name || "Unknown"}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {candidate.experience?.[0]?.role}
                                                            {candidate.experience?.[0]?.role && candidate.experience?.[0]?.company && " at "}
                                                            {candidate.experience?.[0]?.company}
                                                        </p>
                                                        <p className="mt-0.5 text-xs text-muted-foreground">{candidate.email} · {candidate.location}</p>
                                                    </div>
                                                </div>

                                                {/* Right: Skills + Score + File link */}
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <div className="hidden flex-wrap gap-1.5 md:flex">
                                                        {candidate.skills?.technical?.slice(0, 3).map(skill => (
                                                            <Badge key={skill} variant="secondary" className="text-xs font-normal">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    {candidate.file_url && (
                                                        <a
                                                            href={candidate.file_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                                            title="View resume PDF"
                                                        >
                                                            <ExternalLink className="size-3.5" />
                                                            Resume
                                                        </a>
                                                    )}
                                                    <div className={`flex size-11 items-center justify-center rounded-full ${scoreBg(candidate.ai_score)}`}>
                                                        <span className={`text-sm font-bold ${scoreColor(candidate.ai_score)}`}>
                                                            {candidate.ai_score ?? "–"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Insights summary */}
                                            {candidate.insights?.recommendation && (
                                                <p className="mt-3 border-t border-border/40 pt-3 text-xs italic text-muted-foreground line-clamp-2">
                                                    {candidate.insights.recommendation}
                                                </p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
