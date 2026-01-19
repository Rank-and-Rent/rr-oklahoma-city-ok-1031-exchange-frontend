import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import IdentificationRulesChecker from "@/components/tools/IdentificationRulesChecker";
import { SITE_URL, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

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

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/locations/broken-arrow-ok-1031-exchange.jpg"
          alt="Identification Rules Checker"
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
            ID Rules Checker
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Validate your 1031 exchange identification against IRS requirements. You must satisfy at least one of three identification rules.
          </p>
        </div>
      </section>

      {/* Calculator Section - Dark */}
      <section className="section-dark py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <IdentificationRulesChecker />
        </div>
      </section>

      {/* Rules Explanation Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase tracking-wide text-gray-900 md:text-4xl">
            The Three Identification Rules
          </h2>
          <p className="mt-4 text-gray-600">
            To complete a valid 1031 exchange, you must identify replacement properties within 45 days of selling your relinquished property. The IRS requires you to satisfy at least one of these three rules:
          </p>

          <div className="mt-10 space-y-8">
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="font-heading text-xl uppercase tracking-wide text-blue-900">
                    3-Property Rule
                  </h3>
                  <p className="mt-3 text-blue-800 leading-relaxed">
                    Identify up to <strong>3 replacement properties</strong> regardless of their total value. This is the most straightforward rule and works well when you have specific properties in mind.
                  </p>
                  <p className="mt-2 text-sm text-blue-700">
                    Example: Selling a $500,000 property? You can identify three $1,000,000 properties if you want.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                  200%
                </div>
                <div>
                  <h3 className="font-heading text-xl uppercase tracking-wide text-green-900">
                    200% Rule
                  </h3>
                  <p className="mt-3 text-green-800 leading-relaxed">
                    Identify <strong>any number of properties</strong> as long as their combined fair market value does not exceed 200% of the relinquished property&apos;s value.
                  </p>
                  <p className="mt-2 text-sm text-green-700">
                    Example: Selling a $500,000 property? Total identified value cannot exceed $1,000,000.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-purple-200 bg-purple-50 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">
                  95%
                </div>
                <div>
                  <h3 className="font-heading text-xl uppercase tracking-wide text-purple-900">
                    95% Rule
                  </h3>
                  <p className="mt-3 text-purple-800 leading-relaxed">
                    Identify <strong>any number of properties of any value</strong>, but you must acquire at least 95% of the total aggregate value of all identified properties.
                  </p>
                  <p className="mt-2 text-sm text-purple-700">
                    Example: Identify $2,000,000 in properties? You must close on at least $1,900,000 worth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-8">
            <h3 className="font-heading text-xl uppercase tracking-wide text-amber-900">45-Day Deadline</h3>
            <p className="mt-4 text-amber-800 leading-relaxed">
              You have exactly <strong>45 calendar days</strong> from the sale of your relinquished property to identify replacement properties in writing. This deadline is strict and cannot be extended, even for weekends or holidays. Missing this deadline will invalidate your entire exchange.
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
              href="/tools/exchange-cost-estimator"
              className="group rounded-xl border border-gray-700 bg-gray-800/50 p-8 transition hover:border-white/30"
            >
              <h3 className="font-heading text-xl uppercase tracking-wide text-white group-hover:text-white/80">
                Exchange Cost Estimator
              </h3>
              <p className="mt-3 text-gray-400">
                Estimate QI fees, escrow costs, and other closing costs.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <Image
            src="/locations/lawton-ok-1031-exchange.jpg"
            alt="Oklahoma City"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white md:px-8">
          <h2 className="font-heading text-4xl uppercase md:text-5xl">
            Need Help Identifying Properties?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            Our team can help you identify qualifying replacement properties and ensure your exchange meets all IRS requirements.
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
