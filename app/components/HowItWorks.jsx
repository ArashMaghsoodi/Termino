const STEPS = [
  {
    n: "۰۱",
    title: "دروس ترمت رو وارد کن",
    desc: "اسم درس، استاد، روز و ساعت هر کلاس رو دستی اضافه کن — چند دقیقه بیشتر طول نمی‌کشه.",
  },
  {
    n: "۰۲",
    title: "روی تقویم بچینشون",
    desc: "با درگ و دراپ یا کلیک کردن، دروس رو به تقویم هفتگی اضافه کن؛ یا خیلی راحت، بذار سیستم با اولویت‌هات برات بچینه.",
  },
  {
    n: "۰۳",
    title: "تداخل‌ها رو برطرف کن",
    desc: "هر تداخل زمانی رو فوری روی تقویم می‌بینی، قبل از اینکه وقت انتخاب واحد دانشگاه برسه.",
  },
  {
    n: "۰۴",
    title: "با خیال راحت انتخاب واحد کن",
    desc: "برنامه نهایی رو مرور کن و با اطمینان بری سراغ سیستم انتخاب واحد دانشگاهت.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            روش کار، در چهار قدم
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              <span className="font-mono-num text-3xl font-medium text-line">{s.n}</span>
              <h3 className="font-display mt-3 text-base font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-justify text-sm leading-7 text-slate">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="absolute -left-4 top-4 hidden h-px w-8 bg-line lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
