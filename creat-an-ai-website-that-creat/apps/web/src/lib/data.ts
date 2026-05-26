import { demoGeneration, demoProjects, type DesignVariation } from "@buildforge/shared";

export const landingMetrics = [
  { label: "Generation speed", value: "3 variations in seconds" },
  { label: "Customizable components", value: "200+ starter blocks" },
  { label: "Deployment path", value: "Code, preview, then publish" },
];

export const featureColumns = [
  {
    title: "Generate",
    description: "Turn a natural-language brief into a structured project blueprint, starter code, and design directions.",
  },
  {
    title: "Customize",
    description: "Refine every screen, component, token, workflow, and data model through visual editing and AI help.",
  },
  {
    title: "Launch",
    description: "Queue builds, manage preview environments, and prepare production deployment from one workspace.",
  },
];

export const studioProjects = demoProjects;
export const sampleGeneration = demoGeneration;
export const sampleVariations: DesignVariation[] = demoGeneration.variations;
