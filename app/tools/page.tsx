import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/breadcrumbs";
import {
  CalculatorIcon,
  BanknotesIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
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

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools" },
];

const tools = [
  {
    name: "Boot Calculator",
    slug: "boot-calculator",
    description: "Calculate boot (cash received, mortgage relief) and estimate tax implications for your 1031 exchange.",
    icon: CalculatorIcon,
    href: "/tools/boot-calculator",
  },
  {
    name: "Exchange Cost Estimator",
    slug: "exchange-cost-estimator",
    description: "Estimate total costs including QI fees, escrow costs, title insurance, and recording fees.",
    icon: BanknotesIcon,
    href: "/tools/exchange-cost-estimator",
  },
  {
    name: "Identification Rules Checker",
    slug: "identification-rules-checker",
    description: "Validate your exchange against the 3-property, 200%, or 95% identification rules.",
    icon: CheckCircleIcon,
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
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="mt-8">
            <h1 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl mb-4">
              1031 Exchange Tools
            </h1>
            <p className="text-lg text-slate-700 mb-12 max-w-3xl">
              Use our free calculators and tools to plan and execute your 1031 exchange. These tools help you estimate
              costs, calculate boot, validate identification rules, and more. All tools are for educational purposes
              only—consult a qualified intermediary and tax advisor for professional advice.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:border-[#1E3A8A] hover:shadow-xl"
                >
                  <tool.icon className="mb-4 h-12 w-12 text-[#1E3A8A] transition group-hover:text-[#EAB308]" />
                  <h2 className="mb-2 text-xl font-semibold text-slate-900">{tool.name}</h2>
                  <p className="text-sm text-slate-600">{tool.description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#1E3A8A] group-hover:text-[#EAB308]">
                    Use Tool →
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-700">
                <strong>Educational content only.</strong> Not tax, legal, or investment advice. Results are estimates
                only. Consult a qualified intermediary and tax advisor before making decisions. Oklahoma does not impose
                a state real estate transfer tax. Recording fees and title insurance premiums still apply.
              </p>
            </div>

            <div className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">Need Professional Help?</h2>
              <p className="text-base text-slate-600 mb-6">
                These tools provide estimates and educational information. For professional guidance on your 1031
                exchange, contact our team or consult with a qualified intermediary and tax advisor.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#1E3A8A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63]"
                >
                  Contact Us
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 transition hover:border-[#1E3A8A]"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

