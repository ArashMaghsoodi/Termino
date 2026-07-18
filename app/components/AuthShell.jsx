import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function AuthShell({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 0%, transparent 70%)",
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-ink">
          ترمینو<span className="text-marker">.</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-8 sm:px-8">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
