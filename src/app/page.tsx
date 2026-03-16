import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Industries from '@/components/Industries';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-bg min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <div className="section-divider" />
      <Features />
      <div className="section-divider" />
      <Pricing />
      <div className="section-divider" />
      <Industries />
      <div className="section-divider" />
      <FAQ />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </main>
  );
}
