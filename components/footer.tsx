"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_NAME, PHONE_NUMBER, PHONE_HREF, EMAIL, OFFICE_ADDRESS } from "@/lib/config";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter submission logic would go here
    alert("Thank you for subscribing!");
    setEmail("");
    setAgreed(false);
  };

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        {/* Main footer content */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left column - Brand info */}
          <div>
            <div className="font-heading text-lg tracking-wider">
              <span>1031 EXCHANGE OKC</span>
              <span className="mt-0.5 block text-[10px] font-normal tracking-[0.2em] text-gray-500">
                Oklahoma City Qualified Intermediary
              </span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-gray-600">
              Our team approaches Oklahoma&apos;s real estate landscape with an auspicious blend of 
              experience, deep community ties and forward thinking.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <h3 className="font-heading text-sm uppercase tracking-wider">
                Subscribe to Our Newsletter
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="mt-4">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="newsletter-input flex-1"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gray-900 px-6 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gray-800"
                  >
                    Subscribe
                  </button>
                </div>
                <label className="mt-3 flex items-start gap-2 text-xs text-gray-500">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5"
                    required
                  />
                  <span>
                    I agree to be contacted by 1031 Exchange OKC via call, email, and text for real estate 
                    services. To opt out, you can reply &apos;stop&apos; at any time or reply &apos;help&apos; for assistance. 
                    You can also click the unsubscribe link in the emails.{" "}
                    <Link href="/privacy" className="underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </form>
            </div>
          </div>
          
          {/* Middle column - Address & Contact */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-heading text-sm uppercase tracking-wider">Address</h3>
              <p className="mt-4 text-sm text-gray-600">
                701 N Broadway Ave
                <br />
                Oklahoma City, OK 73102
              </p>
            </div>
          <div>
              <h3 className="font-heading text-sm uppercase tracking-wider">Contact</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>
                  <Link href={PHONE_HREF} className="hover:text-gray-900">
                    {PHONE_NUMBER}
                  </Link>
                </p>
                <p>
                  <a href={`mailto:${EMAIL}`} className="hover:text-gray-900">
                    {EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          {/* Right column - Links */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-wider">
              Oklahoma 1031 Exchange Services
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1">
              <div>
                <h4 className="mb-2 text-xs font-semibold text-gray-900">Services</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {servicesData.slice(0, 4).map((service) => (
                    <li key={service.slug}>
                      <Link href={service.route} className="hover:text-gray-900">
                        {service.name.split(" ").slice(0, 3).join(" ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-semibold text-gray-900">Service Areas</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {locationsData.slice(0, 4).map((location) => (
                <li key={location.slug}>
                      <Link href={location.route} className="hover:text-gray-900">
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
              </div>
          </div>
          
            {/* Social Links */}
            <div className="mt-8">
              <h3 className="font-heading text-sm uppercase tracking-wider">Connect With Us</h3>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
                  aria-label="YouTube"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            Website Designed and Developed by{" "}
            <a href="https://luxurypresence.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">
              Luxury Presence
            </a>
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Copyright &copy; {new Date().getFullYear()}</span>
            <span>|</span>
            <Link href="/privacy" className="hover:text-gray-900">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="mt-8 text-xs leading-relaxed text-gray-400">
          &copy; {new Date().getFullYear()}. {SITE_NAME}. All material presented herein is intended for 
          information purposes only. While, this information is believed to be correct, it is represented 
          subject to errors, omissions, changes or withdrawal without notice. All property information, 
          including, but not limited to square footage, room count, number of bedrooms and the school 
          district in property listings are deemed reliable, but should be verified by your own attorney, 
          architect or zoning expert. The number of bedrooms listed above is not a legal conclusion. 
          Each person should consult with his/her own attorney, architect or zoning expert to make a 
          determination as to the number of room in the unit that may be legally used as a bedroom. 
          Equal Housing Opportunity.
        </p>
      </div>
    </footer>
  );
}
