import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Mail, Linkedin, Send } from "lucide-react";
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Card className="overflow-hidden">
        <CardContent className="grid gap-8 p-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Badge className="mb-4">Contact</Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Built to feel professional from the first click to the last.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
              The final section should be calm, confident, and unmistakably premium.
            </p>
          </div>
          <div className="grid gap-3">
            <a
              href={`https://github.com/${site.github}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/75 transition hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3">
                <Github className="h-4 w-4 text-white/45" />
                <span>GitHub</span>
              </span>
              <span className="text-white/45">{site.github}</span>
            </a>
            <a
              href={`https://linkedin.com/in/${site.linkedIn}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/75 transition hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 text-white/45" />
                <span>LinkedIn</span>
              </span>
              <span className="text-white/45">Profile</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/75 transition hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/45" />
                <span>Email</span>
              </span>
              <span className="text-white/45">{site.email}</span>
            </a>
            <a href={`mailto:${site.email}`} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black">
              Send Message <Send className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
