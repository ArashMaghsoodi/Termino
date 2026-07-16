"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    // Briefly enable a global transition so the whole page crossfades smoothly.
    root.classList.add("theme-transition");
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("termino-theme", next);
    } catch (e) {}
    setTheme(next);

    window.setTimeout(() => root.classList.remove("theme-transition"), 450);
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "تغییر به حالت روز" : "تغییر به حالت شب"}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-paper-raised text-ink transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marker"
    >
      <Sun
        size={17}
        className="absolute transition-all duration-300 ease-out"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? "rotate(90deg) scale(0.4)" : "rotate(0deg) scale(1)",
        }}
      />
      <Moon
        size={17}
        className="absolute transition-all duration-300 ease-out"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.4)",
        }}
      />
    </button>
  );
}
