import Header from "@/components/header/Header";
import Hero from "./components/Hero";
import AnnouncementBox from "./components/AnnouncementBox";
import AlwaysPromise from "./components/AlwaysPromise";
import HowItWorks from "./components/HowItWorks";
import Events from "./components/Events";
import Partners from "./components/Partners";
import Footer from "@/components/footer/Footer";
import SectionGlowDivider from "@/components/animations/SectionGlowDivider";
import { pageMetadata } from "@/app/libs/seo";

export const metadata = pageMetadata({
  title: "AI Security Faster Than Human Capabilities",
  description:
    "Securitynet leverages cutting-edge AI for facial recognition, real-time alerts, and comprehensive monitoring — now fuelled by blockchain technology.",
  path: "/home",
});

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AnnouncementBox />
      <SectionGlowDivider />
      <AlwaysPromise />
      <SectionGlowDivider />
      <HowItWorks />
      <SectionGlowDivider />
      <Events />
      <SectionGlowDivider />
      <Partners />
      <Footer />
    </>
  );
}
