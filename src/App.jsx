import { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('termino-theme') || 'dark');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('dir', 'rtl');
    root.classList.remove(theme === 'dark' ? 'light-theme' : 'dark-theme');
    root.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
    localStorage.setItem('termino-theme', theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      />

      <main className="hero">
        <div className="hero-card">
          <div>
            <h1>به ترمینو خوش آمدید</h1>
            <p>انتخاب دروس و ساخت برنامه هفتگی اینجا</p>
          </div>

          <div className="highlight-card" id="dashboard">
            <div className="highlight-item">
              <h3>انتخاب دروس هوشمند</h3>
              <p>دروس پیشنهادی را بر اساس علاقه، پیش‌نیاز و ظرفیت کلاس‌ها ببینید.</p>
            </div>
            <div className="highlight-item">
              <h3>برنامه هفتگی شفاف</h3>
              <p>چینش کلاس‌ها روی یک جدول زمانی روان، بدون تداخل و با یادآوری‌ها.</p>
            </div>
            <div className="highlight-item">
              <h3>گزارش‌گیری سریع</h3>
              <p>PDF برنامه، تعداد واحدها و وضعیت نهایی ثبت‌نام را یکجا دریافت کنید.</p>
            </div>
          </div>

          <div className="callout" id="guide">
            <div>
              <h3 style={{ margin: '0 0 6px' }}>اولین قدم را بردارید</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                حساب کاربری بسازید، لیست دروس ترم را وارد کنید و ترمینو بقیه مسیر را مدیریت می‌کند.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="primary-btn" type="button">
                شروع ثبت‌نام
              </button>
              <button className="secondary-btn" type="button">
                مشاهده راهنما
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
