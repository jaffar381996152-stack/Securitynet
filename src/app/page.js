import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Hero from "./home/components/Hero";
import PresaleInline from "./home/components/PresaleInline";
import TechScroll from "./home/components/TechScroll";
import TokenomicsPreview from "./home/components/TokenomicsPreview";
import HowToBuy from "./home/components/HowToBuy";
import Roadmap from "./home/components/Roadmap";
import LogoTicker from "./home/components/LogoTicker";
import CommunityCTA from "./home/components/CommunityCTA";
import FAQ from "./home/components/FAQ";
import { pageMetadata } from "@/app/libs/seo";

export const metadata = pageMetadata({
  title: "Intelligence-Grade Security, Tokenized",
  description:
    "Securitynet combines AI-powered surveillance with blockchain technology. Buy XN tokens in the presale at $0.20 — listing at $0.80.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PresaleInline />
        <TokenomicsPreview />
        <TechScroll />
        <HowToBuy />
        <Roadmap />
        <LogoTicker />
        <CommunityCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
