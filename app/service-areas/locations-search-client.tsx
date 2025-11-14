"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type LocationItem } from "@/data/types";
import SearchInput from "@/components/search-input";
import { ArrowUpRightIcon, MapPinIcon } from "@heroicons/react/24/outline";

type LocationsSearchClientProps = {
  initialLocations: LocationItem[];
};

function searchLocations(query: string, locations: LocationItem[]): LocationItem[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return locations;
  
  return locations.filter((l) => {
    const nameMatch = l.name.toLowerCase().includes(lowerQuery);
    return nameMatch;
  });
}

export default function LocationsSearchClient({ initialLocations }: LocationsSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return initialLocations;
    return searchLocations(searchQuery, initialLocations);
  }, [searchQuery, initialLocations]);

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLocations.map((location) => {
            const heroImageSrc = location.heroImage || `/locations/${location.slug}-1031-exchange.jpg`;
            const heroImageAlt = `${location.name} skyline`;
            return (
              <Link
                key={location.slug}
                href={location.route}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(30,58,138,0.06)] transition hover:-translate-y-1 hover:border-[#1E3A8A]"
              >
                {location.heroImage && (
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
                <div className={`${location.heroImage ? 'absolute bottom-0 left-0 right-0 p-6' : 'p-6'}`}>
                  {!location.heroImage && (
                    <MapPinIcon className="h-8 w-8 text-[#1E3A8A]" />
                  )}
                  <h3 className={`mt-4 text-lg font-semibold ${location.heroImage ? 'text-white' : 'text-slate-900 group-hover:text-[#1E3A8A]'}`}>
                    {location.name}
                  </h3>
                  <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${location.heroImage ? 'text-white/90' : 'text-[#1E3A8A]'}`}>
                    Learn more <ArrowUpRightIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

