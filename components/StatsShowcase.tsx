"use client";

import { motion } from "framer-motion";

const stats = [
  {
    label: "Average time saved on ops",
    value: "68%",
    annotation: "Compared to manual workflows"
  },
  {
    label: "Lift in net revenue",
    value: "+24%",
    annotation: "Across DTC & marketplace channels"
  },
  {
    label: "Tickets auto-resolved",
    value: "82%",
    annotation: "With human-quality guardrails"
  },
  {
    label: "Fulfillment incidents",
    value: "-41%",
    annotation: "Due to predictive routing"
  }
];

export default function StatsShowcase() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 sm:p-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-inner"
          >
            <p className="text-xs uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
            <p className="mt-2 text-xs text-slate-400">{stat.annotation}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
