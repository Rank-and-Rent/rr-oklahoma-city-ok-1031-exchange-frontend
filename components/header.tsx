"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";
import { propertyTypesData } from "@/data/property-types";
import { PHONE_NUMBER, PHONE_HREF, SITE_NAME } from "@/lib/config";
import Image from "next/image";
import {
  ChevronDownIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export default function Header() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const inventoryRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const locationsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const toolsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const inventoryTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (locationsRef.current && !locationsRef.current.contains(event.target as Node)) {
        setLocationsOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
      if (inventoryRef.current && !inventoryRef.current.contains(event.target as Node)) {
        setInventoryOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setLocationsOpen(false);
        setToolsOpen(false);
        setInventoryOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Handle hover for desktop
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 500);
  };

  const handleLocationsMouseEnter = () => {
    if (locationsTimeoutRef.current) {
      clearTimeout(locationsTimeoutRef.current);
    }
    setLocationsOpen(true);
  };

  const handleLocationsMouseLeave = () => {
    locationsTimeoutRef.current = setTimeout(() => {
      setLocationsOpen(false);
    }, 500);
  };

  const handleToolsMouseEnter = () => {
    if (toolsTimeoutRef.current) {
      clearTimeout(toolsTimeoutRef.current);
    }
    setToolsOpen(true);
  };

  const handleToolsMouseLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => {
      setToolsOpen(false);
    }, 200);
  };

  const handleInventoryMouseEnter = () => {
    if (inventoryTimeoutRef.current) {
      clearTimeout(inventoryTimeoutRef.current);
    }
    setInventoryOpen(true);
  };

  const handleInventoryMouseLeave = () => {
    inventoryTimeoutRef.current = setTimeout(() => {
      setInventoryOpen(false);
    }, 500);
  };

  // Handle keyboard navigation
  const handleServicesKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setServicesOpen(!servicesOpen);
      setLocationsOpen(false);
      setToolsOpen(false);
    }
  };

  const handleLocationsKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setLocationsOpen(!locationsOpen);
      setServicesOpen(false);
      setToolsOpen(false);
    }
  };

  const handleToolsKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setToolsOpen(!toolsOpen);
      setServicesOpen(false);
      setLocationsOpen(false);
      setInventoryOpen(false);
    }
  };

  const handleInventoryKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setInventoryOpen(!inventoryOpen);
      setServicesOpen(false);
      setLocationsOpen(false);
      setToolsOpen(false);
    }
  };

  // Get top 6-8 services for dropdown, grouped by category
  const topServices = servicesData.slice(0, 8);
  const servicesByCategory: Record<string, typeof topServices> = {};
  
  topServices.forEach((service) => {
    const category = service.category || "other";
    if (!servicesByCategory[category]) {
      servicesByCategory[category] = [];
    }
    servicesByCategory[category].push(service);
  });

  const categoryLabels: Record<string, string> = {
    "Timelines": "Timelines",
    "Structures": "Structures",
    "Execution": "Execution",
    "Tax": "Tax",
    "Reporting": "Reporting",
    "Property Paths": "Property Paths",
    "Education": "Education",
    "other": "Other",
  };

  // Get locations with Oklahoma City first, then top 6-7 others
  const primaryLocation = locationsData.find((l) => l.slug === "oklahoma-city-ok");
  const otherLocations = locationsData.filter((l) => l.slug !== "oklahoma-city-ok").slice(0, 7);
  const topLocations = primaryLocation ? [primaryLocation, ...otherLocations] : otherLocations;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/1031-exchange-oklahoma-city-ok.png"
            alt={`${SITE_NAME} Logo`}
            width={2640}
            height={602}
            className="h-12 w-auto md:h-14"
            priority
          />
        </Link>
        
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button
              type="button"
              className="flex items-center gap-1 transition hover:text-slate-900"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onKeyDown={handleServicesKeyDown}
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div 
                className="absolute left-0 top-full mt-2 w-[600px] rounded-2xl border border-slate-200 bg-white shadow-xl"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <div className="grid grid-cols-2 gap-6 p-6">
                  {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
                    <div key={category}>
                      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                        {categoryLabels[category] || category}
                      </h3>
                      <ul className="space-y-2">
                        {categoryServices.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={service.route}
                              className="block text-sm text-slate-700 transition hover:text-[#1E3A8A]"
                              onClick={() => setServicesOpen(false)}
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-200 p-4">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A8A] transition hover:text-[#162d63]"
                    onClick={() => setServicesOpen(false)}
                  >
                    View All {servicesData.length} Services <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div
            ref={locationsRef}
            className="relative"
            onMouseEnter={handleLocationsMouseEnter}
            onMouseLeave={handleLocationsMouseLeave}
          >
            <button
              type="button"
              className="flex items-center gap-1 transition hover:text-slate-900"
              aria-expanded={locationsOpen}
              aria-haspopup="true"
              onKeyDown={handleLocationsKeyDown}
              onClick={() => setLocationsOpen(!locationsOpen)}
            >
              Locations
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${locationsOpen ? "rotate-180" : ""}`} />
            </button>
            {locationsOpen && (
              <div 
                className="absolute left-0 top-full mt-2 w-[400px] rounded-2xl border border-slate-200 bg-white shadow-xl"
                onMouseEnter={handleLocationsMouseEnter}
                onMouseLeave={handleLocationsMouseLeave}
              >
                <div className="p-6">
                  <ul className="grid grid-cols-2 gap-3">
                    {topLocations.map((location) => (
                      <li key={location.slug}>
                        <Link
                          href={location.route}
                          className="block text-sm text-slate-700 transition hover:text-[#1E3A8A]"
                          onClick={() => setLocationsOpen(false)}
                        >
                          {location.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-slate-200 p-4">
                  <Link
                    href="/service-areas"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A8A] transition hover:text-[#162d63]"
                    onClick={() => setLocationsOpen(false)}
                  >
                    View All {locationsData.length} Service Areas <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div
            ref={toolsRef}
            className="relative"
            onMouseEnter={handleToolsMouseEnter}
            onMouseLeave={handleToolsMouseLeave}
          >
            <button
              type="button"
              className="flex items-center gap-1 transition hover:text-slate-900"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              onKeyDown={handleToolsKeyDown}
              onClick={() => setToolsOpen(!toolsOpen)}
            >
              Tools
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            {toolsOpen && (
              <div className="absolute left-0 top-full mt-2 w-[300px] rounded-2xl border border-slate-200 bg-white shadow-xl">
                <div className="p-6">
                  <ul className="space-y-2">
                    {tools.map((tool) => (
                      <li key={tool.href}>
                        <Link
                          href={tool.href}
                          className="block text-sm text-slate-700 transition hover:text-[#1E3A8A]"
                          onClick={() => setToolsOpen(false)}
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-slate-200 p-4">
                  <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A8A] transition hover:text-[#162d63]"
                    onClick={() => setToolsOpen(false)}
                  >
                    View All Tools <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div
            ref={inventoryRef}
            className="relative"
            onMouseEnter={handleInventoryMouseEnter}
            onMouseLeave={handleInventoryMouseLeave}
          >
            <button
              type="button"
              className="flex items-center gap-1 transition hover:text-slate-900"
              aria-expanded={inventoryOpen}
              aria-haspopup="true"
              onKeyDown={handleInventoryKeyDown}
              onClick={() => setInventoryOpen(!inventoryOpen)}
            >
              Inventory
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${inventoryOpen ? "rotate-180" : ""}`} />
            </button>
            {inventoryOpen && (
              <div 
                className="absolute left-0 top-full mt-2 w-[600px] rounded-2xl border border-slate-200 bg-white shadow-xl"
                onMouseEnter={handleInventoryMouseEnter}
                onMouseLeave={handleInventoryMouseLeave}
              >
                <div className="grid grid-cols-3 gap-4 p-6">
                  {propertyTypesData.map((item) => {
                    const heroImageSrc = item.heroImage || `/inventory/${item.slug}-oklahoma-1031-exchange.jpg`;
                    const heroImageAlt = `${item.name} property type`;
                    return (
                      <Link
                        key={item.slug}
                        href={item.route}
                        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-[#1E3A8A]"
                        onClick={() => setInventoryOpen(false)}
                      >
                        {item.heroImage && (
                          <div className="relative h-24 w-full">
                            <Image
                              src={heroImageSrc}
                              alt={heroImageAlt}
                              fill
                              className="object-cover transition group-hover:scale-105"
                              sizes="(max-width: 768px) 33vw, 200px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          </div>
                        )}
                        <div className={`${item.heroImage ? 'absolute bottom-0 left-0 right-0 p-3' : 'p-3'}`}>
                          <h3 className={`text-xs font-semibold ${item.heroImage ? 'text-white' : 'text-slate-900 group-hover:text-[#1E3A8A]'}`}>
                            {item.name}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="border-t border-slate-200 p-4">
                  <Link
                    href="/inventory"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A8A] transition hover:text-[#162d63]"
                    onClick={() => setInventoryOpen(false)}
                  >
                    View All {propertyTypesData.length} Property Types <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link className="transition hover:text-slate-900" href="/blog">
            Blog
          </Link>
          <Link className="transition hover:text-slate-900" href="/about">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-[#1E3A8A] px-5 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63] md:inline-flex"
          >
            Contact
          </Link>
          <Link
            href={PHONE_HREF}
            className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-900 transition hover:border-slate-900 md:hidden"
          >
            Call {PHONE_NUMBER}
          </Link>
        </div>
      </div>
    </header>
  );
}

