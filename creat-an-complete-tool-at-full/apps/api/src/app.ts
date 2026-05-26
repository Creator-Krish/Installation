import Fastify from "fastify";
import {
  compileRequestSchema,
  executeRequestSchema,
  workflowSchema
} from "@evona/contracts";
import {
  CommandCompiler,
  WorkflowEngine,
  getBuiltInWorkflows,
  listApps,
  loadEnv,
  SafetyPolicy
} from "@evona/core";

const env = loadEnv();
const compiler = new CommandCompiler(env);
const safetyPolicy = new SafetyPolicy(
  env.EVONA_ALLOWED_ROOTS
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
);
const workflowEngine = new WorkflowEngine({
  defaultShell: env.EVONA_DEFAULT_SHELL,
  timeoutMs: env.EVONA_WORKFLOW_TIMEOUT_MS,
  safetyPolicy
});

export function buildApp() {
  const app = Fastify({
    logger: true
  });

  app.get("/health", async () => ({
    ok: true,
    service: "evona-api",
    aiConfigured: env.JARVIS !== "null"
  }));

  app.get("/v1/apps", async () => ({
    ok: true,
    apps: listApps()
  }));

  app.get("/v1/workflows", async () => ({
    ok: true,
    workflows: getBuiltInWorkflows()
  }));

  app.post("/v1/compile", async (request) => {
    const body = compileRequestSchema.parse(request.body);
    const result = await compiler.compile(body.input);

    return {
      ok: true,
      command: result.command,
      usedAi: result.usedAi
    };
  });

  app.post("/v1/execute", async (request, reply) => {
    const body = executeRequestSchema.parse(request.body);
    const result = await workflowEngine.execute(body.workflow, body.dryRun);

    if (!result.ok) {
      reply.status(400);
    }

    return result;
  });

  app.post("/v1/workflows/:id/execute", async (request, reply) => {
    const workflowId = String((request.params as { id: string }).id);
    const workflow = getBuiltInWorkflows().find((item) => item.id === workflowId);

    if (!workflow) {
      reply.status(404);
      return { ok: false, message: "Workflow not found." };
    }

    const result = await workflowEngine.execute(workflow, false);
    if (!result.ok) {
      reply.status(400);
    }
    return result;
  });

  app.post("/v1/workflows/validate", async (request) => ({
    ok: true,
    workflow: workflowSchema.parse(request.body)
  }));

  return app;
}
