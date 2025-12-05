import { useEffect, useState, useRef } from 'react';
import './Navbar.css';

function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      setDropdownOpen(false);
    }
  }, [menuOpen]);

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

  const userMenuRef = useRef(null);

  // close mobile menu when viewport becomes wider than the mobile breakpoint
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mq = window.matchMedia('(min-width: 901px)');
    function handleMatch(e) {
      if (e.matches) {
        setMenuOpen(false);
      }
    }
    // ensure menu is closed when we mount on wide screens
    if (mq.matches) setMenuOpen(false);
    if (mq.addEventListener) mq.addEventListener('change', handleMatch);
    else mq.addListener(handleMatch);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handleMatch);
      else mq.removeListener(handleMatch);
    };
  }, []);

  const authButtons = isLoggedIn ? (
    <div className="user-menu" ref={userMenuRef}>
      <button className="user-trigger" onClick={() => setDropdownOpen((prev) => !prev)}>
        <img className="avatar" src="/src/assets/react.svg" alt="avatar" />
        <span>نگار دانشجو</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className={`dropdown ${dropdownOpen ? 'open' : ''}`} aria-hidden={!dropdownOpen}>
        <button type="button">پروفایل</button>
        <button type="button">تنظیمات</button>
        <button type="button" onClick={() => setIsLoggedIn(false)}>
          خروج
        </button>
      </div>
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

  // close dropdown when clicking outside
  useEffect(() => {
    function handleOutside(e) {
      if (!dropdownOpen) return;
      // Use DOM traversal to detect clicks outside any `.user-menu` container.
      // This handles both the header user-menu and the mobile menu user-menu.
      if (!e.target.closest || !e.target.closest('.user-menu')) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [dropdownOpen]);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="left-group">
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
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
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
            </div>

            {isLoggedIn ? (
              <div className="mobile-actions">
                <div className="user-menu" ref={userMenuRef}>
                  <button className="user-trigger" onClick={() => setDropdownOpen((prev) => !prev)}>
                    <img className="avatar" src="/src/assets/react.svg" alt="avatar" />
                    <span>نگار دانشجو</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div className={`dropdown ${dropdownOpen ? 'open' : ''}`} aria-hidden={!dropdownOpen}>
                    <button type="button">پروفایل</button>
                    <button type="button">تنظیمات</button>
                    <button type="button" onClick={() => setIsLoggedIn(false)}>
                      خروج
                    </button>
                  </div>
                </div>

                <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label="تغییر تم">
                  {themeIcon}
                </button>
              </div>
            ) : (
              <div className="mobile-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button className="auth-btn secondary" type="button">
                  ثبت نام
                </button>
                <button className="auth-btn primary" type="button" onClick={() => setIsLoggedIn(true)}>
                  ورود به حساب
                </button>
                <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label="تغییر تم">
                  {themeIcon}
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
