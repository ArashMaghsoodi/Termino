export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-raised/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-right">
        <div>
          <span className="font-display text-base font-bold text-ink">
            ترمینو<span className="text-marker">.</span>
          </span>
          <p className="mt-1 text-xs text-slate-soft">چیدن واحد ترم بعد، بدون سردرگمی.</p>
        </div>
        <a
          href="/signup"
          className="rounded-lg bg-ink px-5 py-2.5 text-sm font-bold text-paper transition-colors hover:bg-ink/90"
        >
          رایگان شروع کن
        </a>
      </div>
    </footer>
  );
}
