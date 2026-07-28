"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Mail, Linkedin, Send } from "lucide-react";
import { site } from "@/lib/site";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mailDraftUrl, setMailDraftUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;
    
    const subject = `Portfolio Inquiry from ${trimmedName}`;
    const bodyText = `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`;
    const mailtoUrl = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

    setMailDraftUrl(mailtoUrl);
    setSubmitted(true);
    
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(bodyText)
        .then(() => setCopied(true))
        .catch(() => setCopied(false));
    }
    
    window.location.href = mailtoUrl;
  };

  if (submitted) {
    return (
      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-white/10 bg-white/[0.02]">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-[#ffa550]/10 flex items-center justify-center border border-[#ffa550]/30 shadow-[0_0_20px_rgba(255,165,0,0.15)]">
              <Send className="h-6 w-6 text-[#ffa550]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-white">Message Drafted!</h3>
              <p className="max-w-md text-sm leading-6 text-white/60">
                Your email client should open to send the message. If it didn&apos;t, click below to open it manually.
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-white/8 bg-white/[0.02] w-full max-w-md text-xs font-mono text-white/50 text-center">
              {copied ? "✓ Copied drafted message to your clipboard for easy pasting!" : "Message drafted successfully."}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-sm justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                  setCopied(false);
                  setMailDraftUrl("");
                }}
                className="h-11 px-6 rounded-2xl border border-white/12 bg-white/[0.04] text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Send Another
              </button>
              <a
                href={mailDraftUrl || `mailto:${site.email}`}
                className="h-11 px-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black text-sm font-semibold hover:translate-y-[-1px] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                Open Email App
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Card className="overflow-hidden border-white/10 bg-white/[0.02]">
        <CardContent className="grid gap-10 p-8 lg:grid-cols-[1fr_1.1fr] lg:p-12">
          <div className="flex flex-col justify-between space-y-8">
            <div>
              <Badge className="mb-4 border-[#ffa550]/20 bg-[#ffa550]/6 text-[#ffa550]">Contact</Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl leading-tight font-display">
                Built to feel professional from first click to last.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
                Let&apos;s build something together. Connect with me directly or use the secure message form.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={`https://github.com/${site.github}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-sm text-white/70 transition hover:bg-white/[0.05] hover:border-[#ffa550]/30"
              >
                <span className="flex items-center gap-3">
                  <Github className="h-4.5 w-4.5 text-white/40" />
                  <span>GitHub</span>
                </span>
                <span className="text-xs font-mono text-white/40">@{site.github}</span>
              </a>
              <a
                href={`https://linkedin.com/in/${site.linkedIn}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-sm text-white/70 transition hover:bg-white/[0.05] hover:border-[#ffa550]/30"
              >
                <span className="flex items-center gap-3">
                  <Linkedin className="h-4.5 w-4.5 text-white/40" />
                  <span>LinkedIn</span>
                </span>
                <span className="text-xs font-mono text-white/40">Profile</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-sm text-white/70 transition hover:bg-white/[0.05] hover:border-[#ffa550]/30"
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-4.5 w-4.5 text-white/40" />
                  <span>Email</span>
                </span>
                <span className="text-xs font-mono text-white/40">{site.email}</span>
              </a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-[0.25em] text-white/45 mb-2 font-mono">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alan Turing"
                  className="w-full h-11 px-4 text-sm text-white placeholder-white/20 rounded-2xl border border-white/10 bg-white/[0.03] focus:border-[#ffa550] focus:ring-1 focus:ring-[#ffa550]/35 outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[0.25em] text-white/45 mb-2 font-mono">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alan@turing.org"
                  className="w-full h-11 px-4 text-sm text-white placeholder-white/20 rounded-2xl border border-white/10 bg-white/[0.03] focus:border-[#ffa550] focus:ring-1 focus:ring-[#ffa550]/35 outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-[0.25em] text-white/45 mb-2 font-mono">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry, project, or idea..."
                  className="w-full p-4 text-sm text-white placeholder-white/20 rounded-2xl border border-white/10 bg-white/[0.03] focus:border-[#ffa550] focus:ring-1 focus:ring-[#ffa550]/35 outline-none transition resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black font-semibold text-sm hover:translate-y-[-1px] hover:shadow-[0_0_35px_rgba(255,140,0,.25)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
