const SITE_NAME = "Securitynet";
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://securitynet.ai";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Override when this page mirrors another route's content (e.g. `/` vs `/presale`) and should defer to it for canonical/og:url. */
  canonical?: string;
};

/**
 * Builds a page's `metadata` export with consistent OpenGraph/Twitter shape.
 * Next.js replaces (rather than deep-merges) `openGraph`/`twitter` objects
 * defined at the page level, so every page must restate `siteName`/`type`/`card`
 * itself — this helper keeps that restatement in one place.
 */
export function pageMetadata({ title, description, path, canonical }: PageMetadataInput) {
  const canonicalPath = canonical ?? path;
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}

export { SITE_NAME, SITE_URL };
