import Link from "next/link"
import { Brain } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
            <Brain className="size-3.5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">ResumeAI</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          2026 ResumeAI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
