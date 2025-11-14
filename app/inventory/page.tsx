import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_URL, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import { propertyTypesData } from "@/data/property-types";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "1031 Exchange Inventory | Available Property Types",
  description: "Browse our inventory of 1031 exchange replacement properties. Convenience stores, drive-thru QSR, pharmacy, dollar stores, and more.",
  alternates: {
    canonical: `${SITE_URL}/inventory`,
  },
};

export default function InventoryPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">Inventory</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">
            Available Property Types for 1031 Exchange
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Explore our inventory of replacement properties available nationwide for 1031 exchange. These properties offer stable cash flow with established tenants and long-term lease commitments.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {propertyTypesData.map((item) => {
            const heroImageSrc = item.heroImage || `/inventory/${item.slug}-oklahoma-1031-exchange.jpg`;
            const heroImageAlt = `${item.name} property type`;
            
            return (
              <Link
                key={item.slug}
                href={item.route}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:border-[#1E3A8A]"
              >
                {item.heroImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={heroImageSrc}
                      alt={heroImageAlt}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>
                )}
                <div className={`${item.heroImage ? 'absolute bottom-0 left-0 right-0 p-6' : 'p-6'}`}>
                  <h3 className={`text-lg font-semibold ${item.heroImage ? 'text-white' : 'text-slate-900 group-hover:text-[#1E3A8A]'}`}>
                    {item.name}
                  </h3>
                  <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${item.heroImage ? 'text-white/90' : 'text-[#1E3A8A]'}`}>
                    View Details <ArrowUpRightIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

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

