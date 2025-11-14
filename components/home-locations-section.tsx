"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { locationsData } from "@/data/locations";
import SearchInput from "@/components/search-input";
import { ArrowUpRightIcon, MapPinIcon } from "@heroicons/react/24/outline";

function searchLocations(query: string): typeof locationsData {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) {
    // Show 8 locations: Oklahoma City first, then 7 others
    const primary = locationsData.find((l) => l.slug === "oklahoma-city-ok");
    const others = locationsData.filter((l) => l.slug !== "oklahoma-city-ok").slice(0, 7);
    return primary ? [primary, ...others] : others;
  }
  
  return locationsData.filter((l) => {
    return l.name.toLowerCase().includes(lowerQuery);
  }).slice(0, 8);
}

export default function HomeLocationsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredLocations = useMemo(() => {
    return searchLocations(searchQuery);
  }, [searchQuery]);

  const handleNoResultsCTA = () => {
    const params = new URLSearchParams();
    params.set("projectType", "Other");
    params.set("city", searchQuery);
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-8">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search locations..."
          className="max-w-md"
        />
      </div>

      {filteredLocations.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
          <p className="text-lg font-semibold text-slate-900">
            We can help with "{searchQuery}"
          </p>
          <p className="mt-2 text-slate-600">
            Contact us to discuss 1031 exchange support in your area.
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
            {filteredLocations.map((location) => {
              const heroImageSrc = location.heroImage || `/locations/${location.slug}-1031-exchange.jpg`;
              const heroImageAlt = `${location.name} skyline`;
              return (
                <Link
                  key={location.slug}
                  href={location.route}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/50 bg-white/70 transition hover:border-[#1E3A8A]"
                >
                  {location.heroImage && (
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
                        {location.name}
                      </div>
                    </div>
                  )}
                  {!location.heroImage && (
                    <div className="p-4 text-center text-sm font-semibold tracking-wide text-slate-700">
                      <MapPinIcon className="mx-auto mb-2 h-6 w-6 text-[#1E3A8A]" aria-hidden />
                      {location.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63]"
            >
              View All {locationsData.length} Service Areas <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

