import { workflowSchema, type Workflow } from "@evona/contracts";

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string | Array<{ type?: string; text?: string }>;
    };
  }>;
};

export type JarvisCompileResult = {
  workflow: Workflow;
  reasoning: string[];
  warnings: string[];
};

export type JarvisClientOptions = {
  apiKey: string;
  baseUrl: string;
  model: string;
};

export class JarvisClient {
  constructor(private readonly options: JarvisClientOptions) {}

  isConfigured(): boolean {
    return Boolean(
      this.options.apiKey &&
        this.options.apiKey !== "null" &&
        this.options.model &&
        this.options.model !== "replace-with-your-model"
    );
  }

  async compileWithAi(input: string): Promise<JarvisCompileResult> {
    if (!this.isConfigured()) {
      throw new Error("JARVIS is missing a valid API key or model name.");
    }

    const response = await fetch(`${this.options.baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.options.apiKey}`
      },
      body: JSON.stringify({
        model: this.options.model,
        temperature: 0.1,
        response_format: {
          type: "json_object"
        },
        messages: [
          {
            role: "system",
            content:
              "You are EVONA AUTOMATION. Convert a Windows automation request into strict JSON with keys workflow, reasoning, warnings. workflow must match a node-based automation graph using actions launchApp, openPath, openUrl, typeText, pressHotkey, runShell, wait, focusApp."
          },
          {
            role: "user",
            content: `Compile this request into EVONA workflow JSON: ${input}`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`JARVIS request failed with status ${response.status}.`);
    }

    const payload = (await response.json()) as ChatCompletionResponse;
    const rawContent = payload.choices?.[0]?.message?.content;
    const content =
      typeof rawContent === "string"
        ? rawContent
        : Array.isArray(rawContent)
          ? rawContent.map((item) => item.text ?? "").join("")
          : "";

    if (!content) {
      throw new Error("JARVIS returned an empty response.");
    }

    const parsed = JSON.parse(content) as {
      workflow: Workflow;
      reasoning?: string[];
      warnings?: string[];
    };

    return {
      workflow: workflowSchema.parse(parsed.workflow),
      reasoning: parsed.reasoning ?? ["AI compilation completed."],
      warnings: parsed.warnings ?? []
    };
  }
}
