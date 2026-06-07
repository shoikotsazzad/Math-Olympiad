import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import OurActivitySection from "@/components/home/OurActivitySection";
import KeyInitiativesSection from "@/components/home/KeyInitiativesSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <OurActivitySection />
        <KeyInitiativesSection />
      </main>
      <Footer />
    </div>
  );
}
