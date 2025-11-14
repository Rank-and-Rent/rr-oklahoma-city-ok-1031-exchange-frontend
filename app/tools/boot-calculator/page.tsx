import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/breadcrumbs";
import BootCalculator from "@/components/tools/BootCalculator";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Boot Calculator | 1031 Exchange Oklahoma City",
  description:
    "Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange in Oklahoma City, OK.",
  keywords: "boot calculator, 1031 exchange boot, mortgage boot, cash boot, 1031 exchange tax, Oklahoma City",
  openGraph: {
    title: "Boot Calculator | 1031 Exchange Oklahoma City",
    description:
      "Calculate boot and estimate tax implications for your 1031 exchange. Free tool for Oklahoma City investors.",
    type: "website",
    url: `${SITE_URL}/tools/boot-calculator`,
  },
  alternates: {
    canonical: `${SITE_URL}/tools/boot-calculator`,
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Boot Calculator" },
];

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Boot Calculator | 1031 Exchange Oklahoma City",
  description:
    "Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications for your 1031 exchange.",
  url: `${SITE_URL}/tools/boot-calculator`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: "Boot Calculator", item: `${SITE_URL}/tools/boot-calculator` },
    ],
  },
};

const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Boot Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "Calculate boot and estimate tax implications for 1031 exchanges",
  url: `${SITE_URL}/tools/boot-calculator`,
};

export default function BootCalculatorPage() {
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
            Boot Calculator
          </h1>
          <p className="text-lg text-slate-700 mb-8">
            Calculate boot (cash received, mortgage relief, or non-like-kind property) and estimate potential tax
            implications for your 1031 exchange. Boot is any property or cash you receive that is not like-kind, and
            it may be subject to taxation.
          </p>

          <BootCalculator />

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
                <Link href="/tools/exchange-cost-estimator" className="text-[#1E3A8A] underline hover:text-[#EAB308]">
                  Exchange Cost Estimator
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

