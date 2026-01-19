import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { SITE_URL, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

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

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src="/locations/moore-ok-1031-exchange.jpg"
          alt="1031 Exchange Tools"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
            Free Resources
          </p>
          <h1 className="mt-4 font-heading text-5xl uppercase tracking-wide md:text-6xl lg:text-7xl">
            Exchange Tools
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Free calculators and tools to help you plan and execute your 1031 exchange. Estimate costs, calculate boot, and validate identification rules.
          </p>
        </div>
      </section>

      {/* Tools Grid - Dark Section */}
      <section className="section-dark py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="group rounded-xl border border-gray-700 bg-gray-800/50 p-8 transition hover:border-white/30 hover:bg-gray-800"
              >
                <h2 className="font-heading text-2xl uppercase tracking-wide text-white">
                  {tool.name}
                </h2>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white group-hover:underline">
                  Use Tool <ArrowUpRightIcon className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-8">
          <h2 className="font-heading text-3xl uppercase tracking-wide text-gray-900">
            Important Information
          </h2>
          <p className="mt-6 text-gray-600 leading-relaxed">
            These tools provide estimates and educational information only. They are not tax, legal, or investment advice. Results are estimates based on the information you provide. Always consult with a qualified intermediary, CPA, and legal counsel before making any decisions about your 1031 exchange.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Oklahoma does not impose a state real estate transfer tax. Recording fees and title insurance premiums still apply. Actual costs and tax implications may vary based on your specific situation.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <Image
            src="/locations/stillwater-ok-1031-exchange.jpg"
            alt="Oklahoma City"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white md:px-8">
          <h2 className="font-heading text-4xl uppercase md:text-5xl">
            Need Professional Help?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            Our team provides professional guidance on 1031 exchanges. Contact us to discuss your specific situation and get personalized recommendations.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-white inline-flex items-center gap-2"
            >
              Get Started <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-none border border-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-gray-900"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {PHONE_NUMBER}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
