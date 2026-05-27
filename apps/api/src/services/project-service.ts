import { projects } from "../data/memory-store.js";

export function listProjects() {
  return projects;
}

export function getProjectById(projectId: string) {
  return projects.find((project) => project.id === projectId);
}
