"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X, RotateCcw, GripVertical } from "lucide-react";

const DAYS = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
const RANGE_START = 8;
const RANGE_END = 16;
const RANGE_HOURS = RANGE_END - RANGE_START;
const HOUR_LABELS = [8, 9, 10, 11, 12, 13, 14, 15, 16];
const DAY_LABEL_WIDTH = 35; // px — fixed column width for full weekday names
const DAY_LABEL_GAP = 4; // px — matches Tailwind's gap-1

const UNITS = [
  { id: "math2", name: "ریاضی ۲", prof: "سعید رضایی", day: 0, start: 8.5, end: 10, color: "var(--deep-blue)" },
  { id: "prog", name: "برنامه‌سازی پیشرفته", prof: "حسین سعیدی", day: 0, start: 9.5, end: 12.25, color: "var(--teal)" },
  { id: "phys2", name: "فیزیک ۲", prof: "علیرضا کریمی", day: 2, start: 12.75, end: 15, color: "var(--deep-orange)" },
  { id: "stats", name: "آمار و احتمال", prof: "محمد نوری", day: 1, start: 9.25, end: 12, color: "var(--amber)" },
  { id: "lang", name: "زبان تخصصی", prof: "محمدرضا احمدی", day: 4, start: 8.5, end: 10.5, color: "var(--teal)" },
  { id: "logic", name: "مدار منطقی", prof: "امیر صادقی", day: 5, start: 13.25, end: 15.5, color: "var(--deep-purple)" },
  { id: "net", name: "شبکه‌های کامپیوتری", prof: "محمدمهدی محمدی", day: 3, start: 10.75, end: 13, color: "var(--deep-orange)" },
  { id: "math1", name: "ریاضی ۱", prof: "رضا میرانی", day: 1, start: 11.5, end: 14, color: "var(--deep-blue)" },
  { id: "ctrl", name: "کنترل خطی", prof: "احمدرضا خدابنده‌لو", day: 0, start: 11.75, end: 14.25, color: "var(--amber)" },
  { id: "elec1", name: "الکترونیک ۱", prof: "محمد حسینی", day: 1, start: 13.5, end: 15.75, color: "var(--deep-purple)" },
  { id: "sig", name: "سیگنال و سیستم", prof: "علی محمدی", day: 3, start: 8.25, end: 10.5, color: "var(--teal)" },
  { id: "comm", name: "مخابرات ۱", prof: "حسن رضایی", day: 4, start: 14, end: 15.75, color: "var(--deep-orange)" },
  { id: "micro", name: "میکروپروسسور", prof: "امیر نوری", day: 5, start: 9.75, end: 12, color: "var(--amber)" },
  { id: "em", name: "موج و میدان", prof: "سعید کریمی", day: 2, start: 13.5, end: 15.75, color: "var(--deep-blue)" },
  { id: "digit", name: "مدارهای دیجیتال", prof: "رضا احمدی", day: 3, start: 12.25, end: 15.5, color: "var(--teal)" }
];

const AUTO_PLAY_ID = "math2";

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
function toPersianNum(n) {
  return String(n).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[+d]);
}

function formatClockTime(value) {
  const normalized = Number(value);
  const hours = Math.floor(normalized);
  const minutes = Math.round((normalized - hours) * 60);

  const safeHours = minutes === 60 ? hours + 1 : hours;
  const safeMinutes = minutes === 60 ? 0 : minutes;

  return `${toPersianNum(safeHours)}:${toPersianNum(String(safeMinutes).padStart(2, "0"))}`;
}

function timesOverlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

// Assign each unit to the first available horizontal lane that does not
// overlap with the units already placed in that lane. Units are first
// grouped into overlap clusters (connected components of the "overlaps"
// relation) so lane-splitting only ever affects units that actually
// conflict with something — a unit with no conflicts anywhere in the day
// always gets the full row, even if other units on that day are split.
function computeDayLayout(dayUnits) {
  const clusters = [];

  dayUnits.forEach((u) => {
    const touching = clusters.filter((c) =>
      c.some((m) => timesOverlap(u.start, u.end, m.start, m.end))
    );

    if (touching.length === 0) {
      clusters.push([u]);
      return;
    }

    const merged = [u, ...touching.flat()];
    const remaining = clusters.filter((c) => !touching.includes(c));
    clusters.length = 0;
    clusters.push(...remaining, merged);
  });

  const layout = {};

  clusters.forEach((cluster) => {
    const sortedUnits = [...cluster].sort((a, b) => {
      if (a.start !== b.start) return a.start - b.start;
      if (a.end !== b.end) return a.end - b.end;
      return a.id.localeCompare(b.id);
    });

    const lanes = [];
    const laneAssignments = new Map();

    sortedUnits.forEach((u) => {
      let assignedLane = -1;

      for (let laneIndex = 0; laneIndex < lanes.length; laneIndex += 1) {
        const lane = lanes[laneIndex];
        const hasOverlap = lane.some((m) => timesOverlap(u.start, u.end, m.start, m.end));
        if (!hasOverlap) {
          assignedLane = laneIndex;
          lane.push(u);
          break;
        }
      }

      if (assignedLane === -1) {
        lanes.push([u]);
        assignedLane = lanes.length - 1;
      }

      laneAssignments.set(u.id, assignedLane);
    });

    laneAssignments.forEach((slot, id) => {
      layout[id] = { slot, of: lanes.length };
    });
  });

  return layout;
}

export default function HeroCalendarDemo() {
  const [placedIds, setPlacedIds] = useState([]);
  const [placedOrder, setPlacedOrder] = useState([]); // order for stable side-by-side layout
  const [enteringIds, setEnteringIds] = useState(new Set());
  const [activeConflictIds, setActiveConflictIds] = useState(new Set());
  const [conflictPulse, setConflictPulse] = useState(0);
  const [conflictOffset, setConflictOffset] = useState(0);
  const [conflictGlow, setConflictGlow] = useState(0);
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

  const conflictInfo = useMemo(() => {
    const byDay = {};
    placedUnits.forEach((u) => {
      byDay[u.day] = byDay[u.day] || [];
      byDay[u.day].push(u);
    });

    const conflictSet = new Set();
    let pairCount = 0;

    Object.values(byDay).forEach((dayUnits) => {
      for (let i = 0; i < dayUnits.length; i++) {
        for (let j = i + 1; j < dayUnits.length; j++) {
          if (timesOverlap(dayUnits[i].start, dayUnits[i].end, dayUnits[j].start, dayUnits[j].end)) {
            conflictSet.add(dayUnits[i].id);
            conflictSet.add(dayUnits[j].id);
            pairCount += 1;
          }
        }
      }
    });

    return { ids: conflictSet, pairCount };
  }, [placedUnits]);

  const conflicts = conflictInfo.ids;

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

  // Trigger a single synchronized shake across every currently conflicting block.
  const prevConflictsRef = useRef(new Set());
  useEffect(() => {
    if (conflicts.size === 0) {
      setActiveConflictIds(new Set());
      setConflictOffset(0);
      prevConflictsRef.current = new Set();
      return;
    }

    const newlyConflicted = [...conflicts].filter((id) => !prevConflictsRef.current.has(id));
    if (newlyConflicted.length) {
      const nextActive = new Set(conflicts);
      setActiveConflictIds(nextActive);
      setConflictPulse((prev) => prev + 1);
      const t = window.setTimeout(() => setActiveConflictIds(new Set()), 620);
      prevConflictsRef.current = new Set(conflicts);
      return () => window.clearTimeout(t);
    }

    prevConflictsRef.current = new Set(conflicts);
  }, [conflicts]);

  useEffect(() => {
    if (activeConflictIds.size === 0) {
      setConflictOffset(0);
      setConflictGlow(0);
      return;
    }

    let frameId = 0;
    let start = null;
    const duration = 520;

    const animate = (timestamp) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const amplitude = (1 - eased) * 1.6;
      const wobble = Math.sin(progress * Math.PI * 3.2) * amplitude;
      const pulse = Math.sin(progress * Math.PI * 2.2) * 0.16 + 0.84;
      setConflictOffset(wobble);
      setConflictGlow(pulse);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        setConflictOffset(0);
        setConflictGlow(0);
      }
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [conflictPulse, activeConflictIds.size]);

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
    setActiveConflictIds(new Set());
    setConflictOffset(0);
    setConflictGlow(0);
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

  const conflictCount = conflictInfo.pairCount;
  let statusText = null;
  if (conflictCount > 0) statusText = `${toPersianNum(conflictCount)} تداخل پیدا شد`;
  else if (placedUnits.length > 0) statusText = "بدون تداخل";

  return (
    <div className="relative" ref={cardRef}>
      <div
        className={`rounded-2xl border bg-paper-raised p-4 shadow-xl shadow-slate-soft/[0.06] transition-colors sm:p-5 ${
          dragOver ? "border-marker" : "border-line"
        }`}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="font-mono-num text-xs text-slate-soft">
            {toPersianNum(RANGE_START)}:۰۰ الی {toPersianNum(RANGE_END)}:۰۰
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
            className="relative order-2 flex flex-col overflow-y-auto overflow-x-visible rounded-xl border border-line/70 bg-paper/70 px-1.5 py-1.5 shadow-inner shadow-ink/[0.03] sm:order-1 sm:w-50 sm:flex-none sidebar-scroll"
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
                <p className="flex h-full sm:py-4 items-center justify-center text-center text-xs text-slate-soft" dir="rtl" style={{ direction: "rtl" }}>
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
                        {DAYS[u.day]} {formatClockTime(u.start)}–{formatClockTime(u.end)}
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
                      const isShaking = activeConflictIds.has(u.id);
                      const isSelected = removalSelectedId === u.id;
                      const { slot = 0, of = 1 } = layout[u.id] || {};
                      const shakeTransform = isShaking
                        ? `translateX(${conflictOffset}px) rotate(${conflictOffset * 0.15}deg) scale(${1 + conflictGlow * 0.008})`
                        : "none";
                      const conflictBoxShadow = isShaking
                        ? `0 0 0 1px rgba(234, 58, 30, ${0.2 + conflictGlow * 0.12}), 0 10px 24px -14px rgba(234, 58, 30, ${0.18 + conflictGlow * 0.12})`
                        : undefined;
                      return (
                        <div
                          key={u.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setRemovalSelectedId((prev) => (prev === u.id ? null : u.id));
                          }}
                          className={`group absolute rounded-md ring-2 transition-[transform,box-shadow,opacity] duration-200 ${
                            isEntering ? "animate-pop-in" : ""
                          } ${isConflicted ? "ring-conflict" : "ring-transparent"}`}
                          style={{
                            left: `${((u.start - RANGE_START) / RANGE_HOURS) * 100}%`,
                            width: `${((u.end - u.start) / RANGE_HOURS) * 100}%`,
                            top: `${(slot / of) * 100}%`,
                            height: `${100 / of}%`,
                            background: u.color,
                            transform: shakeTransform,
                            boxShadow: conflictBoxShadow,
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
