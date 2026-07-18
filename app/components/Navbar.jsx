"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, User, Settings, LogOut, Menu, X, Sparkles, CirclePlay } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "#features", label: "امکانات", icon: Sparkles },
  { href: "#how-it-works", label: "روش کار", icon: CirclePlay },
];

export default function Navbar({ isLoggedIn = false, user = { name: "آرش", avatar: null } }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePanelVisible, setMobilePanelVisible] = useState(false);
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

  useEffect(() => {
    if (!mobileOpen) {
      const t = window.setTimeout(() => setMobilePanelVisible(false), 220);
      return () => window.clearTimeout(t);
    }

    setMobilePanelVisible(true);
    return undefined;
  }, [mobileOpen]);

  const toggleMobileMenu = () => {
    setMobileOpen((v) => !v);
  };

  const handleAnchorClick = (event, href) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    const targetId = href.slice(1);
    const target = document.getElementById(targetId);

    if (target) {
      const offset = 88;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }

    if (window.history.pushState) {
      window.history.pushState(null, "", href);
    } else {
      window.location.hash = href;
    }

    setMenuOpen(false);
    setMobileOpen(false);
    setMobilePanelVisible(false);
  };

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
              onClick={(event) => handleAnchorClick(event, link.href)}
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
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-paper-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marker "
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

              <div
                role="menu"
                aria-hidden={!menuOpen}
                className={`absolute left-0 top-[calc(100%+8px)] w-48 origin-top overflow-hidden rounded-xl border border-line bg-paper-raised py-1 shadow-lg shadow-ink/5 transition-all duration-200 ease-out ${
                  menuOpen
                    ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-1 scale-95 opacity-0"
                }`}
              >
                <DropdownItem icon={User} label="مشاهده پروفایل" href="/dashboard/profile" />
                <DropdownItem icon={Settings} label="تنظیمات" href="/dashboard/settings" />
                <div className="my-1 h-px bg-line" />
                <DropdownItem icon={LogOut} label="خروج" href="/logout" tone="conflict" />
              </div>
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
          onClick={toggleMobileMenu}
          aria-label="باز کردن منو"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden border-t border-line bg-paper/85 px-5 backdrop-blur-sm transition-all duration-300 ease-out md:hidden ${
          mobilePanelVisible ? "py-4 max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleAnchorClick(event, link.href)}
                className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-slate transition-colors hover:bg-paper/80 hover:text-ink"
              >
                <Icon size={16} className="shrink-0 text-slate-soft" />
                <span>{link.label}</span>
              </a>
            );
          })}
          <div className="my-1 h-px bg-line" />
          {isLoggedIn ? (
            <>
              <a href="/dashboard/profile" className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-slate transition-colors hover:bg-paper/80 hover:text-ink">
                <User size={16} className="shrink-0 text-slate-soft" />
                <span>مشاهده پروفایل</span>
              </a>
              <a href="/dashboard/settings" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate transition-colors hover:bg-paper/80 hover:text-ink">
                <Settings size={16} className="shrink-0 text-slate-soft" />
                <span>تنظیمات</span>
              </a>
              <a href="/logout" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-conflict transition-colors hover:bg-paper/80">
                <LogOut size={16} className="shrink-0" />
                <span>خروج</span>
              </a>
            </>
          ) : (
            <>
              <a href="/login" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate transition-colors hover:bg-paper/80 hover:text-ink">
                <User size={16} className="shrink-0 text-slate-soft" />
                <span>ورود</span>
              </a>
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
