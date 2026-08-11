"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Github, Mail, Linkedin, Send, Loader2, CheckCircle2, AlertCircle, Radio } from "lucide-react";
import { site } from "@/lib/site";
import { MagneticButton } from "@/components/magnetic-button";

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
      const result = await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey);
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
      <section id="contact" className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 shadow-[0_0_30px_rgba(255,160,60,0.15)]">
            <CheckCircle2 className="h-7 w-7 text-cyan" />
          </div>
          <h3 className="mt-6 font-space text-2xl font-semibold uppercase text-white">Connection Established</h3>
          <p className="mt-3 text-sm text-white/55">Thank you for reaching out. I&apos;ll respond as soon as possible.</p>
          <MagneticButton
            onClick={resetForm}
            className="mt-8 h-11 rounded-full border border-white/12 bg-white/5 px-6 text-sm text-white hover:bg-white/10"
          >
            Send Another Message
          </MagneticButton>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel overflow-hidden rounded-3xl"
      >
        <div className="border-b border-white/6 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Radio className="h-4 w-4 text-cyan animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/70">
                Establish Connection
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              STATUS: READY
            </div>
          </div>
        </div>

        <div className="grid gap-10 p-8 lg:grid-cols-[1fr_1.1fr] lg:p-10">
          <div className="flex flex-col justify-between space-y-8">
            <div>
              <Badge className="mb-4">Contact</Badge>
              <h2 className="font-space text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
                AI Terminal
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
                Initiate a secure communication channel. Connect directly or transmit a message through the terminal.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                { icon: Github, label: "GitHub", href: `https://github.com/${site.github}`, meta: `@${site.github}` },
                { icon: Linkedin, label: "LinkedIn", href: `https://linkedin.com/in/${site.linkedIn}`, meta: "Profile" },
                { icon: Mail, label: "Email", href: `mailto:${site.email}`, meta: site.email }
              ].map(({ icon: Icon, label, href, meta }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noreferrer" : undefined}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-sm text-white/65 transition hover:border-cyan/25 hover:bg-white/[0.04]"
                  data-cursor="link"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-white/35" />
                    {label}
                  </span>
                  <span className="max-w-[180px] truncate font-mono text-[10px] text-white/35">{meta}</span>
                </a>
              ))}
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/8 bg-black/20 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">{">"} transmit_message</p>

            <input type="hidden" name="to_name" value={site.name} />
            <input type="hidden" name="from_name" value={name} />
            <input type="hidden" name="name" value={name} />
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="reply_to" value={email} />
            <input type="hidden" name="title" value="Portfolio Contact Inquiry" />

            {[
              { id: "contact-name", label: "Sender ID", name: "from_name", type: "text", value: name, set: setName, placeholder: "Your name" },
              { id: "contact-email", label: "Return Channel", name: "reply_to", type: "email", value: email, set: setEmail, placeholder: "your@email.com" }
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  required
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20"
                  disabled={status === "sending"}
                />
              </div>
            ))}

            <div>
              <label htmlFor="contact-message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Payload
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry, project, or idea..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white placeholder-white/20 outline-none transition focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20"
                disabled={status === "sending"}
              />
            </div>

            {status === "error" && (
              <div className="flex items-start gap-2 rounded-xl border border-red/20 bg-red/[0.04] p-3" role="alert">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red" />
                <p className="text-xs text-white/60">{errorMsg}</p>
              </div>
            )}

            <MagneticButton
              type="submit"
              disabled={status === "sending"}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-semibold text-sm text-black transition hover:shadow-[0_0_35px_rgba(255,160,60,0.25)] disabled:opacity-50"
              data-cursor="ring"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Transmitting...
                </>
              ) : (
                <>
                  Establish Connection
                  <Send className="h-4 w-4" />
                </>
              )}
            </MagneticButton>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
