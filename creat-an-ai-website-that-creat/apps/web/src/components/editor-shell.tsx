"use client";

import { useMemo, useState } from "react";
import { sampleGeneration } from "../lib/data";
import { useEditorStore } from "../store/editor-store";
import { Bot, Layers3, LayoutGrid, Monitor, Smartphone, Tablet, WandSparkles } from "lucide-react";

const libraryItems = [
  "Hero banners",
  "Pricing tables",
  "Testimonials",
  "Reservation forms",
  "Navigation bars",
  "Analytics widgets",
  "CMS blocks",
];

export function EditorShell() {
  const { breakpoint, setBreakpoint, selectedComponent, setSelectedComponent, aiDockOpen, toggleAIDock, messages, sendMessage } =
    useEditorStore();
  const [draftMessage, setDraftMessage] = useState("Change the hero section background to a gradient blue.");

  const activeComponent = useMemo(
    () => sampleGeneration.blueprint.components.find((component) => component.id === selectedComponent) ?? sampleGeneration.blueprint.components[0],
    [selectedComponent]
  );

  return (
    <div className="grid min-h-[calc(100vh-120px)] grid-rows-[auto,1fr,auto] overflow-hidden rounded-[32px] border border-white/10 bg-[#070b16]/90 shadow-glow">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-teal-300">Project workspace</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Golden Spoon</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {[
            { id: "desktop", icon: Monitor },
            { id: "tablet", icon: Tablet },
            { id: "mobile", icon: Smartphone },
          ].map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setBreakpoint(id as "desktop" | "tablet" | "mobile")}
              className={`rounded-full border px-3 py-2 text-sm transition ${
                breakpoint === id
                  ? "border-violet-400 bg-violet-500/15 text-white"
                  : "border-white/10 bg-white/5 text-slate-400"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {id}
              </span>
            </button>
          ))}
          <button className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white">Deploy</button>
        </div>
      </div>

      <div className="grid min-h-0 lg:grid-cols-[260px,1fr,320px]">
        <aside className="border-r border-white/10 bg-slate-950/70 p-5">
          <div className="mb-6 flex items-center gap-3">
            <LayoutGrid className="h-5 w-5 text-teal-300" />
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white">Library</h2>
              <p className="text-xs text-slate-400">200+ component families</p>
            </div>
          </div>
          <div className="space-y-3">
            {libraryItems.map((item) => (
              <button
                key={item}
                type="button"
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-300 transition hover:border-violet-400/40 hover:text-white"
              >
                {item}
                <span className="text-xs text-slate-500">Add</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="relative overflow-hidden bg-forge-grid bg-[size:22px_22px] p-6">
          <div className="mx-auto flex h-full max-w-4xl flex-col gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <div className="flex flex-wrap items-center gap-3">
                <Layers3 className="h-5 w-5 text-violet-300" />
                {sampleGeneration.blueprint.pages.map((page) => (
                  <span key={page} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                    {page}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`mx-auto w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#FFFDF8] shadow-2xl transition-all ${
                breakpoint === "desktop" ? "max-w-5xl" : breakpoint === "tablet" ? "max-w-2xl" : "max-w-sm"
              }`}
            >
              <div className="border-b border-slate-200 px-6 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Generated homepage</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">Reserve your next unforgettable dinner</h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  BuildForge generated this hero based on the restaurant brief, booking goal, and editorial design variation.
                </p>
              </div>

              <div className="grid gap-5 p-6 lg:grid-cols-3">
                {sampleGeneration.blueprint.components.map((component) => (
                  <button
                    key={component.id}
                    type="button"
                    onClick={() => setSelectedComponent(component.id)}
                    className={`rounded-3xl border p-5 text-left transition ${
                      selectedComponent === component.id
                        ? "border-violet-500 bg-violet-50 shadow-lg"
                        : "border-slate-200 bg-white hover:border-violet-300"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{component.type}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{component.label}</h3>
                    <p className="mt-2 text-sm text-slate-600">Ready for visual editing, AI refinement, and code inspection.</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleAIDock}
            className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-glow"
          >
            <WandSparkles className="h-4 w-4" />
            AI assistant
          </button>
        </main>

        <aside className="border-l border-white/10 bg-slate-950/70 p-5">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-teal-300">Properties</p>
            <h2 className="mt-2 text-lg font-semibold text-white">{activeComponent.label}</h2>
            <p className="mt-2 text-sm text-slate-400">Edit style tokens, interactions, responsive rules, and AI-assisted logic.</p>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Theme tokens</p>
              <div className="mt-4 flex gap-3">
                {sampleGeneration.blueprint.designTokens.colors.map((color) => (
                  <div key={color} className="text-center text-xs text-slate-400">
                    <div className="mb-2 h-10 w-10 rounded-full border border-white/10" style={{ backgroundColor: color }} />
                    {color}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Component props</p>
              <div className="mt-4 space-y-3">
                {Object.entries(activeComponent.props).map(([key, value]) => (
                  <label key={key} className="block text-sm text-slate-300">
                    {key}
                    <input
                      readOnly
                      value={String(value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Backend bindings</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {sampleGeneration.blueprint.databaseTables.map((table) => (
                  <li key={table} className="rounded-2xl bg-slate-900/80 px-3 py-2">
                    {table}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {aiDockOpen ? (
        <div className="border-t border-white/10 bg-slate-950/90 p-5">
          <div className="mb-4 flex items-center gap-3">
            <Bot className="h-5 w-5 text-teal-300" />
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white">AI Assistant Chat</h3>
              <p className="text-xs text-slate-400">Context-aware editing, suggestions, and code assistance</p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr,320px]">
            <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-3xl rounded-3xl px-4 py-3 text-sm ${
                    message.role === "assistant"
                      ? "bg-violet-500/12 text-violet-100"
                      : "ml-auto bg-slate-900 text-slate-100"
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <textarea
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                className="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
              />
              <button
                type="button"
                onClick={() => sendMessage(draftMessage)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
              >
                <WandSparkles className="h-4 w-4" />
                Apply with AI
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
