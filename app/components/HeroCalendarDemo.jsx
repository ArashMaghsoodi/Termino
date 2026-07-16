"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X, RotateCcw, GripVertical } from "lucide-react";

const DAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
const RANGE_START = 6;
const RANGE_END = 20;
const RANGE_HOURS = RANGE_END - RANGE_START;
const HOUR_LABELS = [6, 8, 10, 12, 14, 16, 18, 20];
const DAY_LABEL_WIDTH = 58; // px — fixed column width for full weekday names
const DAY_LABEL_GAP = 4; // px — matches Tailwind's gap-1

const UNITS = [
  { id: "math2", name: "ریاضی ۲", prof: "دکتر رضایی", day: 0, start: 8, end: 10, color: "var(--marker)" },
  { id: "prog", name: "برنامه‌سازی پیشرفته", prof: "دکتر سعیدی", day: 0, start: 8, end: 10, color: "var(--open-slot)" },
  { id: "phys2", name: "فیزیک ۲", prof: "دکتر کریمی", day: 2, start: 10, end: 12, color: "var(--open-slot)" },
  { id: "stats", name: "آمار و احتمال", prof: "دکتر نوری", day: 1, start: 13, end: 15, color: "var(--marker)" },
  { id: "lang", name: "زبان تخصصی", prof: "دکتر احمدی", day: 4, start: 9, end: 11, color: "var(--open-slot)" },
  { id: "logic", name: "مدار منطقی", prof: "دکتر صادقی", day: 5, start: 14, end: 17, color: "var(--marker)" },
  { id: "net", name: "شبکه‌های کامپیوتری", prof: "دکتر محمدی", day: 3, start: 11, end: 13, color: "var(--open-slot)" },
  { id: "test", name: "آزمون", prof: "دکتر محمدی", day: 3, start: 11, end: 13, color: "var(--open-slot)" },
];

const AUTO_PLAY_ID = "math2";

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
function toPersianNum(n) {
  return String(n).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[+d]);
}

function timesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

// Groups placed units on the same day into overlap clusters so conflicting
// blocks can be laid out side-by-side (split row height) instead of stacking.
function computeDayLayout(dayUnits) {
  const groups = [];
  dayUnits.forEach((u) => {
    const group = groups.find((g) =>
      g.some((m) => timesOverlap(u.start, u.end, m.start, m.end))
    );
    if (group) group.push(u);
    else groups.push([u]);
  });

  const layout = {};
  groups.forEach((group) => {
    group.forEach((u, i) => {
      layout[u.id] = { slot: i, of: group.length };
    });
  });
  return layout;
}

export default function HeroCalendarDemo() {
  const [placedIds, setPlacedIds] = useState([]);
  const [placedOrder, setPlacedOrder] = useState([]); // order for stable side-by-side layout
  const [enteringIds, setEnteringIds] = useState(new Set());
  const [shakeIds, setShakeIds] = useState(new Set());
  const [removalSelectedId, setRemovalSelectedId] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [autoPlayHint, setAutoPlayHint] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState(null);
  const [scrollFades, setScrollFades] = useState({ top: 0, bottom: 0 });
  const hasInteracted = useRef(false);
  const cardRef = useRef(null);
  const sidebarListRef = useRef(null);
  const calendarBodyRef = useRef(null);

  const placedUnits = useMemo(
    () => placedOrder.map((id) => UNITS.find((u) => u.id === id)).filter(Boolean),
    [placedOrder]
  );
  const availableUnits = useMemo(
    () => UNITS.filter((u) => !placedIds.includes(u.id)),
    [placedIds]
  );

  const conflicts = useMemo(() => {
    const byDay = {};
    placedUnits.forEach((u) => {
      byDay[u.day] = byDay[u.day] || [];
      byDay[u.day].push(u);
    });
    const conflictSet = new Set();
    Object.values(byDay).forEach((dayUnits) => {
      for (let i = 0; i < dayUnits.length; i++) {
        for (let j = i + 1; j < dayUnits.length; j++) {
          if (timesOverlap(dayUnits[i].start, dayUnits[i].end, dayUnits[j].start, dayUnits[j].end)) {
            conflictSet.add(dayUnits[i].id);
            conflictSet.add(dayUnits[j].id);
          }
        }
      }
    });
    return conflictSet;
  }, [placedUnits]);

  const dayLayouts = useMemo(() => {
    const out = {};
    DAYS.forEach((_, dayIdx) => {
      out[dayIdx] = computeDayLayout(placedUnits.filter((u) => u.day === dayIdx));
    });
    return out;
  }, [placedUnits]);

  function placeUnit(id) {
    if (!id || placedIds.includes(id)) return;
    hasInteracted.current = true;
    setAutoPlayHint(false);
    setPlacedIds((prev) => [...prev, id]);
    setPlacedOrder((prev) => [...prev, id]);
    setEnteringIds((prev) => new Set(prev).add(id));
    requestAnimationFrame(() => {
      setTimeout(() => {
        setEnteringIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 340);
    });
  }

  // trigger shake on whichever ids are freshly conflicted
  const prevConflictsRef = useRef(new Set());
  useEffect(() => {
    const newlyConflicted = [...conflicts].filter((id) => !prevConflictsRef.current.has(id));
    if (newlyConflicted.length) {
      setShakeIds(new Set(newlyConflicted));
      const t = setTimeout(() => setShakeIds(new Set()), 600);
      prevConflictsRef.current = conflicts;
      return () => clearTimeout(t);
    }
    prevConflictsRef.current = conflicts;
  }, [conflicts]);

  function removeUnit(id) {
    hasInteracted.current = true;
    setPlacedIds((prev) => prev.filter((x) => x !== id));
    setPlacedOrder((prev) => prev.filter((x) => x !== id));
    setRemovalSelectedId(null);
  }

  function resetDemo() {
    hasInteracted.current = true;
    setPlacedIds([]);
    setPlacedOrder([]);
    setRemovalSelectedId(null);
    setShakeIds(new Set());
  }

  // Soft auto-play hint shortly after mount if the visitor hasn't touched anything yet.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!hasInteracted.current) {
        setAutoPlayHint(true);
        setTimeout(() => {
          if (!hasInteracted.current) placeUnit(AUTO_PLAY_ID);
          setAutoPlayHint(false);
        }, 650);
      }
    }, 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clicking outside a placed block clears the mobile "selected for removal" state.
  useEffect(() => {
    function handleOutside(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setRemovalSelectedId(null);
      }
    }
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const id = e.dataTransfer.getData("text/plain");
    placeUnit(id);
  }

  function updateScrollFades() {
    const el = sidebarListRef.current;
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
    const top = maxScroll > 0 ? Math.min(1, el.scrollTop / 24) : 0;
    const bottom = maxScroll > 0 ? Math.min(1, Math.max(0, maxScroll - el.scrollTop) / 24) : 0;
    setScrollFades({ top, bottom });
  }

  useEffect(() => {
    function measureHeight() {
      updateScrollFades();
    }

    measureHeight();
    const sidebar = sidebarListRef.current;
    if (sidebar) sidebar.addEventListener("scroll", updateScrollFades, { passive: true });
    window.addEventListener("resize", measureHeight);

    return () => {
      if (sidebar) sidebar.removeEventListener("scroll", updateScrollFades);
      window.removeEventListener("resize", measureHeight);
    };
  }, []);

  const conflictCount = conflicts.size / 2;
  let statusText = null;
  if (conflictCount > 0) statusText = `${toPersianNum(conflictCount)} تداخل پیدا شد`;
  else if (placedUnits.length > 0) statusText = "بدون تداخل";

  return (
    <div className="relative" ref={cardRef}>
      <div
        className={`rounded-2xl border bg-paper-raised p-4 shadow-xl shadow-ink/[0.06] transition-colors sm:p-5 ${
          dragOver ? "border-marker" : "border-line"
        }`}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="font-mono-num text-xs text-slate-soft">
            {toPersianNum(RANGE_START)}:۰۰ – {toPersianNum(RANGE_END)}:۰۰
          </span>
          <div className="flex items-center gap-2">
            {statusText && (
              <span
                className={`text-xs font-bold ${
                  conflictCount > 0 ? "text-conflict" : "text-open-slot"
                }`}
              >
                {statusText}
              </span>
            )}
            {availableUnits.length === 0 && (
              <button
                onClick={resetDemo}
                className="flex items-center gap-1 rounded-lg border border-line px-2 py-1 text-[11px] font-medium text-slate transition-colors hover:bg-paper"
              >
                <RotateCcw size={12} />
                بازنشانی دمو
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Sidebar list of unplaced units */}
          <div
            ref={sidebarListRef}
            dir="ltr"
            className="relative order-2 flex flex-col overflow-y-auto overflow-x-visible rounded-xl border border-line/70 bg-paper/70 px-1.5 py-1.5 shadow-inner shadow-ink/[0.03] sm:order-1 sm:w-44 sm:flex-none sidebar-scroll"
            style={{ height: "300px" }}
            onScroll={updateScrollFades}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-paper/95 via-paper/70 to-transparent transition-opacity"
              style={{ opacity: scrollFades.top }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-paper/95 via-paper/70 to-transparent transition-opacity"
              style={{ opacity: scrollFades.bottom }}
            />
            <div className="relative z-10 flex flex-col gap-1.5 p-1.5">
              {availableUnits.length === 0 ? (
                <p className="flex h-full items-center justify-center text-center text-xs text-slate-soft" dir="rtl" style={{ direction: "rtl" }}>
                  همه واحدها چیده شدن!
                </p>
              ) : (
                availableUnits.map((u) => (
                  <button
                    key={u.id}
                    dir="rtl"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", u.id)}
                    onClick={() => placeUnit(u.id)}
                    className={`group flex items-center gap-2 rounded-xl border border-line/80 bg-paper px-2.5 py-2 text-right shadow-sm shadow-ink/[0.03] transition-[border-color,box-shadow] duration-200 hover:border-marker hover:shadow-lg hover:shadow-ink/6 ${
                      autoPlayHint && u.id === AUTO_PLAY_ID ? "border-marker ring-2 ring-marker/40" : ""
                    }`}
                  >
                    <GripVertical size={13} className="shrink-0 text-slate-soft opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: u.color }} />
                    <span className="min-w-0 flex-1 text-right" dir="rtl">
                      <span className="block max-w-full truncate text-[11px] font-bold text-ink" style={{ direction: "rtl", textOverflow: "ellipsis" }}>
                        {u.name}
                      </span>
                      <span className="block max-w-full truncate text-[10px] text-slate-soft" style={{ direction: "rtl", textOverflow: "ellipsis" }}>
                        {DAYS[u.day]} {toPersianNum(u.start)}–{toPersianNum(u.end)}
                      </span>
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Calendar grid */}
          <div
            dir="ltr"
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`order-1 flex-1 rounded-xl p-1.5 transition-colors sm:order-2 ${
              dragOver ? "bg-marker/10" : ""
            }`}
          >
            {/* hour header — each label sits directly above its boundary line */}
            <div
              className="relative mb-1 h-3.5"
              style={{ marginInlineStart: DAY_LABEL_WIDTH + DAY_LABEL_GAP }}
            >
              {HOUR_LABELS.map((h) => (
                <span
                  key={h}
                  className="font-mono-num absolute top-0 -translate-x-1/2 text-[9px] text-slate-soft"
                  style={{ left: `${((h - RANGE_START) / RANGE_HOURS) * 100}%` }}
                >
                  {toPersianNum(h)}
                </span>
              ))}
            </div>

            <div ref={calendarBodyRef} className="flex flex-col">
            {DAYS.map((d, dayIdx) => {
              const dayUnits = placedUnits.filter((u) => u.day === dayIdx);
              const layout = dayLayouts[dayIdx];
              return (
                <div key={d} className="mb-1 flex items-stretch gap-1">
                  <div
                    className="flex shrink-0 items-center justify-end whitespace-nowrap text-[10px] font-bold text-slate-soft"
                    style={{ width: DAY_LABEL_WIDTH }}
                  >
                    {d}
                  </div>
                  <div
                    className="relative h-9 flex-1 rounded-md border border-dashed border-line"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, transparent, transparent calc(100%/7 - 1px), var(--line) calc(100%/7 - 1px), var(--line) calc(100%/7))",
                    }}
                  >
                    {dayUnits.map((u) => {
                      const isConflicted = conflicts.has(u.id);
                      const isEntering = enteringIds.has(u.id);
                      const isShaking = shakeIds.has(u.id);
                      const isSelected = removalSelectedId === u.id;
                      const { slot = 0, of = 1 } = layout[u.id] || {};
                      return (
                        <div
                          key={u.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setRemovalSelectedId((prev) => (prev === u.id ? null : u.id));
                          }}
                          className={`group absolute rounded-md ring-2 transition-all ${
                            isEntering ? "animate-pop-in" : ""
                          } ${isShaking ? "animate-shake" : ""} ${
                            isConflicted ? "ring-conflict" : "ring-transparent"
                          }`}
                          style={{
                            left: `${((u.start - RANGE_START) / RANGE_HOURS) * 100}%`,
                            width: `${((u.end - u.start) / RANGE_HOURS) * 100}%`,
                            top: `${(slot / of) * 100}%`,
                            height: `${100 / of}%`,
                            background: u.color,
                          }}
                        >
                          <span
                            className="flex h-full w-full items-center justify-center overflow-hidden px-1.5 text-[9px] font-bold leading-none"
                            style={{ color: "rgba(0,0,0,0.78)", direction: "rtl", textAlign: "center" }}
                          >
                            <span className="max-w-full truncate text-center" style={{ direction: "rtl", textOverflow: "ellipsis" }}>
                              {u.name}
                            </span>
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeUnit(u.id);
                            }}
                            aria-label="حذف واحد"
                            className={`absolute -left-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-paper shadow transition-opacity ${
                              isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                          >
                            <X size={10} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
