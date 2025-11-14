"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ServiceItem } from "@/data/types";
import SearchInput from "@/components/search-input";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { servicesData } from "@/data/services";

type ServicePageClientProps = {
  relatedServices: ServiceItem[];
  currentSlug: string;
};

function searchServices(query: string): ServiceItem[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  
  return servicesData.filter((s) => {
    const nameMatch = s.name.toLowerCase().includes(lowerQuery);
    const shortMatch = s.short.toLowerCase().includes(lowerQuery);
    return nameMatch || shortMatch;
  });
}

export default function ServicePageClient({ relatedServices, currentSlug }: ServicePageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return relatedServices;
    const results = searchServices(searchQuery).filter((s) => s.slug !== currentSlug);
    return results.slice(0, 4);
  }, [searchQuery, relatedServices, currentSlug]);

  const handleNoResultsCTA = () => {
    const params = new URLSearchParams();
    params.set("projectType", searchQuery);
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-xl font-semibold text-slate-900">Related Services</h2>
      <div className="mt-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search services..."
          className="w-full"
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className="mt-6 text-center">
          <p className="text-sm font-semibold text-slate-900">
            We can help with "{searchQuery}"
          </p>
          <button
            type="button"
            onClick={handleNoResultsCTA}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1E3A8A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#162d63]"
          >
            Contact Us <ArrowUpRightIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filteredServices.map((service) => (
            <li key={service.slug}>
              <Link
                href={service.route}
                className="block rounded-lg border border-slate-200 bg-white p-4 transition hover:border-[#1E3A8A]"
              >
                <h3 className="text-sm font-semibold text-slate-900">{service.name}</h3>
                <p className="mt-1 text-xs text-slate-600">{service.short}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

