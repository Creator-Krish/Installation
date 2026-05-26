import type { CompiledCommand } from "@evona/contracts";
import { JarvisClient } from "../ai/jarvisClient";
import type { EvonaEnv } from "../config/env";
import { compileHeuristically } from "./heuristicCompiler";

export class CommandCompiler {
  private readonly jarvisClient: JarvisClient;

  constructor(private readonly env: EvonaEnv) {
    this.jarvisClient = new JarvisClient({
      apiKey: env.JARVIS,
      baseUrl: env.JARVIS_BASE_URL,
      model: env.JARVIS_MODEL
    });
  }

  async compile(input: string): Promise<{ command: CompiledCommand; usedAi: boolean }> {
    const heuristic = compileHeuristically(input);

    if (!this.jarvisClient.isConfigured()) {
      return { command: heuristic, usedAi: false };
    }

    try {
      const aiResult = await this.jarvisClient.compileWithAi(input);
      return {
        command: {
          ...heuristic,
          workflow: aiResult.workflow,
          reasoning: [...heuristic.reasoning, ...aiResult.reasoning],
          warnings: [...heuristic.warnings, ...aiResult.warnings]
        },
        usedAi: true
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown AI compiler error";
      return {
        command: {
          ...heuristic,
          warnings: [...heuristic.warnings, `AI compiler fallback engaged: ${message}`]
        },
        usedAi: false
      };
    }
  }
}
