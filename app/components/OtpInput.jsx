"use client";

import { useEffect, useRef } from "react";

const LENGTH = 4;

export default function OtpInput({ value, onChange, error, autoFocus = true }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (autoFocus) inputRefs.current[0]?.focus();
  }, [autoFocus]);

  function setDigit(index, digit) {
    const next = value.split("");
    while (next.length < LENGTH) next.push("");
    next[index] = digit;
    onChange(next.join(""));
  }

  function handleChange(index, e) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (!raw) {
      setDigit(index, "");
      return;
    }
    // Handle a full paste landing in one box.
    if (raw.length > 1) {
      const digits = raw.slice(0, LENGTH).split("");
      onChange(digits.join("").padEnd(LENGTH, "").slice(0, LENGTH));
      const lastIndex = Math.min(digits.length, LENGTH) - 1;
      inputRefs.current[lastIndex]?.focus();
      return;
    }
    setDigit(index, raw);
    if (index < LENGTH - 1) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const raw = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, LENGTH);
    if (!raw) return;
    onChange(raw.padEnd(LENGTH, "").slice(0, LENGTH));
    inputRefs.current[Math.min(raw.length, LENGTH) - 1]?.focus();
  }

  return (
    <div dir="ltr" className={`flex justify-center gap-3 ${error ? "animate-shake" : ""}`}>
      {Array.from({ length: LENGTH }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`h-14 w-12 rounded-xl border bg-paper-raised text-center text-xl font-bold text-ink outline-none transition-colors focus:border-marker ${
            error ? "border-conflict" : "border-line"
          }`}
        />
      ))}
    </div>
  );
}
