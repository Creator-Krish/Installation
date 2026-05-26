import Link from "next/link";
import { ArrowRight, Bot, Database, LayoutPanelTop, Rocket, Sparkles } from "lucide-react";
import { Badge, Button, Card, SectionHeader } from "@buildforge/ui";
import { featureColumns, landingMetrics } from "../lib/data";
import { PromptStudio } from "../components/prompt-studio";

export default function HomePage() {
  return (
    <main className="pb-24">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:pt-24">
        <div className="grid items-start gap-8 lg:grid-cols-[1.08fr,0.92fr]">
          <div className="space-y-8">
            <Badge>Production-oriented MVP</Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">
                Build websites and mobile apps from a prompt, then customize every layer visually.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                BuildForge combines AI generation, a visual editor, backend scaffolding, and deployment orchestration into one SaaS platform for teams, founders, and agencies.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/studio">
                <Button>Open BuildForge Studio</Button>
              </Link>
              <Link href="/docs">
                <Button variant="secondary">Explore product docs</Button>
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {landingMetrics.map((metric) => (
                <Card key={metric.label} className="bg-white/[0.03]">
                  <p className="text-sm uppercase tracking-[0.25em] text-teal-300">{metric.label}</p>
                  <p className="mt-4 text-xl font-semibold text-white">{metric.value}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden bg-gradient-to-br from-violet-600/12 via-slate-950/85 to-teal-500/10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-teal-300">Platform Snapshot</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Phase 1 MVP flow</h2>
              </div>
              <Sparkles className="h-8 w-8 text-violet-300" />
            </div>
            <div className="space-y-4">
              {[
                ["Prompt intake", "Collect business goals, audience, stack, and feature requirements."],
                ["AI generation", "Return three design variations plus a starter architecture blueprint."],
                ["Visual editor", "Adjust components, data bindings, and theme tokens with immediate previews."],
                ["Deployment queue", "Push builds into a worker pipeline for preview or production release."],
              ].map(([title, description]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <h3 className="text-lg font-medium text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <PromptStudio />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Platform pillars"
          title="Everything needed to move from idea to launch"
          description="The MVP already includes the core surfaces your product needs, with room to scale into collaboration, marketplace, and white-label layers."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featureColumns.map((feature, index) => {
            const icons = [Bot, LayoutPanelTop, Rocket];
            const Icon = icons[index];
            return (
              <Card key={feature.title} className="bg-white/[0.03]">
                <Icon className="h-8 w-8 text-violet-300" />
                <h3 className="mt-5 text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-slate-300">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: Database,
              title: "Backend builder",
              description: "Database schema design, API scaffolding, auth configuration, and queue-driven build orchestration.",
            },
            {
              icon: LayoutPanelTop,
              title: "Visual workspace",
              description: "Left library, center canvas, right inspector, bottom AI chat, and breakpoint-aware preview controls.",
            },
            {
              icon: Rocket,
              title: "Delivery pipeline",
              description: "Dockerized services, Redis-backed jobs, CI starter, and infrastructure templates for cloud rollout.",
            },
          ].map(({ icon: Icon, title, description }) => (
            <Card key={title} className="bg-white/[0.03]">
              <Icon className="h-8 w-8 text-teal-300" />
              <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-slate-300">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-8">
        <Card className="flex flex-col items-start justify-between gap-6 bg-gradient-to-r from-violet-600/15 to-teal-500/10 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-teal-300">Next step</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Open the studio and start editing the generated project.</h2>
          </div>
          <Link href="/studio" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            Go to studio <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </section>
    </main>
  );
}
