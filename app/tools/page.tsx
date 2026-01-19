import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "1031 Exchange Tools | Calculators & Resources | Oklahoma City",
  description:
    "Free 1031 exchange calculators and tools for Oklahoma City investors. Calculate boot, estimate exchange costs, check identification rules, and more.",
  keywords: "1031 exchange tools, 1031 calculators, boot calculator, exchange cost estimator, identification rules, Oklahoma City",
  openGraph: {
    title: "1031 Exchange Tools | Oklahoma City",
    description:
      "Free calculators and tools to help you plan and execute your 1031 exchange in Oklahoma City.",
    type: "website",
    url: `${SITE_URL}/tools`,
  },
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
};

const tools = [
  {
    name: "Boot Calculator",
    slug: "boot-calculator",
    description: "Calculate boot (cash received, mortgage relief) and estimate tax implications for your 1031 exchange.",
    href: "/tools/boot-calculator",
  },
  {
    name: "Exchange Cost Estimator",
    slug: "exchange-cost-estimator",
    description: "Estimate total costs including QI fees, escrow costs, title insurance, and recording fees.",
    href: "/tools/exchange-cost-estimator",
  },
  {
    name: "Identification Rules Checker",
    slug: "identification-rules-checker",
    description: "Validate your exchange against the 3-property, 200%, or 95% identification rules.",
    href: "/tools/identification-rules-checker",
  },
];

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "1031 Exchange Tools | Oklahoma City",
  description: "Free calculators and tools to help you plan and execute your 1031 exchange.",
  url: `${SITE_URL}/tools`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
    ],
  },
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "1031 Exchange Tools",
  description: "Collection of calculators and tools for 1031 exchanges",
  itemListElement: tools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `${SITE_URL}${tool.href}`,
  })),
};

export default function ToolsPage() {
  return (
    <>
      <Script id="jsonld-webpage" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(webPageLd)}
      </Script>
      <Script id="jsonld-itemlist" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListLd)}
      </Script>

      <div>
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <Image
            src="/locations/moore-ok-1031-exchange.jpg"
            alt="1031 Exchange Tools"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="font-heading text-5xl uppercase tracking-wide md:text-6xl lg:text-7xl">
              Exchange Tools
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">
              Free calculators and tools to help you plan and execute your 1031 exchange.
            </p>
            
            {/* Social Icons */}
            <div className="mt-8 flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 transition hover:bg-gray-100"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 transition hover:bg-gray-100"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 transition hover:bg-gray-100"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Tools Grid - Dark Section */}
        <section className="section-dark py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.href}
                  className="group rounded-lg border border-gray-700 bg-gray-800/50 p-8 transition hover:border-gray-500 hover:bg-gray-800"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 transition group-hover:bg-gray-600">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="font-heading text-2xl uppercase">{tool.name}</h2>
                  <p className="mt-3 text-sm text-gray-400">{tool.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white transition group-hover:gap-3">
                    Use Tool
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="rounded-lg border border-gray-200 p-8">
              <div className="flex items-start gap-4">
                <div className="h-6 w-1 bg-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-lg uppercase">Educational Content Only</h3>
                  <p className="mt-3 text-sm text-gray-600">
                    These tools provide estimates and educational information only. Results are not tax, legal, 
                    or investment advice. Consult a qualified intermediary and tax advisor before making decisions. 
                    Oklahoma does not impose a state real estate transfer tax. Recording fees and title insurance 
                    premiums still apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Need Help Section */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-heading text-3xl uppercase md:text-4xl">
                  Need Professional Help?
                </h2>
                <p className="mt-4 text-base text-gray-600">
                  These tools provide estimates and educational information. For professional guidance 
                  on your 1031 exchange, contact our team or consult with a qualified intermediary 
                  and tax advisor.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-primary">
                    Contact Us
                  </Link>
                  <Link href="/services" className="btn-outline">
                    View Services
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/locations/norman-ok-1031-exchange.jpg"
                  alt="Professional 1031 exchange help"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Work With Us CTA */}
        <section className="relative overflow-hidden py-28 md:py-36">
          <div className="absolute inset-0">
            <Image
              src="/locations/tulsa-ok-1031-exchange.jpg"
              alt="Oklahoma property"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="absolute left-1/2 top-12 h-16 w-px -translate-x-1/2 bg-white/30" />

          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white md:px-8">
            <h2 className="font-heading text-4xl uppercase md:text-5xl lg:text-6xl">
              Work With Us
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/90">
              Our team approaches Oklahoma&apos;s real estate landscape with an auspicious blend of 
              experience, deep community ties and forward thinking. Contact us today to get 
              started on your 1031 exchange journey.
            </p>
            <Link href="/contact" className="btn-primary mt-8 bg-white text-gray-900 hover:bg-gray-100">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
