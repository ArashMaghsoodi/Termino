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

      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-card">
              <div className="hero-card-content">
                <h1>به ترمینو خوش آمدید</h1>
                <p>انتخاب دروس و ساخت برنامه هفتگی اینجا</p>
                <div className="hero-cta">
                  <button className="primary-btn" type="button">
                    شروع کنید
                  </button>
                  <a href="#dashboard" className="secondary-btn" style={{ alignSelf: 'center' }}>
                    مشاهده داشبورد
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features" aria-label="ویژگی‌ها">
          <div className="features-inner">
            <div className="section-head">
              <span className="kicker">ویژگی‌های کلیدی</span>
              <h2>ابزاری قدرتمند برای برنامه‌ریزی</h2>
              <p>ترمینو با امکانات پیشرفته خود، شما را در انتخاب واحد و مدیریت برنامه تحصیلی یاری می‌کند.</p>
            </div>

            <div className="feature-cards">
              <div className="feature-card">
                <img className="feature-icon" src="/src/assets/schedule-48.png" alt="زمان‌بندی" />
                <h3>تشخیص تداخل</h3>
                <p>سیستم به صورت خودکار تداخل‌های زمانی بین دروس انتخابی را شناسایی می‌کند.</p>
              </div>
              <div className="feature-card">
                <img className="feature-icon" src="/src/assets/diamond-48.png" alt="الماس" />
                <h3>برنامه‌ساز هوشمند</h3>
                <p>برنامه‌های هفتگی مختلف بسازید و بهترین گزینه را انتخاب کنید.</p>
              </div>
              <div className="feature-card">
                <img className="feature-icon" src="/src/assets/book-shelf-48.png" alt="کتابخانه" />
                <h3>کاتالوگ دروس</h3>
                <p>جستجو و فیلتر پیشرفته در میان تمام دروس ارائه شده در دانشگاه.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
