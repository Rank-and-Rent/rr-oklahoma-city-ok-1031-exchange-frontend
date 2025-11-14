"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/search-input";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { propertyTypesData } from "@/data/property-types";

type PropertyType = {
  slug: string;
  title: string;
  description: string;
  iconName: string;
};

type PropertyTypesSearchClientProps = {
  initialPropertyTypes: PropertyType[];
};

export default function PropertyTypesSearchClient({ initialPropertyTypes }: PropertyTypesSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredPropertyTypes = useMemo(() => {
    if (!searchQuery.trim()) return initialPropertyTypes;
    const lowerQuery = searchQuery.toLowerCase();
    return initialPropertyTypes.filter((pt) => {
      return pt.title.toLowerCase().includes(lowerQuery) || pt.description.toLowerCase().includes(lowerQuery);
    });
  }, [searchQuery, initialPropertyTypes]);

  const handleNoResultsCTA = () => {
    const params = new URLSearchParams();
    params.set("projectType", searchQuery);
    router.push(`/contact?${params.toString()}`);
  };

  // Map initial property types to propertyTypesData to get hero images
  const propertyTypesWithImages = useMemo(() => {
    return initialPropertyTypes.map((pt) => {
      const dataItem = propertyTypesData.find((item) => item.slug === pt.slug);
      return {
        ...pt,
        heroImage: dataItem?.heroImage,
      };
    });
  }, [initialPropertyTypes]);

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

      {filteredPropertyTypes.length === 0 ? (
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPropertyTypes.map((propertyType) => {
            const propertyTypeWithImage = propertyTypesWithImages.find((pt) => pt.slug === propertyType.slug);
            const heroImageSrc = propertyTypeWithImage?.heroImage || `/inventory/${propertyType.slug}-oklahoma-1031-exchange.jpg`;
            const heroImageAlt = `${propertyType.title} property type`;
            
            return (
              <Link
                key={propertyType.slug}
                href={`/property-types/${propertyType.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:border-[#1E3A8A]"
              >
                {propertyTypeWithImage?.heroImage && (
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
                <div className={`${propertyTypeWithImage?.heroImage ? 'absolute bottom-0 left-0 right-0 p-6' : 'p-6'}`}>
                  <h3 className={`text-lg font-semibold ${propertyTypeWithImage?.heroImage ? 'text-white' : 'text-slate-900 group-hover:text-[#1E3A8A]'}`}>
                    {propertyType.title}
                  </h3>
                  <p className={`mt-2 text-sm ${propertyTypeWithImage?.heroImage ? 'text-white/90' : 'text-slate-600'}`}>
                    {propertyType.description}
                  </p>
                  <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${propertyTypeWithImage?.heroImage ? 'text-white/90' : 'text-[#1E3A8A]'}`}>
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

