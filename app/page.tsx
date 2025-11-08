import HeroSection from "@/components/HeroSection";
import StatsShowcase from "@/components/StatsShowcase";
import AgentControlPanel from "@/components/AgentControlPanel";
import CapabilityMatrix from "@/components/CapabilityMatrix";
import AutomationTimeline from "@/components/AutomationTimeline";
import IntegrationShowcase from "@/components/IntegrationShowcase";
import InsightPanel from "@/components/InsightPanel";
import ComplianceCenter from "@/components/ComplianceCenter";
import CallToAction from "@/components/CallToAction";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 p-4 pb-16 sm:p-8">
      <HeroSection />
      <StatsShowcase />
      <AgentControlPanel />
      <CapabilityMatrix />
      <AutomationTimeline />
      <InsightPanel />
      <IntegrationShowcase />
      <ComplianceCenter />
      <CallToAction />
      <footer className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Agentic Commerce OS · Autonomous Retail Intelligence</span>
        <div className="flex flex-wrap gap-4">
          <a href="mailto:hello@agentic-commerce.io" className="hover:text-white">
            Contact
          </a>
          <a href="#capabilities" className="hover:text-white">
            Capabilities
          </a>
          <a href="#control" className="hover:text-white">
            Launch console
          </a>
        </div>
      </footer>
    </main>
  );
}
