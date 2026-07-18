import Link from "next/link";
import { PartyPopper } from "lucide-react";
import AuthShell from "../components/AuthShell";

export const metadata = {
  title: "داشبورد | ترمینو",
};

export default function DashboardPage() {
  return (
    <AuthShell>
      <div className="animate-pop-in flex flex-col items-center rounded-2xl border border-line bg-paper-raised p-8 text-center shadow-xl shadow-ink/[0.06]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-marker/15">
          <PartyPopper size={26} className="text-marker-ink" />
        </div>
        <h1 className="font-display mt-4 text-xl font-bold text-ink">خوش اومدی!</h1>
        <p className="mt-1.5 text-sm leading-7 text-slate">
          ورودت با موفقیت انجام شد. داشبورد و تقویم هفتگی واقعی به‌زودی همین‌جا ساخته میشن.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-xl bg-ink px-5 py-2.5 text-sm font-bold text-paper transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </AuthShell>
  );
}
