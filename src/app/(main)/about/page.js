import AboutHero from "./components/AboutHero";
import OurMission from "./components/OurMission";
import CompanyStats from "./components/CompanyStats";
import { pageMetadata } from "@/app/libs/seo";

export const metadata = pageMetadata({
  title: "About — The Team Behind the Intelligence",
  description:
    "Meet the team building SecurityNet.ai — the AI-powered blockchain security platform fueled by the XN token.",
  path: "/about",
});

const page = () => {
  return (
    <>
      <AboutHero />
      <OurMission />
      <CompanyStats />
    </>
  );
};

export default page;
