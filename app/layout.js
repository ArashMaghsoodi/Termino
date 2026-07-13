import './globals.css';
import { Inter, Vazirmatn } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const vazirmatn = Vazirmatn({ subsets: ['latin'], variable: '--font-vazirmatn' });

export const metadata = {
  title: 'ترمینو',
  description: 'برنامه‌ای برای چیدن واحد ترم بعد بدون سردرگمی',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${inter.variable} ${vazirmatn.variable} min-h-screen bg-paper text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
