import type { Workflow } from "@evona/contracts";

export function getBuiltInWorkflows(): Workflow[] {
  return [
    {
      id: "focused-workbench",
      name: "Focused Workbench",
      description: "Open the core daily productivity stack.",
      entryNodeId: "launch-vscode",
      tags: ["productivity", "daily"],
      nodes: [
        {
          id: "launch-vscode",
          action: "launchApp",
          params: { app: "vscode" },
          next: ["open-documents"]
        },
        {
          id: "open-documents",
          action: "openPath",
          params: { pathAlias: "documents" },
          next: ["launch-browser"]
        },
        {
          id: "launch-browser",
          action: "launchApp",
          params: { app: "chrome" },
          next: []
        }
      ]
    }
  ];
}
