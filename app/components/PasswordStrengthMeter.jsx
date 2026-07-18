"use client";

function getStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  return Math.min(score, 4);
}

const LEVELS = [
  { label: "خیلی ضعیف", color: "var(--conflict)" },
  { label: "ضعیف", color: "var(--deep-orange)" },
  { label: "متوسط", color: "var(--amber)" },
  { label: "خوب", color: "var(--teal)" },
  { label: "قوی", color: "var(--open-slot)" },
];

export default function PasswordStrengthMeter({ password }) {
  if (!password) return null;
  const score = getStrength(password);
  const level = LEVELS[score];

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-colors duration-200"
            style={{ background: i < score ? level.color : "var(--line)" }}
          />
        ))}
      </div>
      <p className="mt-1.5 text-[11px] font-medium" style={{ color: level.color }}>
        {level.label}
      </p>
    </div>
  );
}
