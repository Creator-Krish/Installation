import { Router } from "express";
import { generateProject, listGenerations } from "../services/generation-service";

export const generationRouter = Router();

generationRouter.get("/", (_request, response) => {
  response.json({ data: listGenerations() });
});

generationRouter.post("/", async (request, response, next) => {
  try {
    const result = await generateProject(request.body);
    response.status(202).json({ data: result });
  } catch (error) {
    next(error);
  }
});
