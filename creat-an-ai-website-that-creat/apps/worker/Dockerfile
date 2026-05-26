FROM node:22-alpine AS base
WORKDIR /app
COPY . .
RUN corepack enable
RUN pnpm install
RUN pnpm --filter @buildforge/worker build
CMD ["pnpm", "--filter", "@buildforge/worker", "start"]
