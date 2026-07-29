"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Mail, Linkedin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
  const isConfigured = !!(serviceId && templateId && publicKey);

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;

    if (!isConfigured) {
      setStatus("error");
      setErrorMsg("Email service not configured. Please set up EmailJS environment variables.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      );

      if (result.status === 200) {
        setStatus("success");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message === "Failed to send message"
            ? "Could not send message. Please try again later."
            : "Network error. Please check your connection and try again."
          : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-white/10 bg-white/[0.02]">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-cyan-400/10 flex items-center justify-center border border-cyan-400/30 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                <CheckCircle2 className="h-6 w-6 text-cyan-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-white">Message Sent!</h3>
                <p className="max-w-md text-sm leading-6 text-white/60">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
              </div>
              <div className="p-4 rounded-2xl border border-white/8 bg-white/[0.02] w-full max-w-md text-xs font-mono text-white/50 text-center">
                Your message has been delivered successfully.
              </div>
              <button
                onClick={resetForm}
                className="h-11 px-6 rounded-2xl border border-white/12 bg-white/[0.04] text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Send Another
              </button>
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
              <Badge className="mb-4">Contact</Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl leading-tight">
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
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-sm text-white/70 transition hover:bg-white/[0.05] hover:border-cyan-400/30"
                aria-label={`GitHub profile @${site.github}`}
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
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-sm text-white/70 transition hover:bg-white/[0.05] hover:border-cyan-400/30"
                aria-label={`LinkedIn profile`}
              >
                <span className="flex items-center gap-3">
                  <Linkedin className="h-4.5 w-4.5 text-white/40" />
                  <span>LinkedIn</span>
                </span>
                <span className="text-xs font-mono text-white/40">Profile</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-sm text-white/70 transition hover:bg-white/[0.05] hover:border-cyan-400/30"
                aria-label={`Send email to ${site.email}`}
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
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl"
            >
              <input type="hidden" name="to_name" value={site.name} />
              <input type="hidden" name="from_name" value={name} />
              <input type="hidden" name="name" value={name} />
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="reply_to" value={email} />
              <input type="hidden" name="title" value="Portfolio Contact Inquiry" />

              <div>
                <label htmlFor="contact-name" className="block text-xs uppercase tracking-[0.25em] text-white/45 mb-2 font-mono">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="from_name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alan Turing"
                   className="w-full h-11 px-4 text-sm text-white placeholder-white/20 rounded-2xl border border-white/10 bg-white/[0.03] focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/25 outline-none transition"
                  disabled={status === "sending"}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs uppercase tracking-[0.25em] text-white/45 mb-2 font-mono">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="reply_to"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alan@turing.org"
                  className="w-full h-11 px-4 text-sm text-white placeholder-white/20 rounded-2xl border border-white/10 bg-white/[0.03] focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/25 outline-none transition"
                  disabled={status === "sending"}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs uppercase tracking-[0.25em] text-white/45 mb-2 font-mono">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry, project, or idea..."
                  className="w-full p-4 text-sm text-white placeholder-white/20 rounded-2xl border border-white/10 bg-white/[0.03] focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/25 outline-none transition resize-none"
                  disabled={status === "sending"}
                />
              </div>

              {status === "error" && (
                <div className="flex items-start gap-2 rounded-2xl border border-red/20 bg-red/[0.04] p-3" role="alert">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red" />
                  <p className="text-xs text-white/60">{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black font-semibold text-sm hover:translate-y-[-1px] hover:shadow-[0_0_35px_rgba(79,209,255,.25)] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
