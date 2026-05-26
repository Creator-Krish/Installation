import { randomUUID } from "node:crypto";
import { exec as execCallback } from "node:child_process";
import { promisify } from "node:util";
import type { ExecutionEvent, ExecuteResponse, Workflow, WorkflowNode } from "@evona/contracts";
import { findAppDescriptor } from "../registry/appRegistry";
import { findPathDescriptor } from "../registry/pathRegistry";
import { SafetyPolicy } from "../security/policy";

const exec = promisify(execCallback);

export type EngineOptions = {
  defaultShell: string;
  timeoutMs: number;
  safetyPolicy: SafetyPolicy;
};

export class WorkflowEngine {
  constructor(private readonly options: EngineOptions) {}

  async execute(workflow: Workflow, dryRun = false): Promise<ExecuteResponse> {
    const events: ExecutionEvent[] = [];
    const executionId = randomUUID();
    const nodeMap = new Map(workflow.nodes.map((node) => [node.id, node]));

    let currentNodeId: string | undefined = workflow.entryNodeId;

    while (currentNodeId) {
      const node = nodeMap.get(currentNodeId);
      if (!node) {
        events.push(this.makeEvent(workflow.id, currentNodeId, "failed", "Node not found in workflow graph."));
        return { ok: false, executionId, status: "failed", events };
      }

      events.push(this.makeEvent(workflow.id, node.id, "running", `Executing ${node.action}.`, node.params));

      try {
        if (!dryRun) {
          await this.performNode(node);
        }

        events.push(this.makeEvent(workflow.id, node.id, "completed", `Finished ${node.action}.`));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown execution failure";
        events.push(this.makeEvent(workflow.id, node.id, "failed", message));
        return { ok: false, executionId, status: "failed", events };
      }

      currentNodeId = node.next[0];
    }

    return { ok: true, executionId, status: "completed", events };
  }

  private async performNode(node: WorkflowNode): Promise<void> {
    switch (node.action) {
      case "launchApp": {
        const appName = String(node.params.app ?? "");
        const app = findAppDescriptor(appName);
        if (!app) {
          throw new Error(`Unknown app alias: ${appName}`);
        }
        await this.runShell(app.command);
        return;
      }

      case "openPath": {
        const alias = String(node.params.pathAlias ?? "");
        const directPath = String(node.params.path ?? "");
        const pathEntry = alias ? findPathDescriptor(alias) : undefined;
        const targetPath = pathEntry?.value ?? directPath;

        if (!targetPath) {
          throw new Error("No path or pathAlias supplied.");
        }

        if (!this.options.safetyPolicy.canAccessPath(targetPath)) {
          throw new Error(this.options.safetyPolicy.explainBlockedPath(targetPath));
        }

        await this.runShell(`explorer "${targetPath}"`);
        return;
      }

      case "openUrl": {
        const url = String(node.params.url ?? "");
        if (!url) {
          throw new Error("Missing URL.");
        }
        await this.runShell(
          `powershell -NoProfile -Command "Start-Process '${url.replace(/'/g, "''")}'"`
        );
        return;
      }

      case "typeText": {
        const text = String(node.params.text ?? "");
        if (!text) {
          throw new Error("Missing text payload.");
        }
        await this.runShell(
          `powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('${escapeSendKeys(text)}')"`
        );
        return;
      }

      case "pressHotkey": {
        const keys = Array.isArray(node.params.keys) ? node.params.keys.map(String) : [];
        if (keys.length === 0) {
          throw new Error("No hotkey keys provided.");
        }

        const sendKeys = keys
          .map((key) => {
            if (key === "ctrl") {
              return "^";
            }
            if (key === "alt") {
              return "%";
            }
            if (key === "shift") {
              return "+";
            }
            return key;
          })
          .join("");

        await this.runShell(
          `powershell -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('${escapeSendKeys(sendKeys)}')"`
        );
        return;
      }

      case "runShell": {
        const command = String(node.params.command ?? "");
        if (!command) {
          throw new Error("Missing shell command.");
        }
        await this.runShell(command);
        return;
      }

      case "wait": {
        const durationMs = Number(node.params.durationMs ?? 0);
        await new Promise((resolve) => setTimeout(resolve, durationMs));
        return;
      }

      case "focusApp": {
        const title = String(node.params.windowTitle ?? "");
        if (!title) {
          throw new Error("Missing window title.");
        }

        await this.runShell(
          `powershell -NoProfile -Command "$wshell = New-Object -ComObject wscript.shell; $wshell.AppActivate('${title.replace(/'/g, "''")}')"`
        );
        return;
      }

      default: {
        const unsupportedAction: never = node.action;
        throw new Error(`Unsupported action ${unsupportedAction}`);
      }
    }
  }

  private async runShell(command: string): Promise<void> {
    await exec(command, {
      shell: this.options.defaultShell,
      timeout: this.options.timeoutMs
    });
  }

  private makeEvent(
    workflowId: string,
    nodeId: string,
    status: ExecutionEvent["status"],
    message: string,
    metadata?: Record<string, unknown>
  ): ExecutionEvent {
    return {
      workflowId,
      nodeId,
      status,
      timestamp: new Date().toISOString(),
      message,
      metadata
    };
  }
}

function escapeSendKeys(value: string): string {
  return value
    .replace(/'/g, "''")
    .replace(/([+^%~(){}\[\]])/g, "{$1}");
}
