import { Router } from "express";
import { getProjectById, listProjects } from "../services/project-service.js";

export const projectsRouter = Router();

projectsRouter.get("/", (_request, response) => {
  response.json({ data: listProjects() });
});

projectsRouter.get("/:projectId", (request, response) => {
  const project = getProjectById(request.params.projectId);

  if (!project) {
    response.status(404).json({ error: "Project not found" });
    return;
  }

  response.json({ data: project });
});
