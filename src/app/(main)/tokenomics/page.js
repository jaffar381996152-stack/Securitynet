import React from 'react'
import Tokenomics from './components/Tokenomics'
import { pageMetadata } from "@/app/libs/seo"

export const metadata = pageMetadata({
  title: "Tokenomics — XN Token Allocation & Distribution",
  description:
    "XN token allocation, vesting schedule, utility breakdown and smart contract details. 100,000,000 total supply. 40% presale allocation.",
  path: "/tokenomics",
})

const page = () => {
  return (
    <>
      <Tokenomics />
    </>
  )
}

export default page
