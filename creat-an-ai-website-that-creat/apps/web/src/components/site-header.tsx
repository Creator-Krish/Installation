import Link from "next/link";
import { Badge, Button } from "@buildforge/ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070912]/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-teal-400 shadow-glow" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-teal-300">BuildForge</p>
            <p className="text-xs text-slate-400">AI app and website foundry</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/studio">Studio</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/docs">Docs</Link>
          <Badge>MVP</Badge>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden md:inline-flex">
            Sign in
          </Button>
          <Link href="/studio">
            <Button>Launch studio</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
