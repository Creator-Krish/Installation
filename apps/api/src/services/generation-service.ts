import { nanoid } from "nanoid";
import {
  demoGeneration,
  generationRequestSchema,
  type GenerationRequest,
  type GenerationResponse,
  type ProjectRecord,
} from "@buildforge/shared";
import { buildQueue } from "../lib/queue.js";
import { generations, projects } from "../data/memory-store.js";

export async function generateProject(input: unknown): Promise<GenerationResponse> {
  const payload = generationRequestSchema.parse(input);
  const projectId = nanoid(12);

  const project: ProjectRecord = {
    id: projectId,
    name: payload.projectName,
    prompt: payload.prompt,
    target: payload.target,
    stack: payload.stack,
    audience: payload.audience,
    status: "generating",
    updatedAt: new Date().toISOString(),
  };

  projects.unshift(project);

  const response = createMockGeneration(projectId, payload);
  generations.unshift(response);

  await buildQueue.add("generate-project", {
    projectId,
    prompt: payload.prompt,
    stack: payload.stack,
    target: payload.target,
  });

  return response;
}

export function listGenerations() {
  return generations;
}

function createMockGeneration(projectId: string, payload: GenerationRequest): GenerationResponse {
  const targetLabel = payload.target === "mobile-app" ? "mobile app" : "website";
  const summary = `An AI-generated ${targetLabel} for ${payload.audience} using ${payload.stack}, tuned to deliver ${payload.requiredFeatures.join(", ") || "high-impact user flows"}.`;

  return {
    ...demoGeneration,
    projectId,
    status: "generating",
    blueprint: {
      ...demoGeneration.blueprint,
      summary,
      pages:
        payload.target === "mobile-app"
          ? ["Onboarding", "Dashboard", "Progress", "Profile", "Settings"]
          : demoGeneration.blueprint.pages,
      databaseTables: [
        "users",
        "projects",
        "components",
        "deployments",
        ...(payload.requiredFeatures.length ? payload.requiredFeatures.map((feature) => feature.toLowerCase().replace(/\s+/g, "_")) : []),
      ],
    },
  };
}
