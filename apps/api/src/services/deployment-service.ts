import { nanoid } from "nanoid";
import { deploymentQueue } from "../lib/queue";

export async function queueDeployment(projectId: string, environment: "preview" | "production") {
  const jobId = nanoid(10);

  await deploymentQueue.add("deploy-project", {
    jobId,
    projectId,
    environment,
  });

  return {
    jobId,
    projectId,
    environment,
    status: "queued",
    queuedAt: new Date().toISOString(),
  };
}
