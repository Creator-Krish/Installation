FROM node:22-alpine AS base
WORKDIR /app
COPY . .
RUN corepack enable
RUN pnpm install
RUN pnpm --filter @buildforge/web build
EXPOSE 3000
CMD ["pnpm", "--filter", "@buildforge/web", "start"]
