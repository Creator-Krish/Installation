export type AppDescriptor = {
  id: string;
  name: string;
  aliases: string[];
  command: string;
  notes?: string;
};

const WINDOWS_APPS: AppDescriptor[] = [
  {
    id: "chrome",
    name: "Google Chrome",
    aliases: ["chrome", "google chrome", "browser"],
    command: "start chrome"
  },
  {
    id: "edge",
    name: "Microsoft Edge",
    aliases: ["edge", "microsoft edge"],
    command: "start msedge"
  },
  {
    id: "vscode",
    name: "Visual Studio Code",
    aliases: ["vscode", "code", "visual studio code"],
    command: "code"
  },
  {
    id: "notepad",
    name: "Notepad",
    aliases: ["notepad", "editor"],
    command: "notepad"
  },
  {
    id: "explorer",
    name: "File Explorer",
    aliases: ["explorer", "file explorer", "folder view"],
    command: "explorer"
  },
  {
    id: "terminal",
    name: "Windows Terminal",
    aliases: ["terminal", "command line", "powershell"],
    command: "wt"
  },
  {
    id: "calculator",
    name: "Calculator",
    aliases: ["calculator", "calc"],
    command: "calc"
  }
];

export function listApps(): AppDescriptor[] {
  return WINDOWS_APPS;
}

export function findAppDescriptor(input: string): AppDescriptor | undefined {
  const normalized = input.trim().toLowerCase();
  return WINDOWS_APPS.find((app) =>
    [app.id, app.name.toLowerCase(), ...app.aliases].includes(normalized)
  );
}
