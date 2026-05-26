# BuildForge Architecture

## MVP service map

- `apps/web`: Next.js application for marketing, dashboard, editor, docs, and admin views
- `apps/api`: Express API with project generation endpoints, deployment triggers, and collaboration sockets
- `apps/worker`: BullMQ consumers for generation and deployment jobs
- `packages/shared`: Shared types, schemas, and demo data used by both frontend and backend
- `packages/ui`: Shared UI primitives and Storybook-ready components

## Request flow

1. The user submits a natural language prompt from the landing page or studio.
2. The frontend posts to `POST /api/v1/generate`.
3. The API validates the request and queues a generation job.
4. The worker processes the job and would call the configured LLM and retrieval pipeline in production.
5. The frontend subscribes to collaboration and generation updates over WebSocket.
6. The editor loads the generated component tree, design tokens, and backend schema suggestions.
7. Deployments are queued through `POST /api/v1/deployments`.

## Data model priorities

- Workspace and membership system for SaaS tenancy
- Projects and components for builder state
- Deployments and build artifacts for release management
- Comments for review workflows

## Phase extensions

- Add vector retrieval service for project context memory
- Break generation and deployment into separate dedicated services
- Persist collaboration state in Redis streams or a CRDT service
- Introduce object storage and CDN-backed media delivery
