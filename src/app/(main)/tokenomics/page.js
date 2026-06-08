import React from 'react'
import Tokenomics from './components/Tokenomics'
import { pageMetadata } from "@/app/libs/seo"

export const metadata = pageMetadata({
  title: "Tokenomics",
  description:
    "The Securitynet ecosystem is powered by XN — a BEP-20 utility token on Binance Smart Chain that governs access, incentivises partners, and rewards data contributors.",
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
