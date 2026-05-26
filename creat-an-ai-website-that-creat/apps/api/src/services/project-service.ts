import { projects } from "../data/memory-store";

export function listProjects() {
  return projects;
}

export function getProjectById(projectId: string) {
  return projects.find((project) => project.id === projectId);
}
