"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, User, Settings, LogOut, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "#features", label: "امکانات" },
  { href: "#how-it-works", label: "روش کار" },
];

export default function Navbar({ isLoggedIn = false, user = { name: "آرش", avatar: null } }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Logo + theme toggle */}
        <div className="flex items-center gap-3">
          <a href="/" className="font-display text-lg font-bold tracking-tight text-ink">
            ترمینو<span className="text-marker">.</span>
          </a>
          <ThemeToggle />
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth area */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-paper-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marker"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <ChevronDown
                  size={16}
                  className={`text-slate-soft transition-transform ${menuOpen ? "rotate-180" : ""}`}
                />
                <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-marker text-sm font-bold text-marker-ink">
                  {user.avatar ? (
                    <img src={user.avatar} alt="" className="h-full w-full object-cover" />
                  ) : (
                    user.name?.[0] ?? "?"
                  )}
                </span>
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-[calc(100%+8px)] w-48 overflow-hidden rounded-xl border border-line bg-paper-raised py-1 shadow-lg shadow-ink/5"
                >
                  <DropdownItem icon={User} label="مشاهده پروفایل" href="/dashboard/profile" />
                  <DropdownItem icon={Settings} label="تنظیمات" href="/dashboard/settings" />
                  <div className="my-1 h-px bg-line" />
                  <DropdownItem icon={LogOut} label="خروج" href="/logout" tone="conflict" />
                </div>
              )}
            </div>
          ) : (
            <>
              <a
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate transition-colors hover:text-ink"
              >
                ورود
              </a>
              <a
                href="/signup"
                className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink/90"
              >
                ثبت‌نام
              </a>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="باز کردن منو"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-line bg-paper px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="py-1.5 text-sm font-medium text-slate">
                {link.label}
              </a>
            ))}
            <div className="my-1 h-px bg-line" />
            {isLoggedIn ? (
              <>
                <a href="/dashboard/profile" className="py-1.5 text-sm font-medium text-slate">مشاهده پروفایل</a>
                <a href="/dashboard/settings" className="py-1.5 text-sm font-medium text-slate">تنظیمات</a>
                <a href="/logout" className="py-1.5 text-sm font-medium text-conflict">خروج</a>
              </>
            ) : (
              <>
                <a href="/login" className="py-1.5 text-sm font-medium text-slate">ورود</a>
                <a
                  href="/signup"
                  className="rounded-lg bg-ink px-4 py-2 text-center text-sm font-medium text-paper"
                >
                  ثبت‌نام
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function DropdownItem({ icon: Icon, label, href, tone }) {
  const toneClass = tone === "conflict" ? "text-conflict" : "text-slate";
  return (
    <a
      href={href}
      role="menuitem"
      className={`flex items-center gap-2.5 px-4 py-2 text-sm font-medium ${toneClass} transition-colors hover:bg-paper`}
    >
      <Icon size={16} />
      {label}
    </a>
  );
}
