import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* isLoggedIn is hardcoded to false for now — wire this to real auth state later.
          Flip to true to preview the logged-in navbar. */}
      <Navbar isLoggedIn={false} />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
