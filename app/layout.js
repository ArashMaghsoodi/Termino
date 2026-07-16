import { Space_Grotesk, Vazirmatn, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "ترمینو | Termino",
  description: "چیدن واحد ترم بعد، بدون سردرگمی.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${spaceGrotesk.variable} ${vazirmatn.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
    <head>
      <Script id="theme-init" strategy="beforeInteractive">
        {`
          (function () {
            try {
              var stored = localStorage.getItem("termino-theme");
              var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
              if (theme === "dark") document.documentElement.classList.add("dark");
            } catch (e) {}
          })();
        `}
      </Script>
    </head>
    <body className="min-h-full flex flex-col bg-paper text-slate">{children}</body>
    </html>
  );
}
