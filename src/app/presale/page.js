import MyAccount from "./components/account";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import DigitalGold from "@/components/token/erctoken";
import { pageMetadata } from "@/app/libs/seo";

// Mirrors the root `/` route's content exactly — canonicalize to `/` so
// search engines treat this as the same page rather than duplicate content.
export const metadata = pageMetadata({
  title: "XN Token Presale",
  description:
    "Join the SecurityNet (XN) presale — purchase XN, the BEP-20 utility token powering the Securitynet AI security ecosystem on Binance Smart Chain, at $0.20 per token.",
  path: "/presale",
  canonical: "/",
});

const Presalepage = () => {
  return (
    <>
      <Header />
      <div className="h-[72px]" aria-hidden="true" />
      <DigitalGold />
      <MyAccount />
      <Footer />
    </>
  );
};

export default Presalepage;
