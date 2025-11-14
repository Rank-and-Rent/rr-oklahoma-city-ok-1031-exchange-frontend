"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { propertyTypesData } from "@/data/property-types";
import SearchInput from "@/components/search-input";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

function searchInventory(query: string): typeof propertyTypesData {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) {
    return propertyTypesData;
  }
  
  return propertyTypesData.filter((item) => {
    return item.name.toLowerCase().includes(lowerQuery);
  });
}

export default function HomeInventorySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredInventory = useMemo(() => {
    return searchInventory(searchQuery);
  }, [searchQuery]);

  const handleNoResultsCTA = () => {
    const params = new URLSearchParams();
    params.set("propertyType", searchQuery);
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-8">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search property types..."
          className="max-w-md"
        />
      </div>

      {filteredInventory.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
          <p className="text-lg font-semibold text-slate-900">
            We can help with "{searchQuery}"
          </p>
          <p className="mt-2 text-slate-600">
            Contact us to discuss your specific property type needs.
          </p>
          <button
            type="button"
            onClick={handleNoResultsCTA}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63]"
          >
            Get Started <ArrowUpRightIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredInventory.map((item) => {
              const heroImageSrc = item.heroImage || `/inventory/${item.slug}-oklahoma-1031-exchange.jpg`;
              const heroImageAlt = `${item.name} property type`;
              return (
                <Link
                  key={item.slug}
                  href={item.route}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/50 bg-white/70 transition hover:border-[#1E3A8A]"
                >
                  {item.heroImage && (
                    <div className="relative h-32 w-full flex-shrink-0">
                      <Image
                        src={heroImageSrc}
                        alt={heroImageAlt}
                        fill
                        className="object-cover transition group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm font-semibold tracking-wide text-white">
                        {item.name}
                      </div>
                    </div>
                  )}
                  {!item.heroImage && (
                    <div className="p-4 text-center text-sm font-semibold tracking-wide text-slate-700">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/property-types"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 transition hover:border-[#1E3A8A]"
            >
              View all property types <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

