import React, { Fragment } from "react";

// Components
import Services from "./components/Services";
import { pageMetadata } from "@/app/libs/seo";

export const metadata = pageMetadata({
  title: "Our Services",
  description:
    "SecurityNet AI provides a fully integrated suite of intelligent security services — custom AI models, secure platforms, and remote monitoring.",
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
