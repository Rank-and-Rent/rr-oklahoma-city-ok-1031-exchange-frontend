"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";
import { SITE_NAME } from "@/lib/config";

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === "/";

  // Handle scroll for transparent header on home page
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Determine header style based on scroll and page
  const headerBg = isHomePage && !scrolled
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur border-b border-gray-100";
  
  const textColor = isHomePage && !scrolled
    ? "text-white"
    : "text-gray-900";

  const logoColor = isHomePage && !scrolled
    ? "text-white"
    : "text-gray-900";

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className={`font-heading text-lg tracking-wider ${logoColor} md:text-xl`}>
            <span className="font-heading">1031 EXCHANGE OKC</span>
            <span className={`mt-0.5 block text-[10px] font-normal tracking-[0.2em] ${isHomePage && !scrolled ? "text-white/70" : "text-gray-500"}`}>
              Oklahoma City Qualified Intermediary
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className={`hidden items-center gap-8 text-sm font-medium ${textColor} lg:flex`}>
          <Link 
            className="transition-opacity hover:opacity-70" 
            href="/services"
          >
            Services
          </Link>
          <Link 
            className="transition-opacity hover:opacity-70" 
            href="/service-areas"
          >
            Neighborhoods
          </Link>
          <Link 
            className="transition-opacity hover:opacity-70" 
            href="/tools"
          >
            Tools
          </Link>
          <Link 
            className="transition-opacity hover:opacity-70" 
            href="/property-types"
          >
            Property Types
          </Link>
          <Link 
            className="transition-opacity hover:opacity-70" 
            href="/blog"
          >
            Blog
          </Link>
          <Link 
            className="transition-opacity hover:opacity-70" 
            href="/contact"
          >
            Contact Us
          </Link>
        </nav>

        {/* Menu dots / hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop menu dots (decorative) */}
          <button
            type="button"
            className={`hidden p-2 lg:block ${textColor}`}
            aria-label="More options"
          >
            <div className="grid grid-cols-2 gap-1">
              <span className={`h-1 w-1 rounded-full ${isHomePage && !scrolled ? "bg-white" : "bg-gray-900"}`} />
              <span className={`h-1 w-1 rounded-full ${isHomePage && !scrolled ? "bg-white" : "bg-gray-900"}`} />
              <span className={`h-1 w-1 rounded-full ${isHomePage && !scrolled ? "bg-white" : "bg-gray-900"}`} />
              <span className={`h-1 w-1 rounded-full ${isHomePage && !scrolled ? "bg-white" : "bg-gray-900"}`} />
            </div>
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`p-2 lg:hidden ${textColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-6 py-6">
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Services
                </h3>
                <ul className="space-y-2">
                  {servicesData.slice(0, 6).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={service.route}
                        className="block text-sm text-gray-700 transition-colors hover:text-gray-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/services"
                      className="block text-sm font-semibold text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All Services
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Neighborhoods
                </h3>
                <ul className="space-y-2">
                  {locationsData.slice(0, 6).map((location) => (
                    <li key={location.slug}>
                      <Link
                        href={location.route}
                        className="block text-sm text-gray-700 transition-colors hover:text-gray-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {location.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/service-areas"
                      className="block text-sm font-semibold text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All Neighborhoods
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Tools
                </h3>
                <ul className="space-y-2">
                  {tools.map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        className="block text-sm text-gray-700 transition-colors hover:text-gray-900"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/property-types"
                      className="block text-sm font-medium text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Property Types
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="block text-sm font-medium text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="block text-sm font-medium text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="btn-primary mt-6 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
