import React from 'react'
import BlogHero from './components/BlogHero'
import Blog from './components/Blog'
import { pageMetadata } from "@/app/libs/seo"

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Insights on AI-powered surveillance, blockchain security, and crypto payments from the SecurityNet team.",
  path: "/blog",
})

const page = () => {
  return (
    <>
      <BlogHero />
      <Blog />
    </>
  )
}

export default page
