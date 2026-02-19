import Hero from "@/components/Hero";
import UpcomingEvents from "@/components/UpcomingEvents";
import Gallery from "@/components/Gallery"; // preview section
import Footer from "@/components/Footer";
import Sponsors from "@/components/Sponsors";
import Schedule from "@/components/Schedule";

export default function Home() {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <Schedule />
      <Gallery />
      <Sponsors />
      <Footer />
    </>
  );
}
