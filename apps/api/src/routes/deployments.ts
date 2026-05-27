import { Router } from "express";
import { z } from "zod";
import { queueDeployment } from "../services/deployment-service.js";

export const deploymentsRouter = Router();

const deploymentSchema = z.object({
  projectId: z.string().min(1),
  environment: z.enum(["preview", "production"]),
});

deploymentsRouter.post("/", async (request, response, next) => {
  try {
    const payload = deploymentSchema.parse(request.body);
    const deployment = await queueDeployment(payload.projectId, payload.environment);
    response.status(202).json({ data: deployment });
  } catch (error) {
    next(error);
  }
});
