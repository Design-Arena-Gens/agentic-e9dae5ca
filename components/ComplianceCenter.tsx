"use client";

import { motion } from "framer-motion";

const guardrails = [
  {
    title: "Financial guardrails",
    description:
      "Protect margin floors, ad spend ceilings, and cash flow posture with real-time level approvals.",
    checkpoints: [
      "Margin floor enforcement with dynamic throttling",
      "Budget pacing with anomaly detection",
      "Automatic reconciliation with accounting exports"
    ]
  },
  {
    title: "Operational guardrails",
    description:
      "Define fulfillment SLAs, acceptable carrier mix, and exception thresholds—auto-escalated to humans when limits break.",
    checkpoints: [
      "Per-channel SLA monitors",
      "3PL capacity alarms",
      "Reverse logistics routing"
    ]
  },
  {
    title: "Trust & brand guardrails",
    description:
      "Calibrate tone, approvals, and brand voice across support, social, and marketing content.",
    checkpoints: [
      "Tone governance with LLM policy checks",
      "Escalation routing by sentiment",
      "Review defense with auto-reply drafts"
    ]
  }
];

export default function ComplianceCenter() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">Guarded autonomy</h2>
          <p className="mt-2 max-w-3xl text-base text-slate-300">
            Human operators stay in control with transparent policies, audit trails, and
            mandatory confirmations for high-risk decisions. The agent executes inside
            your guardrails—never outside.
          </p>
        </div>
        <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-slate-300">
          SOC2-ready audit trail
        </span>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {guardrails.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-slate-300">{item.description}</p>
            <ul className="space-y-3 text-sm text-slate-300">
              {item.checkpoints.map((checkpoint) => (
                <li key={checkpoint} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                  <span>{checkpoint}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-auto inline-flex items-center gap-2 text-xs font-medium text-slate-200 transition hover:text-white"
            >
              Edit policy
              <span aria-hidden>→</span>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
