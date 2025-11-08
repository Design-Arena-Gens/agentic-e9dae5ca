"use client";

import { CAPABILITY_CATEGORIES } from "@/lib/data";
import clsx from "clsx";
import { motion } from "framer-motion";

export default function CapabilityMatrix() {
  return (
    <section
      id="capabilities"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-slate-900/0 to-blue-500/10" />
      <div className="relative z-10 space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              Four autonomous departments orchestrated by a single agentic core
            </h2>
            <p className="mt-2 max-w-3xl text-base text-slate-300">
              Specialist agents collaborate using a shared knowledge graph and
              policy engine. Each pillar senses signals, recommends strategy,
              and executes tasks—while respecting global guardrails.
            </p>
          </div>
          <div className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-wider text-slate-300">
            Commerce Brain 24/7
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {CAPABILITY_CATEGORIES.map((capability, index) => (
            <motion.article
              key={capability.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="gradient-border relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-6"
            >
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-white">
                    {capability.title}
                  </h3>
                  <div className="flex gap-2">
                    {capability.metrics?.map((metric) => (
                      <span
                        key={metric.label}
                        className="flex flex-col rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        <span className="font-semibold text-white">
                          {metric.value}
                        </span>
                        <span className="uppercase tracking-widest">
                          {metric.label}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-300">
                  {capability.description}
                </p>
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider text-slate-400">
                    Focus areas
                  </span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {capability.focusAreas.map((item) => (
                      <span
                        key={item}
                        className={clsx(
                          "flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200",
                          "hover:border-emerald-400/40 hover:bg-emerald-500/10 transition"
                        )}
                      >
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
