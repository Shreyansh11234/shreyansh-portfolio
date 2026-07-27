import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, FileText, Sigma, Microscope, BookMarked } from "lucide-react";

export default function ResearchPage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60">
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(83,126,255,.18),transparent_30%),rgba(255,255,255,.03)] p-8 backdrop-blur-xl">
          <Badge>ETH Research</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">Emergent Time Hypothesis</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">
            A university-style research page for an original investigation into time, dimensions, and mathematical structure.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["Abstract", "A concise framing of the hypothesis and its scope."],
              ["Research Goals", "Define the problem, assumptions, and model boundaries."],
              ["Current Progress", "Track literature review, proof fragments, and revisions."],
              ["Timeline", "Plan draft, revision, feedback, and publication stages."],
              ["Future Publication", "Map the path toward a formal paper."],
              ["Research Notes", "Keep diagrams, equations, and references in one place."]
            ].map(([title, text]) => (
              <Card key={title}>
                <CardContent className="p-5">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                    <FileText className="h-4 w-4 text-[#8baeff]" />
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-white/60">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <Sigma className="h-4 w-4 text-[#8baeff]" />
                  <h2 className="text-lg font-semibold text-white">Mathematical Development</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  This space is designed for formulas, theorem notes, assumptions, derivations, and a disciplined proof log.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <Microscope className="h-4 w-4 text-[#8baeff]" />
                  <h2 className="text-lg font-semibold text-white">Paper Status</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/60">Drafting • Reviewing • Expanding</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2">
              <BookMarked className="h-4 w-4 text-[#8baeff]" />
              <h2 className="text-lg font-semibold text-white">Future Goals</h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Submit a scientifically responsible version of the theory, refine the math, and continue asking the kind of questions that outlast school.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
