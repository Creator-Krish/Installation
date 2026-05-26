import { z } from "zod";

const envSchema = z.object({
  JARVIS: z.string().default("null"),
  JARVIS_BASE_URL: z.string().default("https://api.openai.com/v1"),
  JARVIS_MODEL: z.string().default("replace-with-your-model"),
  PORT: z.coerce.number().default(4010),
  EVONA_DEFAULT_SHELL: z.string().default("powershell.exe"),
  EVONA_WORKFLOW_TIMEOUT_MS: z.coerce.number().default(180000),
  EVONA_ALLOWED_ROOTS: z.string().default("")
});

export type EvonaEnv = z.infer<typeof envSchema>;

export function loadEnv(raw: NodeJS.ProcessEnv = process.env): EvonaEnv {
  return envSchema.parse(raw);
}

export function hasJarvisKey(env: EvonaEnv): boolean {
  return Boolean(env.JARVIS && env.JARVIS !== "null");
}
