"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/config";
import { XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function StickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Show CTA after scrolling down, hide on contact page
  useEffect(() => {
    if (pathname === "/contact") {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (!isVisible || isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6">
        <button
          type="button"
          onClick={() => {
            setIsCollapsed(false);
            setIsVisible(true);
          }}
          className="rounded-full bg-[#1E3A8A] p-4 text-white shadow-lg transition hover:bg-[#162d63]"
          aria-label="Show contact options"
        >
          <PhoneIcon className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <p className="text-sm font-semibold text-slate-900">Need help?</p>
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            className="text-slate-400 transition hover:text-slate-900"
            aria-label="Collapse"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 space-y-3">
          <Link
            href="/contact"
            className="block w-full rounded-lg bg-[#1E3A8A] px-4 py-2 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#162d63] md:hidden"
          >
            Contact Us
          </Link>
          <Link
            href="/contact"
            className="hidden w-full rounded-lg bg-[#1E3A8A] px-4 py-2 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#162d63] md:block"
          >
            Get Started
          </Link>
          <Link
            href={PHONE_HREF}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900"
          >
            <PhoneIcon className="h-4 w-4" />
            {PHONE_NUMBER}
          </Link>
        </div>
      </div>
    </div>
  );
}

