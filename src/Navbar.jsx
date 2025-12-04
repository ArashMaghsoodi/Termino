import { useEffect, useRef, useState } from 'react';
import './Navbar.css';

function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const desktopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) {
      setDropdownOpen(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownOpen) return;

      const clickedInsideDesktop = desktopMenuRef.current?.contains(event.target);
      const clickedInsideMobile = mobileMenuRef.current?.contains(event.target);

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const themeIcon = theme === 'dark' ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );

  const authButtons = isLoggedIn ? (
    <div className="user-menu" ref={desktopMenuRef}>
      <button className="user-trigger" onClick={() => setDropdownOpen((prev) => !prev)}>
        <span className="avatar">ن</span>
        <span>نگار دانشجو</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {dropdownOpen && (
        <div className="dropdown">
          <button type="button">پروفایل</button>
          <button type="button">تنظیمات</button>
          <button type="button" onClick={() => setIsLoggedIn(false)}>
            خروج
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="actions">
      <button className="auth-btn secondary" type="button">
        ثبت نام
      </button>
      <button className="auth-btn primary" type="button" onClick={() => setIsLoggedIn(true)}>
        ورود به حساب
      </button>
    </div>
  );

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-block">
          <div className="brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="4" y="3" width="16" height="18" rx="3" />
              <path d="M4 8h16" />
              <path d="M8 12h4" />
            </svg>
            <span>ترمینو</span>
          </div>

          <nav className="nav-links" aria-label="primary">
            <a href="#dashboard">داشبورد</a>
            <a href="#guide">راهنما</a>
          </nav>
        </div>

        <div className="actions">
          <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label="تغییر تم">
            {themeIcon}
          </button>
          {authButtons}
        </div>

        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((prev) => !prev)} aria-label="بازکردن منو">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-row">
              <div className="mobile-links">
                <a href="#dashboard">داشبورد</a>
                <a href="#guide">راهنما</a>
              </div>
              <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label="تغییر تم">
                {themeIcon}
              </button>
            </div>
            {isLoggedIn ? (
              <div className="user-menu" ref={mobileMenuRef}>
                <button className="user-trigger" onClick={() => setDropdownOpen((prev) => !prev)}>
                  <span className="avatar">ن</span>
                  <span>نگار دانشجو</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="dropdown">
                    <button type="button">پروفایل</button>
                    <button type="button">تنظیمات</button>
                    <button type="button" onClick={() => setIsLoggedIn(false)}>
                      خروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="actions" style={{ display: 'flex' }}>
                <button className="auth-btn secondary" type="button">
                  ثبت نام
                </button>
                <button className="auth-btn primary" type="button" onClick={() => setIsLoggedIn(true)}>
                  ورود به حساب
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
