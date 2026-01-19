import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import ExchangeCostEstimator from "@/components/tools/ExchangeCostEstimator";
import { SITE_URL, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

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

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/locations/edmond-ok-1031-exchange.jpg"
          alt="Exchange Cost Estimator"
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
            Cost Estimator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Estimate the total costs associated with your 1031 exchange, including QI fees, escrow, title insurance, and recording fees.
          </p>
        </div>
      </section>

      {/* Calculator Section - Dark */}
      <section className="section-dark py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <ExchangeCostEstimator />
        </div>
      </section>

      {/* Cost Breakdown Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase tracking-wide text-gray-900 md:text-4xl">
            Understanding Exchange Costs
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="font-heading text-xl uppercase tracking-wide text-gray-900">QI Fees</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Qualified Intermediary fees typically range from 0.5% to 2% of the property value. The QI holds your exchange funds and prepares all required documentation.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="font-heading text-xl uppercase tracking-wide text-gray-900">Escrow Fees</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Escrow and closing coordination fees cover the administrative costs of managing the transaction and ensuring all parties meet their obligations.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="font-heading text-xl uppercase tracking-wide text-gray-900">Title Insurance</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Protects against title defects and liens. Rates typically range from 0.3% to 0.8% of property value depending on the coverage and property type.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="font-heading text-xl uppercase tracking-wide text-gray-900">Recording Fees</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                County fees for recording deeds and other legal documents. These vary by county but are typically a flat fee or based on document pages.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-green-200 bg-green-50 p-8">
            <h3 className="font-heading text-xl uppercase tracking-wide text-green-900">Oklahoma Advantage</h3>
            <p className="mt-4 text-green-800 leading-relaxed">
              Oklahoma does not impose a state real estate transfer tax, which can save thousands compared to other states. However, standard recording fees and title insurance premiums still apply. Additional costs may include lender fees, inspection costs, and survey fees.
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
              href="/tools/boot-calculator"
              className="group rounded-xl border border-gray-700 bg-gray-800/50 p-8 transition hover:border-white/30"
            >
              <h3 className="font-heading text-xl uppercase tracking-wide text-white group-hover:text-white/80">
                Boot Calculator
              </h3>
              <p className="mt-3 text-gray-400">
                Calculate boot and estimate potential tax implications.
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
            src="/locations/tulsa-ok-1031-exchange.jpg"
            alt="Oklahoma City"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white md:px-8">
          <h2 className="font-heading text-4xl uppercase md:text-5xl">
            Get an Accurate Cost Estimate
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            Our team can provide a detailed cost breakdown tailored to your specific exchange scenario and property type.
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
