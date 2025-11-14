import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import PropertyTypesSearchClient from "./property-types-search-client";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "1031 Exchange Property Types",
  description: "Explore property types that qualify for 1031 exchange treatment. Multifamily, industrial, retail, office, and more.",
  alternates: {
    canonical: `${SITE_URL}/property-types`,
  },
};

const propertyTypes = [
  {
    slug: "multifamily",
    title: "Multifamily Properties",
    description: "Garden, mid-rise, and workforce housing assets in Oklahoma City, Tulsa, and tertiary markets.",
    iconName: "HomeModernIcon",
  },
  {
    slug: "triple-net-retail",
    title: "Triple Net Retail",
    description: "NNN and ground lease assets with regional or national tenants for consistent cash flow.",
    iconName: "BuildingStorefrontIcon",
  },
  {
    slug: "industrial-flex",
    title: "Industrial and Flex",
    description: "Distribution, fabrication, and flex warehouses aligned with I-35 and I-40 logistics corridors.",
    iconName: "CubeIcon",
  },
  {
    slug: "agricultural-land",
    title: "Agricultural and Land",
    description: "Transitional land, agricultural tracts, and conservation holdings with Oklahoma tax considerations.",
    iconName: "SunIcon",
  },
  {
    slug: "office-medical",
    title: "Office and Medical",
    description: "Professional campuses, medical office, and adaptive reuse opportunities with reliable tenancy.",
    iconName: "BuildingOfficeIcon",
  },
  {
    slug: "mixed-use",
    title: "Mixed Use Infill",
    description: "Downtown and neighborhood infill sites that pair residential density with retail stability.",
    iconName: "SparklesIcon",
  },
];

export default function PropertyTypesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">Property Types</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">
            Assets We Help You Exchange
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            1031 Exchange Oklahoma City supports sophisticated investors across multifamily, industrial, retail, office, agricultural, and mixed use strategies statewide.
          </p>
        </div>

        <PropertyTypesSearchClient initialPropertyTypes={propertyTypes} />

        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Ready to Get Started?</h2>
          <p className="mt-2 text-slate-600">
            Contact us to discuss replacement property identification for your 1031 exchange.
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

