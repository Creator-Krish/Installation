import type { CompiledCommand, Workflow, WorkflowNode } from "@evona/contracts";
import { findAppDescriptor } from "../registry/appRegistry";
import { findPathDescriptor } from "../registry/pathRegistry";

function makeWorkflow(input: string, nodes: WorkflowNode[], description: string): Workflow {
  return {
    id: `compiled-${Date.now()}`,
    name: "Compiled EVONA Command",
    description,
    entryNodeId: nodes[0]?.id ?? "noop",
    nodes,
    tags: ["compiled", "nl"]
  };
}

function parseWait(text: string): number | null {
  const match = text.match(/wait\s+(\d+)\s*(second|seconds|sec|s)/i);
  return match ? Number(match[1]) * 1000 : null;
}

function parseUrl(text: string): string | null {
  const match = text.match(/(?:go to|open)\s+(https?:\/\/\S+|www\.\S+|youtube|gmail|google)/i);
  if (!match) {
    return null;
  }

  const raw = match[1].toLowerCase();
  if (raw === "youtube") {
    return "https://www.youtube.com";
  }
  if (raw === "gmail") {
    return "https://mail.google.com";
  }
  if (raw === "google") {
    return "https://www.google.com";
  }
  return raw.startsWith("http") ? raw : `https://${raw}`;
}

function parseTypeText(text: string): string | null {
  const match = text.match(/type\s+(.+?)(?:\s+in\s+the\s+active\s+window)?$/i);
  return match ? match[1].replace(/^["']|["']$/g, "") : null;
}

function parseHotkey(text: string): string[] | null {
  const match = text.match(/press\s+([a-z0-9+\s]+)/i);
  if (!match) {
    return null;
  }
  return match[1]
    .split("+")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

function splitIntoSegments(input: string): string[] {
  return input
    .split(/\bthen\b|\band\b(?=\s+(?:go to|open|launch|start|run|press|type|wait))/i)
    .filter((part): part is string => Boolean(part))
    .map((part) => part.trim())
    .filter(Boolean);
}

function compileSegment(segment: string, nodes: WorkflowNode[], reasoning: string[]): void {
  const normalizedSegment = segment.trim().toLowerCase();
  const matchedApp = findAppDescriptor(
    normalizedSegment.replace(/open|launch|start|run/gi, "").trim()
  );
  const matchedPath = findPathDescriptor(
    normalizedSegment.replace(/open|launch|start|run|folder|directory/gi, "").trim()
  );
  const url = parseUrl(normalizedSegment);
  const typeText = parseTypeText(segment);
  const waitMs = parseWait(normalizedSegment);
  const hotkey = parseHotkey(normalizedSegment);

  if (matchedApp) {
    reasoning.push(`Matched application alias to ${matchedApp.name}.`);
    nodes.push({
      id: `launch-app-${nodes.length + 1}`,
      action: "launchApp",
      params: { app: matchedApp.id },
      next: []
    });
    return;
  }

  if (matchedPath) {
    reasoning.push(`Resolved folder alias to ${matchedPath.value}.`);
    nodes.push({
      id: `open-path-${nodes.length + 1}`,
      action: "openPath",
      params: { pathAlias: matchedPath.id },
      next: []
    });
    return;
  }

  if (url) {
    reasoning.push(`Identified a navigation target: ${url}.`);
    nodes.push({
      id: `open-url-${nodes.length + 1}`,
      action: "openUrl",
      params: { url },
      next: []
    });
    return;
  }

  if (typeText) {
    reasoning.push("Detected text input intent for the active window.");
    nodes.push({
      id: `type-text-${nodes.length + 1}`,
      action: "typeText",
      params: { text: typeText },
      next: []
    });
    return;
  }

  if (waitMs) {
    reasoning.push(`Detected timed pause of ${waitMs}ms.`);
    nodes.push({
      id: `wait-${nodes.length + 1}`,
      action: "wait",
      params: { durationMs: waitMs },
      next: []
    });
    return;
  }

  if (hotkey) {
    reasoning.push(`Detected hotkey sequence ${hotkey.join("+")}.`);
    nodes.push({
      id: `press-hotkey-${nodes.length + 1}`,
      action: "pressHotkey",
      params: { keys: hotkey },
      next: []
    });
  }
}

export function compileHeuristically(input: string): CompiledCommand {
  const normalizedInput = input.trim().toLowerCase();
  const reasoning: string[] = [];
  const warnings: string[] = [];
  const nodes: WorkflowNode[] = [];
  const segments = splitIntoSegments(input);

  if (segments.length > 0) {
    for (const segment of segments) {
      compileSegment(segment, nodes, reasoning);
    }
  } else {
    compileSegment(input, nodes, reasoning);
  }

  for (let index = 0; index < nodes.length - 1; index += 1) {
    nodes[index].next = [nodes[index + 1].id];
  }

  if (nodes.length === 0) {
    warnings.push("No deterministic action was recognized. AI assistance or richer adapters may be needed.");
    nodes.push({
      id: "fallback-shell",
      action: "runShell",
      params: { command: input },
      next: []
    });
  }

  return {
    originalInput: input,
    normalizedInput,
    reasoning,
    warnings,
    workflow: makeWorkflow(input, nodes, `Compiled from: ${input}`)
  };
}
