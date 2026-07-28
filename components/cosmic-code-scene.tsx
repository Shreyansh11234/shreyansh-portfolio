"use client";

import { BrainCircuit, Code2, Cpu, GitBranch, Orbit, Rocket, Satellite, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const nodes = [
  { label: "AI", x: 18, y: 26, icon: BrainCircuit },
  { label: "Code", x: 68, y: 18, icon: Code2 },
  { label: "Robotics", x: 76, y: 58, icon: Cpu },
  { label: "Cosmos", x: 25, y: 70, icon: Orbit },
  { label: "Research", x: 52, y: 78, icon: Satellite }
];

const codeLines = [
  { no: "01", code: <><span className="text-[#8fb0ff]">type</span> Stack = <span className="text-[#ffd18a]">&quot;ai&quot;</span> | <span className="text-[#ffd18a]">&quot;astro&quot;</span> | <span className="text-[#ffd18a]">&quot;bot&quot;</span>;</> },
  { no: "02", code: <><span className="text-[#8fb0ff]">const</span> kernel = <span className="text-[#ffa550]">await</span> bootLab&lt;Stack&gt;();</> },
  { no: "03", code: <>kernel.scan(<span className="text-[#ffd18a]">&quot;deep-space&quot;</span>, telemetry.raw);</> },
  { no: "04", code: <>agent.optimize(<span className="text-white/35">&#123; </span>math: <span className="text-[#ffd18a]">&quot;jee&quot;</span><span className="text-white/35"> &#125;</span>);</> },
  { no: "05", code: <><span className="text-[#66d982]">return</span> deploy.edge(research.next());</> }
];

export function CosmicCodeScene() {
  const orbitX = useSpring(useMotionValue(0), { stiffness: 90, damping: 24 });
  const orbitY = useSpring(useMotionValue(0), { stiffness: 90, damping: 24 });
  const orbitRotate = useSpring(useMotionValue(0), { stiffness: 80, damping: 26 });

  return (
    <div className="relative min-h-[540px] overflow-visible lg:min-h-[680px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_44%,rgba(255,165,80,0.22),transparent_34%),radial-gradient(circle_at_76%_24%,rgba(108,166,255,0.18),transparent_34%),radial-gradient(circle_at_44%_62%,rgba(255,255,255,0.06),transparent_48%)] opacity-90" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-45 [mask-image:radial-gradient(circle_at_50%_48%,black,transparent_76%)]" />

      <motion.div
        style={{ x: orbitX, y: orbitY, rotate: orbitRotate }}
        className="absolute inset-x-4 top-8 h-[440px] cursor-crosshair"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const nextX = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
          const nextY = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
          orbitX.set(nextX);
          orbitY.set(nextY);
          orbitRotate.set(nextX / 9);
        }}
        onMouseLeave={() => {
          orbitX.set(0);
          orbitY.set(0);
          orbitRotate.set(0);
        }}
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M18 26 C32 14 52 12 68 18" className="cosmic-path" />
          <path d="M68 18 C82 33 84 48 76 58" className="cosmic-path" />
          <path d="M76 58 C68 72 58 80 52 78" className="cosmic-path" />
          <path d="M52 78 C39 82 28 77 25 70" className="cosmic-path" />
          <path d="M25 70 C12 55 10 38 18 26" className="cosmic-path" />
          <path d="M18 26 C36 45 54 48 76 58" className="cosmic-path cosmic-path-strong" />
          <path d="M25 70 C40 48 55 33 68 18" className="cosmic-path cosmic-path-strong" />
        </svg>

        <div className="absolute left-[22%] top-[18%] h-72 w-72 rounded-full border border-white/10 opacity-60" />
        <div className="absolute right-[12%] top-[20%] h-96 w-96 rounded-full border border-[#ffa550]/15 opacity-70" />
        <div className="absolute left-[40%] top-[34%] h-52 w-52 rounded-full border border-[#8fb0ff]/20 opacity-80" />

        <div className="absolute left-1/2 top-[46%] z-20 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_0_55px_rgba(255,165,80,0.16)]">
          <div className="absolute inset-4 rounded-[1.45rem] border border-dashed border-[#ffa550]/32" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#ffa550]/70 to-transparent" />
          <div className="absolute inset-y-8 right-0 w-px bg-gradient-to-b from-transparent via-[#8fb0ff]/70 to-transparent" />
          <div className="grid h-20 w-20 place-items-center rounded-2xl border border-white/15 bg-white/[0.08]">
            <Sparkles className="h-8 w-8 text-[#ffa550]" />
          </div>
        </div>

        {nodes.map((node, index) => {
          const Icon = node.icon;

          return (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12 + index * 0.08, duration: 0.5 }}
              className="absolute z-30 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/12 bg-black/35 px-3 py-2 text-xs font-medium text-white/78 backdrop-blur-xl"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <Icon className="h-4 w-4 text-[#ffa550]" />
              {node.label}
            </motion.div>
          );
        })}

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          className="absolute right-[18%] top-[13%] z-20 grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.03]"
        >
          <Rocket className="h-6 w-6 text-white/70" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="absolute left-[12%] top-[54%] z-20 grid h-14 w-14 place-items-center rounded-full border border-[#8fb0ff]/20 bg-white/[0.035]"
        >
          <GitBranch className="h-5 w-5 text-[#8fb0ff]" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-8 right-8 z-30 grid gap-4 lg:grid-cols-[1.5fr_0.75fr]">
        <div className="rounded-[1.6rem] border border-white/10 bg-[#090608]/80 p-5 font-mono text-[11px] text-white/68 shadow-[0_18px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2 text-white/35">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff665c]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd4a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#66d982]" />
            <span className="ml-2">mission.ts</span>
            <span className="ml-auto text-[10px] uppercase tracking-[0.22em] text-[#ffa550]/55">prod</span>
          </div>
          <div className="space-y-2">
            {codeLines.map((line) => (
              <p key={line.no} className="grid grid-cols-[2ch_1fr] gap-4">
                <span className="select-none text-right text-white/22">{line.no}</span>
                <span>{line.code}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.32em] text-white/35">Current Signal</p>
          <p className="mt-3 text-lg font-semibold text-white">Cosmic AI Builder</p>
          <p className="mt-2 text-sm leading-6 text-white/58">Robotics, research, code, and space science in one working system.</p>
        </div>
      </div>
    </div>
  );
}
