import { z } from "zod";

export const supportedStacks = ["Next.js", "React", "Vue", "Flutter", "React Native"] as const;
export type SupportedStack = (typeof supportedStacks)[number];

export const projectStatusValues = ["draft", "generating", "ready", "deploying", "live"] as const;
export type ProjectStatus = (typeof projectStatusValues)[number];

export const designVariationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  styleKeywords: z.array(z.string()),
  primaryColor: z.string(),
  accentColor: z.string(),
});

export const generationRequestSchema = z.object({
  projectName: z.string().min(2),
  prompt: z.string().min(12),
  target: z.enum(["website", "mobile-app"]),
  stack: z.enum(supportedStacks),
  audience: z.string().min(2),
  requiredFeatures: z.array(z.string()).default([]),
});

export const aiChatMessageSchema = z.object({
  role: z.enum(["assistant", "user", "system"]),
  content: z.string(),
});

export type ComponentInstance = {
  id: string;
  type: string;
  label: string;
  props: Record<string, unknown>;
  children: ComponentInstance[];
};

export const componentInstanceSchema: z.ZodType<ComponentInstance> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.string(),
    label: z.string(),
    props: z.record(z.unknown()),
    children: z.array(componentInstanceSchema).default([]),
  })
);

export const projectBlueprintSchema = z.object({
  summary: z.string(),
  pages: z.array(z.string()),
  databaseTables: z.array(z.string()),
  designTokens: z.object({
    colors: z.array(z.string()),
    fonts: z.array(z.string()),
    spacingScale: z.array(z.string()),
  }),
  components: z.array(componentInstanceSchema),
});

export const generationResponseSchema = z.object({
  projectId: z.string(),
  status: z.enum(projectStatusValues),
  variations: z.array(designVariationSchema),
  blueprint: projectBlueprintSchema,
  starterFiles: z.array(
    z.object({
      path: z.string(),
      language: z.string(),
      summary: z.string(),
    })
  ),
});

export type GenerationRequest = z.infer<typeof generationRequestSchema>;
export type GenerationResponse = z.infer<typeof generationResponseSchema>;
export type DesignVariation = z.infer<typeof designVariationSchema>;
export type ProjectBlueprint = z.infer<typeof projectBlueprintSchema>;
export type AIChatMessage = z.infer<typeof aiChatMessageSchema>;

export type ProjectRecord = {
  id: string;
  name: string;
  prompt: string;
  target: "website" | "mobile-app";
  stack: SupportedStack;
  audience: string;
  status: ProjectStatus;
  updatedAt: string;
};
