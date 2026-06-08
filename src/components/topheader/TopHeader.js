import React from "react";
import Link from "next/link";

const TopHeader = () => {
  return (
    <>
      <div className="bg-white px-5 sm:py-3 py-2 flex items-center">
        <div className="md:container mx-auto px-5">
          <div className="flex items-center md:justify-between justify-center flex-wrap gap-3">
            <p className="text-sm font-medium text-black md:text-start text-center">
              Securitynet.ai Pre-Sale: Revolutionizing Surveillance Security
              with AI Technology. Grab your Xn Tokens in Pre Sale
            </p>
            <Link
              href="/presale"
              className="px-4 pt-[0.313rem] pb-[0.375rem] capitalize relative rounded-xl group overflow-hidden text-sm font-semibold bg-yellow-light text-white"
            >
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-500 ease-out transform translate-y-0 bg-yellow-300 group-hover:h-full opacity-90"></span>
              <span className="relative group-hover:text-black">Pre Sale</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeader;
