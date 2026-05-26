# BuildForge

BuildForge is an AI-powered SaaS platform that turns natural language prompts into fully customizable websites and mobile apps. This repository is structured as an MVP-first monorepo with a Next.js product experience, an Express API, a background worker, shared contracts, local infrastructure, and product documentation.

## What is included

- Marketing landing page and product overview
- Studio dashboard and editor shell
- AI prompt generation flow with multiple design variations
- Admin dashboard starter
- Express API with project, generation, deployment, and admin routes
- Prisma schema for SaaS entities
- BullMQ worker scaffold for build and deployment jobs
- Shared TypeScript types and UI primitives
- Storybook starter for the design system
- Docker Compose for local development
- GitHub Actions CI starter

## Monorepo structure

```text
apps/
  api/        Express API + Prisma + Socket.IO
  web/        Next.js SaaS frontend
  worker/     BullMQ workers for builds and deployments
packages/
  shared/     Shared contracts, mock data, and schemas
  ui/         Shared React UI primitives
docs/         Product, API, and onboarding documentation
infrastructure/
  terraform/  Starter infrastructure as code
.storybook/   Storybook configuration
```

## Getting started

1. Copy `.env.example` to `.env`.
2. Install dependencies with `pnpm install`.
3. Start the local services with `docker compose up -d postgres redis`.
4. Run database generation and schema push:
   - `pnpm db:generate`
   - `pnpm db:push`
5. Start the apps with `pnpm dev`.

## MVP scope

This codebase focuses on Phase 1 of the roadmap:

- AI generation workflow
- Studio/editor experience
- Backend project orchestration
- Deployment queue scaffolding

Advanced collaboration, marketplace, native mobile packaging, and white-label controls are documented and scaffolded for future phases rather than fully implemented end-to-end in this initial build.
