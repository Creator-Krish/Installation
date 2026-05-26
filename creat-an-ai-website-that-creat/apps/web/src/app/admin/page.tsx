import { Card, SectionHeader } from "@buildforge/ui";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <SectionHeader
        eyebrow="Admin"
        title="Platform management dashboard"
        description="A starter control room for subscriptions, AI usage, moderation, marketplace reviews, and deployment health."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Active workspaces", "1,284"],
          ["AI generations today", "8,940"],
          ["Queued deployments", "27"],
          ["Marketplace reviews", "113"],
        ].map(([label, value]) => (
          <Card key={label} className="bg-white/[0.03]">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-4 text-4xl font-semibold text-white">{value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="bg-white/[0.03]">
          <h2 className="text-2xl font-semibold text-white">Monetization controls</h2>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>Freemium limits and credit pack settings</li>
            <li>Enterprise seat management and role templates</li>
            <li>Marketplace revenue share configuration</li>
            <li>White-label tenant approval flow</li>
          </ul>
        </Card>
        <Card className="bg-white/[0.03]">
          <h2 className="text-2xl font-semibold text-white">Security and compliance</h2>
          <ul className="mt-4 space-y-3 text-slate-300">
            <li>Audit logs and suspicious activity review</li>
            <li>Rate-limit and abuse protection visibility</li>
            <li>GDPR deletion requests and export tools</li>
            <li>SOC 2 evidence checklist integrations</li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
