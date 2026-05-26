export type PathDescriptor = {
  id: string;
  aliases: string[];
  value: string;
};

export function listDefaultPaths(): PathDescriptor[] {
  return [
    {
      id: "desktop",
      aliases: ["desktop", "my desktop"],
      value: `${process.env.USERPROFILE}\\Desktop`
    },
    {
      id: "documents",
      aliases: ["documents", "docs", "my documents"],
      value: `${process.env.USERPROFILE}\\Documents`
    },
    {
      id: "downloads",
      aliases: ["downloads", "download folder", "my downloads"],
      value: `${process.env.USERPROFILE}\\Downloads`
    },
    {
      id: "pictures",
      aliases: ["pictures", "photos", "images"],
      value: `${process.env.USERPROFILE}\\Pictures`
    }
  ];
}

export function findPathDescriptor(input: string): PathDescriptor | undefined {
  const normalized = input.trim().toLowerCase();
  return listDefaultPaths().find((entry) =>
    [entry.id, ...entry.aliases].includes(normalized)
  );
}
