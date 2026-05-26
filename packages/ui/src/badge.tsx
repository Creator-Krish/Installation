import type { PropsWithChildren } from "react";

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-teal-200">
      {children}
    </span>
  );
}
