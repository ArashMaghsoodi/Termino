"use client";

import { useEffect, useState } from "react";

const DAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

// row(1-indexed), day-index, col-span, color, delay(ms)
const BLOCKS = [
  { row: 1, day: 0, span: 2, color: "var(--marker)" },
  { row: 3, day: 0, span: 2, color: "var(--open-slot)" },
  { row: 1, day: 2, span: 3, color: "var(--open-slot)" },
  { row: 5, day: 1, span: 2, color: "var(--marker)" },
  { row: 2, day: 4, span: 2, color: "var(--open-slot)" },
  { row: 4, day: 5, span: 3, color: "var(--marker)" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-2 lg:pb-28">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-3 py-1 text-xs font-medium text-slate-soft">
            انتخاب واحد نسخه جدید
          </span>
          <h1 className="font-display mt-5 text-4xl font-bold leading-[1.15] tracking-tight text-ink sm:text-5xl">
            برنامه ترمت رو
            <br />
            <span className="relative inline-block">
              بکش، رها کن، تمام
              <svg
                className="absolute -bottom-1 left-0 w-full text-marker"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M2 8C60 2 240 2 298 8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-8 text-slate sm:text-lg lg:mr-0">
            دروس ترم رو روی تقویم هفتگی بچین، تداخل‌ها رو یه نگاه ببین، و با چند تا اولویت ساده بذار خودمون بهترین چینش رو براش پیدا کنیم.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="/signup"
              className="w-full rounded-xl bg-ink px-7 py-3.5 text-center text-sm font-bold text-paper transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              رایگان شروع کن
            </a>
            <a
              href="#how-it-works"
              className="w-full rounded-xl border border-line px-7 py-3.5 text-center text-sm font-medium text-ink transition-colors hover:bg-paper-raised sm:w-auto"
            >
              روش کار رو ببین
            </a>
          </div>
        </div>

        {/* Signature: mini weekly grid with blocks snapping in */}
        <div className="relative">
          <div className="rounded-2xl border border-line bg-paper-raised p-4 shadow-xl shadow-ink/[0.06] sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono-num text-xs text-slate-soft">۶:۰۰ – ۲۰:۰۰</span>
              <span className="text-xs font-medium text-slate-soft">هفته اول</span>
            </div>
            <div className="grid grid-cols-8 gap-1">
              <div />
              {DAYS.map((d) => (
                <div key={d} className="pb-1 text-center text-[11px] font-bold text-slate-soft">
                  {d}
                </div>
              ))}
              {Array.from({ length: 6 }).map((_, row) => (
                <RowCells key={row} row={row} mounted={mounted} />
              ))}
            </div>
          </div>
          {/* floating conflict-resolved badge */}
          <div
            className="absolute -left-4 -top-4 flex items-center gap-1.5 rounded-full border border-line bg-paper-raised px-3 py-1.5 text-xs font-bold text-open-slot shadow-md shadow-ink/5 transition-all duration-500"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(8px)",
              transitionDelay: "950ms",
            }}
          >
            بدون تداخل
          </div>
        </div>
      </div>
    </section>
  );
}

function RowCells({ row, mounted }) {
  const delayBase = 200 + row * 150;
  return (
    <>
      <div className="font-mono-num flex items-center justify-end pr-1 text-[10px] text-slate-soft">
        {(6 + row * 2).toString().padStart(2, "0")}
      </div>
      {DAYS.map((_, dayIdx) => {
        const block = BLOCKS.find((b) => b.row === row + 1 && b.day === dayIdx);
        if (block) {
          return (
            <div
              key={dayIdx}
              className="rounded-md transition-all ease-out"
              style={{
                gridColumn: `span ${block.span} / span ${block.span}`,
                background: block.color,
                height: 26,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1)" : "scale(0.85)",
                transitionDuration: "420ms",
                transitionDelay: `${delayBase}ms`,
              }}
            />
          );
        }
        const covered = BLOCKS.some(
          (b) => b.row === row + 1 && dayIdx > b.day && dayIdx < b.day + b.span
        );
        if (covered) return null;
        return (
          <div key={dayIdx} className="h-[26px] rounded-md border border-dashed border-line" />
        );
      })}
    </>
  );
}
