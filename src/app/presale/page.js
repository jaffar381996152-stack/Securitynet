import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import PresaleContent from "./components/PresaleContent";
import { pageMetadata } from "@/app/libs/seo";

export const metadata = pageMetadata({
  title: "XN Token Presale — Stage 3 · $0.20 USDT",
  description:
    "Join the SecurityNet (XN) presale — purchase XN at $0.20 per token. Stage 3 active, 78% filled. Listing price $0.80. BEP-20, ERC-20, and TRC-20 USDT accepted.",
  path: "/presale",
});

export default function PresalePage() {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Header />
      <main>
        <PresaleContent />
      </main>
      <Footer />
    </div>
  );
}
