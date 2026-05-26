# EVONA AUTOMATION

EVONA AUTOMATION is a Windows-focused local automation platform designed to translate customized natural language into auditable desktop workflows. It combines:

- a workflow engine inspired by node-based automation tools such as n8n
- a command compiler that understands app names, aliases, and filesystem phrases
- a local automation runtime for launching apps, navigating folders, typing text, hotkeys, delays, and shell execution
- optional AI-assisted planning through the `JARVIS` API key
- a studio UI for reviewing and executing commands before they touch the machine

## Core Principles

- Human review before risky automation
- Structured execution plans instead of opaque prompts
- Windows-native path and application resolution
- Extensible node/action system for future integrations

## Monorepo Layout

- `apps/api`: local Fastify API for compiling and executing workflows
- `apps/studio`: React control center UI
- `packages/contracts`: shared runtime schemas and TypeScript types
- `packages/core`: compiler, workflow engine, safety policy, built-in registries

## Quick Start

1. Copy `.env.example` to `.env`
2. Replace `JARVIS=null` with your AI API key when ready
3. Set `JARVIS_MODEL` to the model name used by your AI provider if you want AI planning
4. Install dependencies with `pnpm install`
5. Start the stack with `pnpm dev`

## Example Commands

- `open chrome and go to youtube`
- `open downloads folder`
- `launch vscode then open documents`
- `type hello world in the active window`
- `wait 2 seconds and press ctrl s`
- `run the focused workbench workflow`

## Current Scope

This baseline is production-shaped and heavily structured, but it is not pretending to fully control every desktop application out of the box. Universal control across all apps requires:

- additional app-specific adapters
- accessibility or OS automation permissions
- stronger window targeting and screen understanding
- more guarded execution policies for enterprise use

That said, the architecture is ready for those layers.

## AI Wiring

The `packages/core` compiler works in two tiers:

- deterministic parsing for common EVONA commands
- optional AI planning through an OpenAI-compatible `chat/completions` endpoint

Environment values:

- `JARVIS`: your API key, kept as `null` until you replace it
- `JARVIS_BASE_URL`: defaults to an OpenAI-compatible API root
- `JARVIS_MODEL`: the model name your provider expects
