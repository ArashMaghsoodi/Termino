"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ChevronRight, Loader2, MailCheck } from "lucide-react";
import AuthShell from "../components/AuthShell";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^09\d{9}$/;

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(identifier) && !PHONE_RE.test(identifier)) {
      setError("ایمیل یا شماره موبایل معتبر نیست");
      return;
    }
    setError("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 900);
  }

  return (
    <AuthShell>
      <div className="rounded-2xl border border-line bg-paper-raised p-6 shadow-xl shadow-ink/[0.06] sm:p-8">
        {!sent ? (
          <>
            <Link
              href="/login"
              className="mb-4 flex items-center gap-1 text-xs font-medium text-slate-soft transition-colors hover:text-ink"
            >
              <ChevronRight size={14} />
              بازگشت به ورود
            </Link>

            <h1 className="font-display text-2xl font-bold text-ink">بازیابی رمز عبور</h1>
            <p className="mt-1.5 text-sm text-slate">
              ایمیل یا شماره موبایلت رو وارد کن تا لینک بازیابی رو برات بفرستیم.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-ink">ایمیل یا شماره موبایل</span>
                <div
                  className={`flex items-center gap-2 rounded-xl border bg-paper px-3.5 py-2.5 transition-colors focus-within:border-marker ${
                    error ? "border-conflict" : "border-line"
                  }`}
                >
                  <Mail size={16} className="shrink-0 text-slate-soft" />
                  <input
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="you@example.com یا ۰۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                    className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-slate-soft/70"
                  />
                </div>
                {error && <p className="mt-1.5 text-[11px] font-medium text-conflict">{error}</p>}
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-bold text-paper transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                ارسال لینک بازیابی
              </button>
            </form>
          </>
        ) : (
          <div className="animate-pop-in flex flex-col items-center py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-open-slot/15">
              <MailCheck size={26} className="text-open-slot" />
            </div>
            <h1 className="font-display mt-4 text-xl font-bold text-ink">ارسال شد</h1>
            <p className="mt-1.5 text-sm leading-7 text-slate">
              اگه حسابی با این مشخصات وجود داشته باشه، لینک بازیابی رمز عبور براش ارسال میشه.
            </p>
            <Link
              href="/login"
              className="mt-6 rounded-xl border border-line px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-paper"
            >
              بازگشت به ورود
            </Link>
          </div>
        )}
      </div>
    </AuthShell>
  );
}
