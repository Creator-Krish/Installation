import type { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
