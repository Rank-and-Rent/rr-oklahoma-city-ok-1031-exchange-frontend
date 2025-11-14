import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/breadcrumbs";
import IdentificationRulesChecker from "@/components/tools/IdentificationRulesChecker";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Identification Rules Checker | 1031 Exchange Oklahoma City",
  description:
    "Validate your 1031 exchange against the 3-property, 200%, or 95% identification rules. Ensure compliance with IRS requirements in Oklahoma City, OK.",
  keywords: "1031 identification rules, 3 property rule, 200% rule, 95% rule, IRS compliance, Oklahoma City",
  openGraph: {
    title: "Identification Rules Checker | 1031 Exchange Oklahoma City",
    description:
      "Validate your 1031 exchange identification against IRS rules. Check compliance with 3-property, 200%, or 95% rules.",
    type: "website",
    url: `${SITE_URL}/tools/identification-rules-checker`,
  },
  alternates: {
    canonical: `${SITE_URL}/tools/identification-rules-checker`,
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Identification Rules Checker" },
];

const webPageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Identification Rules Checker | 1031 Exchange Oklahoma City",
  description:
    "Validate your 1031 exchange against the 3-property, 200%, or 95% identification rules to ensure IRS compliance.",
  url: `${SITE_URL}/tools/identification-rules-checker`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Identification Rules Checker",
        item: `${SITE_URL}/tools/identification-rules-checker`,
      },
    ],
  },
};

const softwareApplicationLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Identification Rules Checker",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: "Validate 1031 exchange identification against IRS rules: 3-property, 200%, or 95% rules",
  url: `${SITE_URL}/tools/identification-rules-checker`,
};

export default function IdentificationRulesCheckerPage() {
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
            Identification Rules Checker
          </h1>
          <p className="text-lg text-slate-700 mb-8">
            Validate your 1031 exchange identification against IRS requirements. You must satisfy at least one of three
            identification rules: the 3-property rule (identify up to 3 properties regardless of value), the 200% rule
            (identify any number of properties with total value up to 200% of relinquished value), or the 95% rule
            (identify any number but acquire at least 95% of the total identified value).
          </p>

          <IdentificationRulesChecker />

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
                <Link href="/tools/exchange-cost-estimator" className="text-[#1E3A8A] underline hover:text-[#EAB308]">
                  Exchange Cost Estimator
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

