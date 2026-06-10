import React, { Fragment } from "react";

// Components
import Services from "./components/Services";
import { pageMetadata } from "@/app/libs/seo";

export const metadata = pageMetadata({
  title: "Services — AI-Powered Blockchain Security",
  description:
    "SecurityNet.ai delivers AI-driven security monitoring, on-chain threat detection, smart contract auditing, and decentralized intelligence services powered by XN.",
  path: "/services",
});

const Page = () => {
  return (
    <Fragment>
      <Services />
      
    </Fragment>
  );
};

export default Page;
