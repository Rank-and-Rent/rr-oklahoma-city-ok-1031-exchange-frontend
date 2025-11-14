import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";
import Breadcrumbs from "@/components/breadcrumbs";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn how we help investors identify replacement properties for Section 1031 exchanges. Secure intake, property matching, and coordination with qualified intermediaries.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ]}
        />

        <div className="mt-8">
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">About {SITE_NAME}</h1>
          
          <div className="mt-8 prose prose-slate max-w-none">
            <p className="text-lg text-slate-700">
              This site is focused on helping you identify 1031 exchange properties. We provide property identification services, deadline support, and coordination assistance for investors in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} and across {PRIMARY_STATE_ABBR}.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">What We Do</h2>
            <p className="mt-4 text-base text-slate-700">
              We help investors identify potential replacement properties for Section 1031 exchanges. Our platform provides property lists, market analysis, and deadline tracking tools to support your exchange process.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">Secure Intake Process</h2>
            <p className="mt-4 text-base text-slate-700">
              When you contact us, we collect information about your exchange needs through a secure intake process. This includes details about your relinquished property, timeline, and replacement property preferences.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">Property Matching Workflow</h2>
            <p className="mt-4 text-base text-slate-700">
              Based on your intake information, we help identify replacement properties that match your criteria. We provide property details, financial analysis, and market context to support your identification deadline.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">Coordination with Third Parties</h2>
            <p className="mt-4 text-base text-slate-700">
              We can help you get in touch with Qualified Intermediaries and tax professionals, but we are not a Qualified Intermediary ourselves. We coordinate with third party QIs and lenders to support your exchange process, but all exchange execution is handled by licensed professionals.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">Important Disclosures</h2>
            <div className="mt-4 space-y-4 text-base text-slate-700">
              <p>
                This site helps investors identify potential replacement properties for Section 1031 exchanges. This site is not a Qualified Intermediary, law firm, broker, or CPA.
              </p>
              <p>
                Users should consult a Qualified Intermediary and tax advisor before acting. All information provided is for educational purposes only and does not constitute tax or legal advice.
              </p>
              <p>
                We focus on property identification and coordination support. Exchange execution must be handled by qualified professionals including Qualified Intermediaries, CPAs, and attorneys.
              </p>
            </div>

            <div className="mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63]"
              >
                Get Started <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

