"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

type StoreConfig = {
  storeName: string;
  vertical: string;
  revenueTarget: number;
  marginFloor: number;
  marketingFocus: "Retention" | "Acquisition" | "Marketplace";
  riskTolerance: "conservative" | "balanced" | "aggressive";
  shippingPromise: "24h" | "48h" | "72h";
  autopilot: {
    inventory: boolean;
    growth: boolean;
    support: boolean;
  };
};

type AutomationTask = {
  id: string;
  title: string;
  owner: string;
  impact: string;
  status: "Queued" | "Executing" | "Monitoring";
  linkedKPIs: string[];
};

type Activity = {
  id: string;
  message: string;
  timestamp: string;
  agent: string;
};

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const initialConfig: StoreConfig = {
  storeName: "Nova Mercantile",
  vertical: "Lifestyle & Apparel",
  revenueTarget: 550000,
  marginFloor: 0.32,
  marketingFocus: "Retention",
  riskTolerance: "balanced",
  shippingPromise: "48h",
  autopilot: {
    inventory: true,
    growth: true,
    support: true
  }
};

const initialTasks: AutomationTask[] = [
  {
    id: "AT-218",
    title: "Launch spring capsule on Shopify & Amazon",
    owner: "Merchandising",
    impact: "Topline",
    status: "Executing",
    linkedKPIs: ["GMV", "Conversion"]
  },
  {
    id: "AT-219",
    title: "Replenish core SKUs via 3PL network",
    owner: "Inventory",
    impact: "Availability",
    status: "Monitoring",
    linkedKPIs: ["Fill rate", "Stockouts"]
  },
  {
    id: "AT-220",
    title: "Trigger win-back lifecycle for lapsed VIPs",
    owner: "Growth",
    impact: "Retention",
    status: "Queued",
    linkedKPIs: ["Repeat rate", "LTV"]
  }
];

const initialActivity: Activity[] = [
  {
    id: "LOG-1",
    message:
      "Revenue agent redeployed paid budget from Meta to Google where RoAS > 4.5x.",
    timestamp: now(),
    agent: "Revenue Agent"
  },
  {
    id: "LOG-2",
    message:
      "Inventory agent synchronized 720 inbound units to ShipBob Dallas for 48h promise.",
    timestamp: now(),
    agent: "Inventory Agent"
  },
  {
    id: "LOG-3",
    message:
      "Trust agent escalated 2% of support tickets for human review—policy guardrail triggered.",
    timestamp: now(),
    agent: "Trust Agent"
  }
];

const marketingOptions: StoreConfig["marketingFocus"][] = [
  "Retention",
  "Acquisition",
  "Marketplace"
];

const riskLabels: Record<StoreConfig["riskTolerance"], string> = {
  conservative: "Conservative · Protect margin",
  balanced: "Balanced · Optimize for profit & growth",
  aggressive: "Aggressive · Capture market share"
};

const shippingLabels: Record<StoreConfig["shippingPromise"], string> = {
  "24h": "Prime speed (24h)",
  "48h": "Expedited (48h)",
  "72h": "Standard (72h)"
};

export default function AgentControlPanel() {
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(initialConfig);
  const [tasks, setTasks] = useState<AutomationTask[]>(initialTasks);
  const [activityLog, setActivityLog] = useState<Activity[]>(initialActivity);
  const [newTask, setNewTask] = useState<Pick<AutomationTask, "title" | "owner" | "impact">>({
    title: "",
    owner: "Merchandising",
    impact: "Topline"
  });

  const pushActivity = (message: string, agent: string) => {
    setActivityLog((prev) => [
      {
        id: `LOG-${Date.now()}`,
        message,
        timestamp: now(),
        agent
      },
      ...prev
    ]);
  };

  const handleConfigChange = <K extends keyof StoreConfig>(
    key: K,
    value: StoreConfig[K]
  ) => {
    setStoreConfig((prev) => ({ ...prev, [key]: value }));
    pushActivity(`Updated ${String(key)} to "${value}"`, "Command Center");
  };

  const handleToggleAutopilot = (domain: keyof StoreConfig["autopilot"]) => {
    setStoreConfig((prev) => {
      const next = {
        ...prev,
        autopilot: {
          ...prev.autopilot,
          [domain]: !prev.autopilot[domain]
        }
      };
      pushActivity(
        `${domain.charAt(0).toUpperCase() + domain.slice(1)} autopilot ${
          next.autopilot[domain] ? "enabled" : "paused"
        }.`,
        `${domain.charAt(0).toUpperCase() + domain.slice(1)} Agent`
      );
      return next;
    });
  };

  const missionBrief = useMemo(() => {
    const riskCopy = {
      conservative:
        "prioritize profitability, enforce margin guardrails, and stage marketing gradually.",
      balanced:
        "balance margin protection with aggressive marketing on high-confidence SKUs.",
      aggressive:
        "front-load acquisition, accept tighter margins, and dominate top categories."
    };

    const shippingCopy = {
      "24h": "commit to 24-hour fulfillment with prioritized 3PL routing.",
      "48h": "offer 48-hour delivery by blending regional 3PL nodes.",
      "72h": "operate with 72-hour promise while optimizing freight cost."
    };

    return [
      `Mission focus: ${storeConfig.storeName} · ${storeConfig.vertical}.`,
      `Revenue objective: $${storeConfig.revenueTarget.toLocaleString()} with margin floor of ${
        Math.round(storeConfig.marginFloor * 1000) / 10
      }%.`,
      `Risk posture: ${riskCopy[storeConfig.riskTolerance]}`,
      `Customer experience: ${shippingCopy[storeConfig.shippingPromise]}`,
      `Primary marketing focus: ${storeConfig.marketingFocus}.`
    ];
  }, [storeConfig]);

  const addAutomationTask = () => {
    if (!newTask.title.trim()) {
      return;
    }

    const formatted: AutomationTask = {
      id: `AT-${Math.floor(Math.random() * 900 + 100)}`,
      title: newTask.title.trim(),
      owner: newTask.owner,
      impact: newTask.impact,
      status: "Queued",
      linkedKPIs: ["Custom KPI"]
    };

    setTasks((prev) => [formatted, ...prev]);
    pushActivity(
      `Queued automation "${formatted.title}" for ${formatted.owner}.`,
      "Automation Builder"
    );
    setNewTask({
      title: "",
      owner: "Merchandising",
      impact: "Topline"
    });
  };

  return (
    <section id="control" className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">Command Console</h2>
          <p className="mt-2 max-w-3xl text-base text-slate-300">
            Configure guardrails, deploy automation, and monitor AI-led execution. Every
            change propagates through connected merchandising, inventory, revenue, and CX
            agents in seconds.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-xs uppercase tracking-widest text-emerald-200">
          <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
          Live orchestration
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
          >
            <h3 className="text-lg font-semibold text-white">Store blueprint</h3>
            <div className="mt-5 space-y-5">
              <label className="block space-y-2 text-sm text-slate-300">
                <span>Store name</span>
                <input
                  value={storeConfig.storeName}
                  onChange={(event) => handleConfigChange("storeName", event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                />
              </label>
              <label className="block space-y-2 text-sm text-slate-300">
                <span>Vertical</span>
                <input
                  value={storeConfig.vertical}
                  onChange={(event) => handleConfigChange("vertical", event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Revenue target</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      $
                    </span>
                    <input
                      type="number"
                      value={storeConfig.revenueTarget}
                      onChange={(event) =>
                        handleConfigChange("revenueTarget", Number(event.target.value))
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/5 pl-8 pr-3 py-2 text-white focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                    />
                  </div>
                </label>
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Margin floor (%)</span>
                  <div className="relative">
                    <input
                      type="number"
                      value={Math.round(storeConfig.marginFloor * 1000) / 10}
                      onChange={(event) =>
                        handleConfigChange("marginFloor", Number(event.target.value) / 100)
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                    />
                  </div>
                </label>
              </div>
              <label className="block space-y-2 text-sm text-slate-300">
                <span>Marketing focus</span>
                <div className="grid grid-cols-3 gap-2">
                  {marketingOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => handleConfigChange("marketingFocus", option)}
                      className={clsx(
                        "rounded-xl border px-3 py-2 text-xs font-medium transition",
                        storeConfig.marketingFocus === option
                          ? "border-emerald-400/70 bg-emerald-500/10 text-white"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block space-y-2 text-sm text-slate-300">
                <span>Risk tolerance</span>
                <div className="space-y-2">
                  {(Object.keys(riskLabels) as StoreConfig["riskTolerance"][]).map((risk) => (
                    <button
                      type="button"
                      key={risk}
                      onClick={() => handleConfigChange("riskTolerance", risk)}
                      className={clsx(
                        "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs transition",
                        storeConfig.riskTolerance === risk
                          ? "border-sky-400/70 bg-sky-500/10 text-white"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white"
                      )}
                    >
                      <span className="capitalize">{risk}</span>
                      <span className="text-right text-[11px] text-slate-400">{riskLabels[risk]}</span>
                    </button>
                  ))}
                </div>
              </label>
              <label className="block space-y-2 text-sm text-slate-300">
                <span>Shipping promise</span>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(shippingLabels) as StoreConfig["shippingPromise"][]).map(
                    (promise) => (
                      <button
                        type="button"
                        key={promise}
                        onClick={() => handleConfigChange("shippingPromise", promise)}
                        className={clsx(
                          "rounded-xl border px-3 py-2 text-xs transition",
                          storeConfig.shippingPromise === promise
                            ? "border-indigo-400/70 bg-indigo-500/10 text-white"
                            : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white"
                        )}
                      >
                        {shippingLabels[promise]}
                      </button>
                    )
                  )}
                </div>
              </label>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
          >
            <h3 className="text-lg font-semibold text-white">Autopilot guardrails</h3>
            <div className="mt-5 space-y-4 text-sm">
              {(
                Object.keys(storeConfig.autopilot) as Array<
                  keyof StoreConfig["autopilot"]
                >
              ).map((domain) => (
                <button
                  type="button"
                  key={domain}
                  onClick={() => handleToggleAutopilot(domain)}
                  className={clsx(
                    "flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition",
                    storeConfig.autopilot[domain]
                      ? "border-emerald-400/70 bg-emerald-500/10 text-white"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20"
                  )}
                >
                  <span className="capitalize">{domain} autopilot</span>
                  <span className="text-xs uppercase tracking-wider">
                    {storeConfig.autopilot[domain] ? "Enabled" : "Paused"}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Guardrails define how the agent enforces policies around spend, margins,
              SLAs, and escalation. Toggle to hand segments to human operators.
            </p>
          </motion.div>
        </div>

        <div className="space-y-6 lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-white">Mission brief</h3>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest text-slate-400">
                Auto-updating
              </span>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {missionBrief.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <h3 className="text-lg font-semibold text-white">
                Automation queue
              </h3>
              <div className="flex flex-col gap-2 text-xs text-slate-400 lg:text-right">
                <span>Drag &amp; drop prioritization • Human override available</span>
                <span>All automations adhere to configured guardrails</span>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <input
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(event) =>
                    setNewTask((prev) => ({ ...prev, title: event.target.value }))
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 sm:col-span-2"
                />
                <select
                  value={newTask.owner}
                  onChange={(event) =>
                    setNewTask((prev) => ({
                      ...prev,
                      owner: event.target.value as AutomationTask["owner"]
                    }))
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
                >
                  <option value="Merchandising">Merchandising</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Growth">Growth</option>
                  <option value="Trust">Trust</option>
                </select>
                <select
                  value={newTask.impact}
                  onChange={(event) =>
                    setNewTask((prev) => ({
                      ...prev,
                      impact: event.target.value
                    }))
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 sm:col-span-3 md:col-span-1"
                >
                  <option value="Topline">Topline</option>
                  <option value="Availability">Availability</option>
                  <option value="Retention">Retention</option>
                  <option value="Experience">Experience</option>
                </select>
                <button
                  type="button"
                  onClick={addAutomationTask}
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-400/60 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20 sm:col-span-3"
                >
                  Queue automation
                </button>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-xs text-slate-300">
                          {task.id}
                        </span>
                        <h4 className="text-sm font-semibold text-white">
                          {task.title}
                        </h4>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">
                        KPIs: {task.linkedKPIs.join(" • ")}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        Owner: {task.owner}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        Impact: {task.impact}
                      </span>
                      <span
                        className={clsx(
                          "rounded-full border px-3 py-1 uppercase tracking-widest",
                          task.status === "Executing"
                            ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-200"
                            : task.status === "Monitoring"
                            ? "border-sky-400/60 bg-sky-500/10 text-sky-200"
                            : "border-white/15 bg-white/5 text-slate-300"
                        )}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-white">Live activity feed</h3>
              <span className="text-xs text-slate-400">
                Synthetic telemetry · every action logged
              </span>
            </div>
            <ul className="mt-5 space-y-4">
              {activityLog.slice(0, 8).map((log) => (
                <li
                  key={log.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{log.agent}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-200">{log.message}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
