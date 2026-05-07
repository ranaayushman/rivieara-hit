import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const RegistrationSection = dynamic(() => import("@/components/RegistrationSection"));
const UpcomingEvents = dynamic(() => import("@/components/UpcomingEvents"));
const Schedule = dynamic(() => import("@/components/Schedule"));
const Activities = dynamic(() => import("@/components/Activities"));
const Gallery = dynamic(() => import("@/components/Gallery"));
// const Sponsors = dynamic(() => import("@/components/Sponsors"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Hero />
      <RegistrationSection />
      <UpcomingEvents />
      <Schedule />
      <Activities />
      <Gallery />
      {/* <Sponsors /> */}
      <Footer />
    </>
  );
}
