import path from "node:path";

export class SafetyPolicy {
  constructor(private readonly allowedRoots: string[]) {}

  canAccessPath(targetPath: string): boolean {
    if (this.allowedRoots.length === 0) {
      return true;
    }

    const normalizedTarget = path.resolve(targetPath).toLowerCase();
    return this.allowedRoots.some((root) =>
      normalizedTarget.startsWith(path.resolve(root).toLowerCase())
    );
  }

  explainBlockedPath(targetPath: string): string {
    return `Path access blocked by EVONA policy: ${targetPath}`;
  }
}
