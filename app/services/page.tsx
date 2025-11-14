import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { SITE_NAME, SITE_URL, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import ServicesSearchClient from "./services-search-client";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "1031 Exchange Services",
  description: "Find replacement properties and get support for your 1031 exchange. Property identification, deadline support, and underwriting analysis.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">Our Services</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">
            1031 Exchange Services for Oklahoma Investors
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Find replacement properties and get support for your 1031 exchange. We focus on property identification first, with intermediary and compliance support as secondary services.
          </p>
        </div>

        <ServicesSearchClient initialServices={servicesData} />

        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Ready to Get Started?</h2>
          <p className="mt-2 text-slate-600">
            Contact us to learn more about our 1031 exchange services.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63]"
            >
              Get Started <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 transition hover:border-slate-900"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {PHONE_NUMBER}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

