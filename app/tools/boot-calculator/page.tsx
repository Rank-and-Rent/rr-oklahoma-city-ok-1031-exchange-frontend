import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import BootCalculator from "@/components/tools/BootCalculator";
import { SITE_URL, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

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

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/locations/oklahoma-city-ok-1031-exchange.jpg"
          alt="Boot Calculator"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
            1031 Exchange Tools
          </p>
          <h1 className="mt-4 font-heading text-5xl uppercase tracking-wide md:text-6xl lg:text-7xl">
            Boot Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Calculate boot (cash received, mortgage relief) and estimate potential tax implications for your 1031 exchange.
          </p>
        </div>
      </section>

      {/* Calculator Section - Dark */}
      <section className="section-dark py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <BootCalculator />
        </div>
      </section>

      {/* What is Boot Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase tracking-wide text-gray-900 md:text-4xl">
            What is Boot?
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="font-heading text-xl uppercase tracking-wide text-gray-900">Cash Boot</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Any cash you receive from the exchange that is not reinvested into replacement property. This includes net cash proceeds after paying off existing debt.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="font-heading text-xl uppercase tracking-wide text-gray-900">Mortgage Boot</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Occurs when your new mortgage is less than your old mortgage. The difference in debt relief is treated as boot and may be taxable.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-8">
            <h3 className="font-heading text-xl uppercase tracking-wide text-amber-900">Important Note</h3>
            <p className="mt-4 text-amber-800 leading-relaxed">
              Boot is taxable in the year of the exchange. To fully defer capital gains taxes, you must reinvest all net proceeds and replace all debt. The 20% estimated tax rate shown is illustrative only. Your actual rate depends on your income bracket, state taxes, and depreciation recapture. Always consult with a CPA for accurate tax calculations.
            </p>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="section-dark py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase tracking-wide text-white md:text-4xl">
            Related Tools
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Link
              href="/tools/exchange-cost-estimator"
              className="group rounded-xl border border-gray-700 bg-gray-800/50 p-8 transition hover:border-white/30"
            >
              <h3 className="font-heading text-xl uppercase tracking-wide text-white group-hover:text-white/80">
                Exchange Cost Estimator
              </h3>
              <p className="mt-3 text-gray-400">
                Estimate QI fees, escrow costs, title insurance, and recording fees.
              </p>
            </Link>
            <Link
              href="/tools/identification-rules-checker"
              className="group rounded-xl border border-gray-700 bg-gray-800/50 p-8 transition hover:border-white/30"
            >
              <h3 className="font-heading text-xl uppercase tracking-wide text-white group-hover:text-white/80">
                Identification Rules Checker
              </h3>
              <p className="mt-3 text-gray-400">
                Validate your exchange against IRS identification rules.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <Image
            src="/locations/norman-ok-1031-exchange.jpg"
            alt="Oklahoma City"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white md:px-8">
          <h2 className="font-heading text-4xl uppercase md:text-5xl">
            Need Help With Your Exchange?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            Our team can help you understand boot implications and structure your exchange for maximum tax deferral.
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
