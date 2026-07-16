import { LayoutGrid, Target, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "تقویم هفتگی زنده",
    desc: "دروس رو با درگ و دراپ روی تقویم بچین، تداخل‌ها رو فوری ببین و جاهای خالی برنامه‌ات رو پیدا کن.",
    color: "var(--marker)",
  },
  {
    icon: Target,
    title: "هدف‌گذاری واحد",
    desc: "تعداد واحد هدفت رو مشخص کن، همیشه ببین چقدر برداشتی و چقدر تا هدفت مونده.",
    color: "var(--open-slot)",
  },
  {
    icon: Sparkles,
    title: "چینش خودکار با اولویت",
    desc: "بگو با کدوم استاد کلاس داشته باشی یا کدوم ساعت‌ها آزاد باشی؛ بقیه‌شو بسپار به ترمینو.",
    color: "var(--marker)",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-t border-line bg-paper-raised/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            همه چیزهایی که برای انتخاب واحد لازم داری
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate">
            سه ابزار ساده که با هم، انتخاب واحد رو از یه کار خسته‌کننده به چند دقیقه تصمیم‌گیری راحت تبدیل می‌کنن.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-line bg-paper-raised p-6 transition-shadow hover:shadow-lg hover:shadow-ink/[0.04]"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `color-mix(in srgb, ${f.color} 22%, transparent)` }}
              >
                <f.icon
                  size={20}
                  style={{
                    color:
                      f.color === "var(--marker)"
                        ? "var(--marker-ink)"
                        : `color-mix(in srgb, ${f.color} 82%, black 18%)`,
                  }}
                />
              </div>
              <h3 className="font-display mt-5 text-lg font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
