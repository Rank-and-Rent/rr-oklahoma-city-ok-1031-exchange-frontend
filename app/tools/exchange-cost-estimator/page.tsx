import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/breadcrumbs";
import ExchangeCostEstimator from "@/components/tools/ExchangeCostEstimator";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Exchange Cost Estimator | 1031 Exchange Oklahoma City",
  description:
    "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange in Oklahoma City, OK.",
  keywords: "1031 exchange costs, QI fees, escrow fees, title insurance, recording fees, Oklahoma City",
  openGraph: {
    title: "Exchange Cost Estimator | 1031 Exchange Oklahoma City",
    description:
      "Estimate total costs for your 1031 exchange including QI fees, escrow, title insurance, and recording fees.",
    type: "website",
    url: `${SITE_URL}/tools/exchange-cost-estimator`,
  },
  alternates: {
    canonical: `${SITE_URL}/tools/exchange-cost-estimator`,
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Exchange Cost Estimator" },
];

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Exchange Cost Estimator | 1031 Exchange Oklahoma City",
  description:
    "Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange.",
  url: `${SITE_URL}/tools/exchange-cost-estimator`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Exchange Cost Estimator",
        item: `${SITE_URL}/tools/exchange-cost-estimator`,
      },
    ],
  },
};

const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Exchange Cost Estimator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "Estimate total costs for 1031 exchanges including QI fees, escrow, title insurance, and recording fees",
  url: `${SITE_URL}/tools/exchange-cost-estimator`,
};

export default function ExchangeCostEstimatorPage() {
  return (
    <>
      <Script id="jsonld-webpage" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(webPageLd)}
      </Script>
      <Script id="jsonld-software" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(softwareApplicationLd)}
      </Script>
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-20">
          <Breadcrumbs items={breadcrumbItems} />

          <h1 className="mt-8 font-serif text-3xl font-bold text-slate-900 md:text-4xl mb-4">
            Exchange Cost Estimator
          </h1>
          <p className="text-lg text-slate-700 mb-8">
            Estimate the total costs associated with your 1031 exchange, including qualified intermediary (QI) fees,
            escrow costs, title insurance premiums, recording fees, and other closing costs. Understanding these costs
            helps you budget effectively for your exchange.
          </p>

          <ExchangeCostEstimator />

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-700">
              <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates
              only. Consult a qualified intermediary and tax advisor before making decisions. Oklahoma does not impose a
              state real estate transfer tax. Recording fees and title insurance premiums still apply.
            </p>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">Related Resources</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-[#1E3A8A] underline hover:text-[#EAB308]">
                  Exchange Services
                </Link>
              </li>
              <li>
                <Link href="/tools/boot-calculator" className="text-[#1E3A8A] underline hover:text-[#EAB308]">
                  Boot Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/identification-rules-checker" className="text-[#1E3A8A] underline hover:text-[#EAB308]">
                  Identification Rules Checker
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

