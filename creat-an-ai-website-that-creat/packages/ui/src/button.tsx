import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
  }
>;

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5",
        {
          "bg-violet-600 text-white shadow-lg shadow-violet-950/20": variant === "primary",
          "border border-white/10 bg-slate-900 text-slate-100": variant === "secondary",
          "bg-transparent text-slate-300": variant === "ghost",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
