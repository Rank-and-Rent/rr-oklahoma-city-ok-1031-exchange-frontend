"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { servicesData } from "@/data/services";
import SearchInput from "@/components/search-input";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

function searchServices(query: string): typeof servicesData {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return servicesData.slice(0, 6);
  
  return servicesData.filter((s) => {
    const nameMatch = s.name.toLowerCase().includes(lowerQuery);
    const shortMatch = s.short.toLowerCase().includes(lowerQuery);
    return nameMatch || shortMatch;
  }).slice(0, 6);
}

export default function HomeServicesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredServices = useMemo(() => {
    return searchServices(searchQuery);
  }, [searchQuery]);

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
          onChange={setSearchQuery}
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
              className={`group rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(30,58,138,0.15)]`}
            >
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{service.name}</h3>
              <p className="mt-3 text-base text-slate-600">{service.short}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

