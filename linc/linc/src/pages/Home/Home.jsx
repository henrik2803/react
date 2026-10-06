import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import FloatingWhatsApp from "../../components/layout/FloatingWhatsApp/FloatingWhatsApp";

import CookieBanner from "../../components/ui/CookieBanner/CookieBanner";

import Hero from "../../components/sections/Hero/Hero";
import Solutions from "../../components/sections/Solutions/Solutions";
import NFC from "../../components/sections/NFC/NFC";
import LandingPages from "../../components/sections/LandingPages/LandingPages";
import Comparison from "../../components/sections/Comparison/Comparison";
import Benefits from "../../components/sections/Benefits/Benefits";
import Process from "../../components/sections/Process/Process";
import CTA from "../../components/sections/CTA/CTA";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Solutions />
        <NFC />
        <LandingPages />
        <Comparison />
        <Benefits />
        <Process />
        <CTA />
      </main>

      <Footer />

      <FloatingWhatsApp />

      <CookieBanner />
    </>
  );
}

export default Home;