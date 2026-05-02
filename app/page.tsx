import Hero from "@/components/Hero";
import RegistrationSection from "@/components/RegistrationSection";
import UpcomingEvents from "@/components/UpcomingEvents";
import Schedule from "@/components/Schedule";
import Activities from "@/components/Activities";
import Gallery from "@/components/Gallery";
import Sponsors from "@/components/Sponsors";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <RegistrationSection />
      <UpcomingEvents />
      <Schedule />
      <Activities />
      <Gallery />
      <Sponsors />
      <Footer />
    </>
  );
}
