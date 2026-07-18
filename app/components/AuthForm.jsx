"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Phone, Lock, User, ChevronRight, Eye, EyeOff, Loader2 } from "lucide-react";
import OtpInput from "./OtpInput";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^09\d{9}$/;
const DEMO_OTP = "1234";

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
function toPersianNum(n) {
  return String(n).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[+d]);
}

function maskIdentifier(value, type) {
  if (type === "email") {
    const [user, domain] = value.split("@");
    if (user.length <= 2) return `${user[0]}*@${domain}`;
    return `${user.slice(0, 2)}${"*".repeat(Math.max(user.length - 2, 2))}@${domain}`;
  }
  return `${value.slice(0, 4)}${"*".repeat(5)}${value.slice(-2)}`;
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" {...props}>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-2.1 14.1-5.6l-6.5-5.5C29.6 34.8 26.9 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.6 5.1C9.6 39.6 16.3 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.5 5.5C41.6 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

export default function AuthForm({ mode }) {
  const router = useRouter();
  const isSignup = mode === "signup";

  const [step, setStep] = useState("identity"); // identity | password | otp
  const [identifierType, setIdentifierType] = useState(null); // email | phone
  const [authMethod, setAuthMethod] = useState("otp"); // for phone: otp | password

  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [otpResetKey, setOtpResetKey] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  useEffect(() => {
    if (resendCooldown === 0) return;
    const id = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendCooldown]);

  useEffect(() => {
    if (otp.length === 4 && !submitting) verifyOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  function detectLiveType(value) {
    if (!value) return null;
    if (/[a-zA-Z@]/.test(value)) return "email";
    if (/^\d+$/.test(value)) return "phone";
    return null;
  }
  const liveType = detectLiveType(identifier);

  function handleIdentitySubmit(e) {
    e.preventDefault();
    const nextErrors = {};

    if (isSignup && name.trim().length < 2) {
      nextErrors.name = "اسمت رو کامل بنویس";
    }

    let type = null;
    if (EMAIL_RE.test(identifier)) type = "email";
    else if (PHONE_RE.test(identifier)) type = "phone";
    else nextErrors.identifier = "ایمیل یا شماره موبایل معتبر نیست";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIdentifierType(type);
    if (type === "phone") {
      setAuthMethod("otp");
      setStep("otp");
      setResendCooldown(60);
    } else {
      setStep("password");
    }
  }

  function handleBackToIdentity() {
    setStep("identity");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    setOtpError(false);
    setErrors({});
  }

  function switchPhoneMethod(nextMethod) {
    setAuthMethod(nextMethod);
    setErrors({});
    if (nextMethod === "otp") {
      setOtp("");
      setOtpError(false);
      setResendCooldown(60);
      setStep("otp");
    } else {
      setStep("password");
    }
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (password.length < 6) nextErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشه";
    if (isSignup && password !== confirmPassword) {
      nextErrors.confirmPassword = "رمز عبور و تکرارش یکی نیستن";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setTimeout(() => router.push("/dashboard"), 900);
  }

  function verifyOtp() {
    setSubmitting(true);
    setTimeout(() => {
      if (otp === DEMO_OTP) {
        router.push("/dashboard");
      } else {
        setOtpError(true);
        setSubmitting(false);
        setOtp("");
        setOtpResetKey((k) => k + 1);
      }
    }, 700);
  }

  function handleResend() {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    setOtp("");
    setOtpError(false);
    setOtpResetKey((k) => k + 1);
  }

  function handleGoogleClick() {
    setGoogleSubmitting(true);
    setTimeout(() => router.push("/dashboard"), 900);
  }

  const title = isSignup ? "بیا شروع کنیم" : "خوش برگشتی";
  const subtitle = isSignup
    ? "چند قدم کوچیک تا چیدن برنامه ترم بعدت"
    : "وارد حساب ترمینو شو و برنامه‌ت رو ادامه بده";
  const enterWay = isSignup
    ? "ثبت‌نام با رمز عبور به‌جای کد"
    : "ورود با رمز عبور به‌جای کد";

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-6 shadow-xl shadow-ink/[0.06] sm:p-8">
      <div key={step} className="animate-pop-in">
        {step !== "identity" && (
          <button
            onClick={handleBackToIdentity}
            className="mb-4 flex items-center gap-1 text-xs font-medium text-slate-soft transition-colors hover:text-ink"
          >
            <ChevronRight size={14} />
            ویرایش {identifierType === "email" ? "ایمیل" : "شماره"}
          </button>
        )}

        <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
        <p className="mt-1.5 text-sm text-slate">{subtitle}</p>

        {/* ---------------- Step: identity ---------------- */}
        {step === "identity" && (
          <>
            <button
              onClick={handleGoogleClick}
              disabled={googleSubmitting}
              className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl border border-line bg-paper px-4 py-3 text-sm font-bold text-ink transition-colors hover:bg-paper-raised disabled:opacity-60"
            >
              {googleSubmitting ? (
                <Loader2 size={18} className="animate-spin text-slate-soft" />
              ) : (
                <GoogleIcon />
              )}
              ادامه با گوگل
            </button>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-line" />
              <span className="text-xs text-slate-soft">یا</span>
              <div className="h-px flex-1 bg-line" />
            </div>

            <form onSubmit={handleIdentitySubmit} className="flex flex-col gap-4">
              {isSignup && (
                <Field
                  icon={User}
                  label="اسم"
                  value={name}
                  onChange={setName}
                  placeholder="مثلاً آرش مقصودی"
                  error={errors.name}
                />
              )}
              <Field
                icon={liveType === "phone" ? Phone : Mail}
                label="ایمیل یا شماره موبایل"
                value={identifier}
                onChange={setIdentifier}
                placeholder="09123456789 یا you@example.com"
                error={errors.identifier}
                dir="ltr"
              />
              <button
                type="submit"
                className="mt-2 rounded-xl bg-ink px-4 py-3 text-sm font-bold text-paper transition-transform hover:scale-[1.01] active:scale-[0.98]"
              >
                ادامه
              </button>
            </form>
          </>
        )}

        {/* ---------------- Step: password (email, or phone fallback) ---------------- */}
        {step === "password" && (
          <form onSubmit={handlePasswordSubmit} className="mt-6 flex flex-col gap-4">
            <p className="-mt-2 text-xs text-slate-soft" dir="ltr">
              {identifier}
            </p>

            <PasswordField
              label={isSignup ? "رمز عبور" : "رمز عبور"}
              value={password}
              onChange={setPassword}
              show={showPassword}
              onToggleShow={() => setShowPassword((v) => !v)}
              error={errors.password}
            />
            {isSignup && <PasswordStrengthMeter password={password} />}

            {isSignup && (
              <PasswordField
                label="تکرار رمز عبور"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showConfirmPassword}
                onToggleShow={() => setShowConfirmPassword((v) => !v)}
                error={errors.confirmPassword}
              />
            )}

            {!isSignup && (
              <Link href="/forgot-password" className="-mt-1 self-start text-xs font-medium text-slate-soft underline underline-offset-2">
                رمز عبور رو فراموش کردم
              </Link>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-bold text-paper transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {isSignup ? "ساخت حساب" : "ورود"}
            </button>

            {identifierType === "phone" && (
              <button
                type="button"
                onClick={() => switchPhoneMethod("otp")}
                className="text-xs font-medium text-slate-soft underline underline-offset-2 transition-colors hover:text-ink"
              >
                {enterWay}
              </button>
            )}
          </form>
        )}

        {/* ---------------- Step: otp ---------------- */}
        {step === "otp" && (
          <div className="mt-6 flex flex-col gap-4">
            <p className="-mt-2 text-xs text-slate-soft">
              کد تایید به {identifierType === "email" ? "" : "شماره "}
              <span dir="ltr" className="font-medium text-slate">
                {maskIdentifier(identifier, identifierType)}
              </span>{" "}
              پیامک شد
            </p>

            <OtpInput key={otpResetKey} value={otp} onChange={setOtp} error={otpError} />

            {otpError && (
              <p className="text-center text-xs font-medium text-conflict">
                کد وارد شده صحیح نیست، دوباره امتحان کن
              </p>
            )}

            <p className="text-center text-[11px] text-slate-soft">
              برای دمو، کد {toPersianNum(DEMO_OTP)} رو وارد کن
            </p>

            {submitting && !otpError && (
              <div className="flex items-center justify-center gap-2 text-xs text-slate-soft">
                <Loader2 size={14} className="animate-spin" />
                در حال بررسی...
              </div>
            )}

            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className="text-center text-xs font-medium text-slate-soft underline underline-offset-2 transition-colors hover:text-ink disabled:no-underline disabled:opacity-60"
            >
              {resendCooldown > 0
                ? `ارسال دوباره کد تا ${toPersianNum(resendCooldown)} ثانیه دیگه`
                : "ارسال دوباره کد"}
            </button>

            <button
              type="button"
              onClick={() => switchPhoneMethod("password")}
              className="text-center text-xs font-medium text-slate-soft underline underline-offset-2 transition-colors hover:text-ink"
            >
              {enterWay}
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-slate-soft">
        {isSignup ? (
          <>
            قبلاً ثبت‌نام کردی؟{" "}
            <Link href="/login" className="font-bold text-ink underline underline-offset-2">
              وارد شو
            </Link>
          </>
        ) : (
          <>
            حساب کاربری نداری؟{" "}
            <Link href="/signup" className="font-bold text-ink underline underline-offset-2">
              ثبت‌نام کن
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, placeholder, error, dir }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-ink">{label}</span>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-paper px-3.5 py-2.5 transition-colors focus-within:border-marker ${
          error ? "border-conflict" : "border-line"
        }`}
      >
        <Icon size={16} className="shrink-0 text-slate-soft" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-slate-soft/70"
        />
      </div>
      {error && <p className="mt-1.5 text-[11px] font-medium text-conflict">{error}</p>}
    </label>
  );
}

function PasswordField({ label, value, onChange, show, onToggleShow, error }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-ink">{label}</span>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-paper px-3.5 py-2.5 transition-colors focus-within:border-marker ${
          error ? "border-conflict" : "border-line"
        }`}
      >
        <Lock size={16} className="shrink-0 text-slate-soft" />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir="ltr"
          className="w-full bg-transparent text-sm text-ink outline-none"
        />
        <button type="button" onClick={onToggleShow} className="shrink-0 text-slate-soft transition-colors hover:text-ink">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-[11px] font-medium text-conflict">{error}</p>}
    </label>
  );
}
