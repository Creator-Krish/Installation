import Link from "next/link";
import { sampleGeneration, studioProjects } from "../../lib/data";
import { Button, Card, SectionHeader } from "@buildforge/ui";

export default function StudioPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <SectionHeader
        eyebrow="Studio"
        title="Manage AI-generated products in one workspace"
        description="This dashboard is the launching point for generation, customization, collaboration, and deployment."
      />

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
        <Card className="bg-white/[0.03]">
          <p className="text-xs uppercase tracking-[0.3em] text-teal-300">Active generation</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{sampleGeneration.blueprint.summary}</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            The current project has design variations, starter files, backend schema suggestions, and visual editor bindings ready for refinement.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-400">Starter files</p>
              <p className="mt-2 text-3xl font-semibold text-white">{sampleGeneration.starterFiles.length}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-slate-400">Database tables</p>
              <p className="mt-2 text-3xl font-semibold text-white">{sampleGeneration.blueprint.databaseTables.length}</p>
            </div>
          </div>
          <Link href={`/studio/${sampleGeneration.projectId}`} className="mt-8 inline-flex">
            <Button>Open editor</Button>
          </Link>
        </Card>

        <Card className="bg-white/[0.03]">
          <p className="text-xs uppercase tracking-[0.3em] text-teal-300">Roadmap coverage</p>
          <div className="mt-4 space-y-4">
            {[
              ["Phase 1", "AI generation, editor shell, deployment queue"],
              ["Phase 2", "Advanced customization, live collaboration, review tooling"],
              ["Phase 3", "Marketplace, white-label mode, client handoff"],
              ["Phase 4", "Mobile packaging and app-store delivery"],
            ].map(([phase, summary]) => (
              <div key={phase} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <h3 className="text-lg font-medium text-white">{phase}</h3>
                <p className="mt-2 text-sm text-slate-300">{summary}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-white">Projects</h2>
        <div className="mt-6 grid gap-4">
          {studioProjects.map((project) => (
            <Card key={project.id} className="flex flex-col gap-4 bg-white/[0.03] md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                <p className="mt-2 max-w-3xl text-sm text-slate-300">{project.prompt}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">
                  {project.target} • {project.stack} • {project.status}
                </p>
              </div>
              <Link href={`/studio/${project.id}`}>
                <Button variant="secondary">Open workspace</Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
