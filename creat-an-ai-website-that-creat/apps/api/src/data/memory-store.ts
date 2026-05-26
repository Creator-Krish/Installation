import { demoGeneration, demoProjects, type GenerationResponse, type ProjectRecord } from "@buildforge/shared";

export const projects: ProjectRecord[] = [...demoProjects];
export const generations: GenerationResponse[] = [demoGeneration];
