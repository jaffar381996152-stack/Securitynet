import React from 'react'
import ContactUs from './components/ContactUs'
import { pageMetadata } from "@/app/libs/seo"

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the SecurityNet AI team — questions about our AI security platform, the XN token presale, or partnerships.",
  path: "/contact-us",
})

const page = () => {
  return (
    <>
      <ContactUs />
    </>
  )
}

export default page
