import HeroCalendarDemo from "./HeroCalendarDemo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-5 pb-10 pt-8 text-center sm:px-8 sm:pt-12">
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

        <p className="mx-auto mt-6 max-w-md text-justify text-base leading-8 text-slate sm:text-lg">
          دروس ترم رو روی تقویم هفتگی بچین، تداخل‌ها رو با یه نگاه ببین، یا فقط چندتا اولویت ساده بذار تا خودمون بهترین چینش رو براش پیدا کنیم.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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

      {/* Signature: fully interactive weekly-timetable demo with mock data */}
      <div className="mx-auto max-w-3xl px-5 pb-12 sm:px-8 lg:pb-12">
        <HeroCalendarDemo />
        <p className="mt-3 text-center text-xs text-slate-soft">
          روی هر واحد کلیک کن یا بکشش تو تقویم — این فقط یه دموئه، خودت امتحانش کن
        </p>
      </div>
    </section>
  );
}
