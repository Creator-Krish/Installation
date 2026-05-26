import { Card, SectionHeader } from "@buildforge/ui";

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <SectionHeader
        eyebrow="Product Docs"
        title="How BuildForge is organized"
        description="Use this page as an in-product guide to the main systems before diving into the deeper markdown documentation."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Prompt to blueprint",
            body: "User briefs are validated, enriched with stack choices, and translated into design variations plus starter architecture.",
          },
          {
            title: "Editor and AI chat",
            body: "The studio surfaces the component tree, canvas preview, inspector, and contextual AI assistant in one workspace.",
          },
          {
            title: "API and workers",
            body: "The backend manages projects, generation events, deployment jobs, and live collaboration state.",
          },
        ].map((item) => (
          <Card key={item.title} className="bg-white/[0.03]">
            <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-4 text-slate-300">{item.body}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
