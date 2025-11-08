"use client";

import { WORKFLOW_STAGES } from "@/lib/data";
import { motion } from "framer-motion";

export default function AutomationTimeline() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">
            Operational cadence · 24/7 agent-to-agent loop
          </h2>
          <p className="mt-2 max-w-3xl text-base text-slate-300">
            Autonomous specialists coordinate through shared state, orchestrating a
            closed loop from market sensing to CX assurance. Every stage is observable and
            interruptible for human review.
          </p>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-slate-300">
          Guardrails enforced
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        {WORKFLOW_STAGES.map((stage, index) => (
          <motion.article
            key={stage.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
              {stage.id}
            </span>
            <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
            <p className="text-sm text-slate-300">{stage.description}</p>
            <div className="mt-auto space-y-3 text-xs text-slate-400">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span>Owner</span>
                <span className="font-medium text-slate-200">{stage.owner}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span>Duration</span>
                <span className="font-medium text-slate-200">{stage.duration}</span>
              </div>
              <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-emerald-100">
                {stage.checkpoint}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
