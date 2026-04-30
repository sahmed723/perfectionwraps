import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import SwatchWall from "@/components/SwatchWall";
import Services from "@/components/Services";
import Timeline from "@/components/Timeline";
import Reviews from "@/components/Reviews";
import ServiceMap from "@/components/ServiceMap";
import QuoteCTA from "@/components/QuoteCTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="bg-ink min-h-screen relative overflow-x-hidden scanline">
      <Nav />
      <HeroSection />
      <StatsBar />
      <SwatchWall />
      <Services />
      <Timeline />
      <Reviews />
      <ServiceMap />
      <QuoteCTA />
      <Footer />
    </main>
  );
}
