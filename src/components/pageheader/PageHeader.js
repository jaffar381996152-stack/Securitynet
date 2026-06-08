import React from "react";
import Link from "next/link";

const PageHeader = (props) => {
  return (
    <div className="bg-light-gray lg:min-h-[12.5rem] md:min-h-40 min-h-[7.5rem] flex items-center justify-center">
      <div className="md:container mx-auto px-5">
        <div className="flex flex-col gap-1 items-center">
          <h1 className="xl:text-[4rem] xl:leading-[4.875rem] lg:text-[3rem] md:text-[2.875rem] text-[2rem] relative font-bold">
            {props.title}
          </h1>
          <ul className="flex items-center justify-center gap-5">
            <li>
              <Link
                href="/"
                className="inline-block text-base transition duration-700 ease-in-out hover:text-[#483AA0] relative after:content-['/'] after:absolute after:top-1/2 after:-right-[0.813rem] after:-translate-y-1/2 after:text-black"
              >
                {props.link}
              </Link>
            </li>
            <li className="text-base">{props.text}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
