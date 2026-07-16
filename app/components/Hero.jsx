"use client";

import { useEffect, useState } from "react";

const DAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const HOUR_COLS = ["06", "08", "10", "12", "14", "16", "18"]; // each column = 2 hours

// day (row index), hourCol (column start index into HOUR_COLS), span (number of 2h columns), color
const BLOCKS = [
  { day: 0, hourCol: 0, span: 1, color: "var(--marker)" },
  { day: 1, hourCol: 4, span: 1, color: "var(--conflict)" },
  { day: 2, hourCol: 1, span: 2, color: "var(--open-slot)" },
  { day: 4, hourCol: 2, span: 1, color: "var(--open-slot)" },
  { day: 5, hourCol: 3, span: 2, color: "var(--marker)" },
  { day: 6, hourCol: 0, span: 1, color: "var(--open-slot)" },
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

          {/* Title lives in its own centered box, independent of the surrounding alignment */}
          <div className="text-center">
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
          </div>

          <p className="mx-auto mt-6 max-w-md text-justify text-base leading-8 text-slate sm:text-lg lg:mr-0">
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

        {/* Signature: mini weekly timetable — days as rows, hours as columns, blocks snap in */}
        <div className="relative">
          <div className="rounded-2xl border border-line bg-paper-raised p-4 shadow-xl shadow-ink/[0.06] sm:p-5">
            <div className="grid grid-cols-8 gap-1">
              <div />
              {HOUR_COLS.map((h) => (
                <div key={h} className="font-mono-num pb-1 text-center text-[10px] text-slate-soft">
                  {h}
                </div>
              ))}
              {DAYS.map((d, dayIdx) => (
                <DayRow key={d} day={d} dayIdx={dayIdx} mounted={mounted} />
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

function DayRow({ day, dayIdx, mounted }) {
  const delayBase = 200 + dayIdx * 100;
  return (
    <>
      <div className="flex items-center justify-end pr-1 text-[11px] font-bold text-slate-soft">
        {day}
      </div>
      {HOUR_COLS.map((_, colIdx) => {
        const block = BLOCKS.find((b) => b.day === dayIdx && b.hourCol === colIdx);
        if (block) {
          return (
            <div
              key={colIdx}
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
          (b) => b.day === dayIdx && colIdx > b.hourCol && colIdx < b.hourCol + b.span
        );
        if (covered) return null;
        return (
          <div key={colIdx} className="h-[26px] rounded-md border border-dashed border-line" />
        );
      })}
    </>
  );
}
