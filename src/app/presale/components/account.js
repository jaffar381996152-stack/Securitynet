"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import { Coins } from "lucide-react";
import settings from "../../../../data/settings";
import AnimatedVisualPanel from "@/components/brand/AnimatedVisualPanel";
import {
  SitePatternLeft,
  TitleLines,
} from "../../../../public/icons/icons";

function MyAccount() {
  // console.log(userData)
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      {/* <PageHeader title="Securitynet.ai" link="Home" text="Securitynet.ai" /> */}
      <section className="lg:py-16 md:py-12 py-6 relative">
        <SitePatternLeft
          width={211}
          height={373}
          className="absolute md:-left-9 left-0 md:top-8 -top-16 md:w-[10.375rem] w-[7.375rem] -z-10 lg:block hidden"
        />
        <div className="md:container mx-auto px-5">
          <div className="flex lg:flex-nowrap flex-wrap lg:gap-16 md:gap-10 gap-6">
            <div className="lg:w-2/12  xl:mt-42 lg:mt-28 lg:mx-0 mx-auto">

              {/* <br />
                  📈 Early investors benefit from exclusive rewards and bonuses! */}
              {/* <Image
                    src={promiseImg2}
                    width={622}
                    height={1100}
                    className="block h-auto w-full object-cover "
                    alt=""
                  /> */}
            </div>
            <div className="lg:w-5/12 w-full">
              <div className="flex gap-4 ">
                <div className="w-full relative lg:mt-12 rounded-2xl overflow-hidden" style={{ aspectRatio: "622 / 1100" }}>
                  <AnimatedVisualPanel
                    icon={Coins}
                    accent="#F9A328"
                    accent2="#00D4FF"
                    label="XN Token Presale"
                    className="absolute inset-0"
                  />
                </div>
              </div>
            </div>
            <div className="lg:w-7/12 w-full lg:mt-24 mt-8">
              <h1 className="xl:text-[4rem] xl:leading-[4.875rem] lg:text-[3rem] md:leading-[3.75rem] leading-[2.375rem] md:text-[2.875rem] text-[2rem] relative z-10 font-bold md:text-start text-center">
                Securitynet.ai Introducing XN – The AI Revolution on
                Blockchain!
                <TitleLines
                  width={328}
                  height={17}
                  stroke="#F9A328"
                  className="absolute -z-10 xl:top-[3.563rem] lg:top-[2.563rem] top-10 left-0 xl:w-[22rem] lg:w-[16.5rem] w-[16.125rem] md:block hidden "
                />
              </h1>
              <p className="text-base text-text md:mt-5 mt-2 md:text-start text-center">
                XN is a groundbreaking utility token fueling an advanced AI
                ecosystem. Designed to enhance AI-driven security, automation,
                and real-time intelligence, our token seamlessly integrates with
                decentralized networks, enabling secure and transparent
                AI-powered operations.
              </p>

              <div className="flex items-center md:justify-normal justify-center  md:mt-6 mt-3">
                {/* <Link
                  href="#"
                  className="px-7 py-[0.875rem] relative rounded-xl group overflow-hidden text-sm font-semibold bg-yellow-light text-white inline-block"
                >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-500 ease-out transform translate-y-0 bg-black group-hover:h-full opacity-90"></span>
                  <span className="relative group-hover:text-white">
                    Read More
                  </span>
                </Link> */}
                <Link
                  href="https://securitynets.s3.amazonaws.com/securitynetai.pdf"
                  className="px-7 py-[0.875rem] relative rounded-xl group overflow-hidden text-sm font-semibold bg-[#483AA0] text-white inline-block"
                >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-500 ease-out transform translate-y-0 bg-black group-hover:h-full opacity-90"></span>
                  <span className="relative group-hover:text-white">
                    White Paper
                  </span>
                </Link>
                {/* <Link
                  target="_blank"
                  href={settings.CODE_URL}
                  className="lg:mt-0 mt-2 px-7 py-[0.6rem] relative rounded-xl group overflow-hidden xl:text-xs lg:text-[8px] font-semibold bg-yellow-light text-white inline-block"
                >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-500 ease-out transform translate-y-0 bg-black group-hover:h-full opacity-90"></span>
                  <span className="relative group-hover:text-white">
                    Smart Contract Audited & Verified
                  </span>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>


    </Fragment>
  );
}

export default MyAccount;
