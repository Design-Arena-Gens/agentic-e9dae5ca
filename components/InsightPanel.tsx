"use client";

import { INSIGHTS, PLAYBOOKS } from "@/lib/data";
import { motion } from "framer-motion";

export default function InsightPanel() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">Real-time command intelligence</h2>
          <p className="mt-2 max-w-3xl text-base text-slate-300">
            Telemetry from every automation is consolidated into a single control plane.
            Leaders get prioritized insights, what-if projections, and suggested playbooks
            when leading indicators move.
          </p>
        </div>
        <div className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-slate-300">
          Reinforcement learning insights
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {INSIGHTS.map((insight) => (
              <div
                key={insight.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-400">
                  <span>{insight.title}</span>
                  <span>{insight.timeframe}</span>
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-semibold text-white">{insight.value}</span>
                  <span
                    className={
                      insight.trend === "up"
                        ? "text-emerald-300"
                        : insight.trend === "down"
                        ? "text-rose-300"
                        : "text-slate-300"
                    }
                  >
                    {insight.delta}
                  </span>
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  Agent recommendation: adjust guardrails to maintain streak—deviation under
                  3% triggers escalation.
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Suggested playbooks</h3>
              <p className="mt-1 text-xs text-slate-400">
                Generated from cross-signal anomaly detection and cohort behavior.
              </p>
            </div>
            <div className="space-y-4 text-sm text-slate-300">
              {PLAYBOOKS.map((playbook) => (
                <div
                  key={playbook.name}
                  className="rounded-2xl border border-white/10 bg-transparent p-4"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-400">
                    <span>{playbook.name}</span>
                    <span>{playbook.cadence}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-200">{playbook.goal}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    Lever: {playbook.lever}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-300">
                    {playbook.inputs.map((input) => (
                      <span
                        key={input}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                      >
                        {input}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-auto inline-flex items-center justify-center rounded-xl border border-emerald-400/60 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20"
            >
              Deploy selected playbooks
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
