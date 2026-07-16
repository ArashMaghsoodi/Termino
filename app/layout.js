import { Space_Grotesk, Vazirmatn, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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

const azhdar = localFont({
  src: [
    { path: "./fonts/azhdar/Azhdar-Thin.ttf", weight: "100", style: "normal" },
    { path: "./fonts/azhdar/Azhdar-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/azhdar/Azhdar-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/azhdar/Azhdar-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-azhdar",
  display: "swap",
  fallback: ["sans-serif"],
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
      className={`${spaceGrotesk.variable} ${vazirmatn.variable} ${jetbrainsMono.variable} ${azhdar.variable} h-full antialiased`}
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
