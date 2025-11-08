"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const heroHighlights = [
  { label: "GMV orchestrated", value: "$132M" },
  { label: "Automated workflows", value: "210+" },
  { label: "CX SLA compliance", value: "97%" }
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 p-10 shadow-subtle">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-70" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Autonomous Commerce OS
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Deploy an agent that runs your entire ecommerce operation end to end
          </h1>
          <p className="text-lg text-slate-300">
            Agentic Commerce OS assembles autonomous specialists across
            merchandising, inventory, revenue, and customer trust. It senses,
            decides, and executes so your store scales without adding headcount.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#control"
              className="inline-flex items-center justify-center rounded-full bg-agent-primary px-5 py-3 text-base font-medium text-white shadow-lg shadow-agent-primary/30 transition hover:shadow-agent-primary/45"
            >
              Launch Control Center
            </Link>
            <Link
              href="#capabilities"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-base font-medium text-slate-200 transition hover:border-white/40 hover:text-white"
            >
              Explore Capabilities
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur"
        >
          <div className="absolute inset-x-10 -top-10 hidden h-10 rounded-full bg-gradient-to-r from-emerald-500/80 via-sky-500/60 to-indigo-500/70 blur-3xl md:block" />
          <h2 className="text-sm uppercase tracking-widest text-slate-400">
            Mission Snapshot
          </h2>
          <div className="space-y-5">
            {heroHighlights.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="text-sm text-slate-400">{item.label}</span>
                <span className="text-lg font-semibold text-white">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-400">
            Guardrails enforced across finance, ops, growth, and customer
            support with no-code policy builder and human-in-the-loop handoffs.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
