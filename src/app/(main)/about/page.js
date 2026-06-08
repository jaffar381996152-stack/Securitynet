import AboutHero from "./components/AboutHero";
import AboutSecuritynet from "./components/AboutSecuritynet";
import OurMission from "./components/OurMission";
import OurTeam from "./components/OurTeam";
import { pageMetadata } from "@/app/libs/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Securitynet AI transforms ordinary camera networks into intelligent security systems — designed to detect, analyze, and respond to threats with unmatched precision and scalability.",
  path: "/about",
});

const page = () => {
  return (
    <>
      <AboutHero />
      <AboutSecuritynet />
      <OurMission />
      <OurTeam />
    </>
  );
};

export default page;
