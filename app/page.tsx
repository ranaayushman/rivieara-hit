import Hero from "@/components/Hero";
import UpcomingEvents from "@/components/UpcomingEvents";
import Activities from "@/components/Activities";
import Gallery from "@/components/Gallery";
import Sponsors from "@/components/Sponsors";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <Activities />
      <Gallery />
      <Sponsors />
      <Footer />
    </>
  );
}
