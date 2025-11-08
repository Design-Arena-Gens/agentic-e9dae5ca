"use client";

import { INTEGRATIONS } from "@/lib/data";
import clsx from "clsx";
import { motion } from "framer-motion";

const categories = ["Commerce", "Logistics", "Marketing", "Support", "Finance"] as const;

export default function IntegrationShowcase() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">Plug into your existing stack</h2>
          <p className="mt-2 max-w-3xl text-base text-slate-300">
            Native integrations sync catalog, orders, shipping, marketing, finance, and
            support. The agent monitors APIs, nudges vendors when thresholds break, and
            patches anomalies autonomously.
          </p>
        </div>
        <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-widest text-slate-300">
          50+ integrations
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 text-xs text-slate-400">
        {categories.map((category) => (
          <span
            key={category}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-1"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((integration, index) => (
          <motion.div
            key={integration.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className={clsx(
              "flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5",
              integration.category === "Commerce" && "border-emerald-400/30"
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-slate-400">
                {integration.category}
              </span>
            </div>
            <p className="text-sm text-slate-300">{integration.description}</p>
            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 text-xs font-medium text-emerald-200 transition hover:text-emerald-100"
            >
              Connect
              <span aria-hidden>→</span>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
