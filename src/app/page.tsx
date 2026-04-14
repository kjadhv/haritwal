import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1528]">
      <Navbar />
      <Hero />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
