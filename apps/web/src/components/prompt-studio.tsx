"use client";

import { useMemo, useState } from "react";
import { WandSparkles } from "lucide-react";
import { sampleVariations } from "../lib/data";
import { Button, Card } from "@buildforge/ui";

const suggestedPrompts = [
  "Create a restaurant booking website with online reservations and map integration.",
  "Build a fitness tracking mobile app with progress charts and social sharing.",
  "Generate an e-commerce storefront for handmade jewelry with Stripe checkout.",
];

export function PromptStudio() {
  const [prompt, setPrompt] = useState(suggestedPrompts[0]);
  const [projectName, setProjectName] = useState("BuildForge Demo");

  const summary = useMemo(
    () =>
      prompt.includes("restaurant")
        ? "Reservation-led website with menu storytelling, map support, and conversion-focused booking flows."
        : prompt.includes("fitness")
          ? "Mobile-first product with progress tracking, challenge loops, and retention surfaces."
          : "Commerce-first storefront with product discovery, checkout, and trust layers.",
    [prompt]
  );

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
      <Card className="border-violet-500/20 bg-white/[0.04]">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-violet-500/15 p-3 text-violet-200">
            <WandSparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-teal-300">Quick Start</p>
            <h3 className="text-2xl font-semibold text-white">Describe your product in one sentence</h3>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm text-slate-300">
            Project name
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
            />
          </label>
          <label className="block text-sm text-slate-300">
            Prompt
            <textarea
              className="mt-2 min-h-40 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-white outline-none"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />
          </label>
          <div className="flex flex-wrap gap-3">
            {suggestedPrompts.map((suggested) => (
              <button
                key={suggested}
                type="button"
                onClick={() => setPrompt(suggested)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-teal-400/40 hover:text-white"
              >
                {suggested}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Generate 3 variations</Button>
            <Button variant="secondary">Start from template</Button>
          </div>
        </div>
      </Card>

      <Card className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-teal-300">AI Output Snapshot</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{projectName}</h3>
          <p className="mt-3 text-slate-300">{summary}</p>
        </div>
        <div className="space-y-4">
          {sampleVariations.map((variation) => (
            <div key={variation.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-medium text-white">{variation.name}</h4>
                  <p className="text-sm text-slate-400">{variation.description}</p>
                </div>
                <div className="flex gap-2">
                  <span className="h-5 w-5 rounded-full" style={{ backgroundColor: variation.primaryColor }} />
                  <span className="h-5 w-5 rounded-full" style={{ backgroundColor: variation.accentColor }} />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {variation.styleKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs text-teal-100"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
