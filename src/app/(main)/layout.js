import "../globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
// import TopHeader from "@/components/topheader/TopHeader";

export default function RootLayout({ children }) {
  return (
    <>
      {/* <TopHeader /> */}
      <Header />
      <div className="h-[72px]" aria-hidden="true" />
      {children}
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}
