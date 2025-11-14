"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ServiceItem } from "@/data/types";
import SearchInput from "@/components/search-input";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

type ServicesSearchClientProps = {
  initialServices: ServiceItem[];
};

function searchServices(query: string, services: ServiceItem[]): ServiceItem[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return services;
  
  return services.filter((s) => {
    const nameMatch = s.name.toLowerCase().includes(lowerQuery);
    const shortMatch = s.short.toLowerCase().includes(lowerQuery);
    return nameMatch || shortMatch;
  });
}

export default function ServicesSearchClient({ initialServices }: ServicesSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return initialServices;
    return searchServices(searchQuery, initialServices);
  }, [searchQuery, initialServices]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleNoResultsCTA = () => {
    const params = new URLSearchParams();
    params.set("projectType", searchQuery);
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-8">
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search services..."
          className="max-w-md"
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
          <p className="text-lg font-semibold text-slate-900">
            We can help with "{searchQuery}"
          </p>
          <p className="mt-2 text-slate-600">
            Contact us to discuss your specific 1031 exchange needs.
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
          {filteredServices.map((service) => (
            <Link
              key={service.slug}
              href={service.route}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(30,58,138,0.06)] transition hover:-translate-y-1 hover:border-[#1E3A8A]"
            >
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#1E3A8A]">
                {service.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{service.short}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A8A]">
                Learn more <ArrowUpRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

