FROM node:22-alpine AS base
WORKDIR /app
COPY . .
RUN corepack enable
RUN pnpm install
RUN pnpm --filter @buildforge/api build
EXPOSE 4000
CMD ["pnpm", "--filter", "@buildforge/api", "start"]
