"use client";

import { useState } from "react";
import { CalendarHeart, Target, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: CalendarHeart,
    title: "تقویم هفتگی زنده",
    desc: "دروس رو با درگ و دراپ روی تقویم بچین، تداخل‌ها رو فوری ببین و جاهای خالی برنامه‌ات رو پیدا کن.",
    color: "var(--deep-orange)",
  },
  {
    icon: Target,
    title: "هدف‌گذاری واحدها",
    desc: "تعداد واحد هدفت رو مشخص کن و خیلی راحت ببین چقدر برداشتی و چقدر تا هدفت مونده.",
    color: "var(--teal)",
  },
  {
    icon: Sparkles,
    title: "چینش خودکار با اولویت",
    desc: "بگو با کدوم استاد کلاس داشته باشی یا کدوم ساعت‌ها آزاد باشی؛ بقیه‌شو بسپار به ترمینو.",
    color: "var(--deep-blue)",
  },
];

function FeatureCard({ feature }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const [hovered, setHovered] = useState(false);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setRotateY((x - 0.5) * -10);
    setRotateX((0.5 - y) * 10);
    setGlowX(x * 100);
    setGlowY(y * 100);
    setHovered(true);
  };

  const handleLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
    setHovered(false);
  };

  const Icon = feature.icon;

  return (
    <div
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      className="group relative overflow-hidden rounded-2xl border border-line bg-paper-raised p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-150 ease-out will-change-transform"
      style={{
        transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${hovered ? -6 : 0}px) scale(${hovered ? 1.02 : 1})`,
        boxShadow: hovered
          ? `0 0 0 1px color-mix(in srgb, ${feature.color} 24%, transparent), 0 0 24px -12px color-mix(in srgb, ${feature.color} 38%, transparent), 0 20px 45px -20px rgba(15, 23, 42, 0.24)`
          : "0 10px 25px -18px rgba(15, 23, 42, 0.14)",
        borderColor: hovered ? `color-mix(in srgb, ${feature.color} 44%, rgba(15, 23, 42, 0.18))` : undefined,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 ease-out"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(260px circle at ${glowX}% ${glowY}%, color-mix(in srgb, ${feature.color} 28%, transparent), transparent 72%)`,
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />
      <div className="relative z-10">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-[transform,background-color] duration-150 ease-out"
          style={{
            background: `color-mix(in srgb, ${feature.color} 22%, transparent)`,
            transform: hovered ? "translateY(-2px) scale(1.04) rotate(-4deg)" : "translateY(0) scale(1)",
          }}
        >
          <Icon
            size={20}
            style={{
              color:
                feature.color === "var(--marker)"
                  ? "var(--marker-ink)"
                  : `color-mix(in srgb, ${feature.color} 82%, black 18%)`,
            }}
          />
        </div>
        <h3 className="font-display mt-5 text-lg font-bold text-ink">{feature.title}</h3>
        <p className="mt-2 text-justify text-sm leading-7 text-slate">{feature.desc}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="border-t border-line bg-paper-raised/50 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            همون چیزی که برای انتخاب واحد لازم داری
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate">
            یک ابزار ساده که انتخاب واحد رو از یه کار خسته‌کننده، به چند دقیقه تصمیم‌گیری راحت تبدیل می‌کنه.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
