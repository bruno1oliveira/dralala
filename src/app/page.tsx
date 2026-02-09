import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuemSou from "@/components/QuemSou";
import Pilares from "@/components/Pilares";
import Stats from "@/components/Stats";
import GabineteDigital from "@/components/GabineteDigital";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <QuemSou />
      <Pilares />
      <Stats />
      <GabineteDigital />
      <Footer />
    </main>
  );
}
