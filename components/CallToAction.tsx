"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 via-slate-950 to-blue-600/20 p-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Spin up your autonomous ecommerce squad
          </h2>
          <p className="max-w-2xl text-base text-slate-200">
            Drop in your catalog and policies, and Agentic Commerce OS will activate a
            cross-functional AI team that scales inventory, revenue, and customer trust.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#control"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Build my agent
            </Link>
            <Link
              href="mailto:hello@agentic-commerce.io"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/60"
            >
              Talk to a strategist
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-sm text-slate-100">
          <h3 className="text-lg font-semibold text-white">What happens next</h3>
          <ul className="mt-3 space-y-3">
            {[
              "Connect storefronts, marketing, and operations data sources.",
              "Upload playbooks, policies, and brand guardrails.",
              "Simulate mission plans in a sandbox before going live.",
              "Move to production with human-in-the-loop checkpoints."
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-white" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.45),_transparent_55%)]" />
      </div>
    </section>
  );
}
