import Link from "next/link";
import { SITE_NAME, PHONE_NUMBER, PHONE_HREF, EMAIL, OFFICE_HOURS, OFFICE_ADDRESS, MAP_CENTER } from "@/lib/config";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{SITE_NAME}</p>
            <p className="mt-3 text-2xl text-slate-900">Modern trust for Oklahoma investors</p>
            <p className="mt-4 text-sm text-slate-600">
              From first analysis to final Form 8824 package, every step is documented for Oklahoma intermediaries, CPAs,
              and attorneys.
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-slate-900">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {servicesData.slice(0, 8).map((service) => (
                <li key={service.slug}>
                  <Link href={service.route} className="hover:text-[#1E3A8A]">
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-semibold text-[#1E3A8A] hover:text-[#162d63]">
                  View All {servicesData.length} Services →
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-slate-900">Service Areas</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {locationsData.slice(0, 8).map((location) => (
                <li key={location.slug}>
                  <Link href={location.route} className="hover:text-[#1E3A8A]">
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/service-areas" className="font-semibold text-[#1E3A8A] hover:text-[#162d63]">
                  View All {locationsData.length} Service Areas →
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-slate-900">Contact & Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link href={PHONE_HREF} className="hover:text-[#1E3A8A]">
                  {PHONE_NUMBER}
                </Link>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-[#1E3A8A]">
                  {EMAIL}
                </a>
              </li>
              <li>{OFFICE_HOURS}</li>
              <li>
                <Link href="/contact" className="hover:text-[#1E3A8A]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#1E3A8A]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="hover:text-[#1E3A8A]">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#1E3A8A]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#1E3A8A]">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-[#1E3A8A]">
                  Sitemap
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-slate-500">
                Educational information only. Consult your CPA or attorney before executing a 1031 exchange.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-200 pt-8">
          <p className="text-center text-xs text-slate-500">
            This site helps investors identify potential replacement properties for Section 1031 exchanges. This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult a Qualified Intermediary and tax advisor before acting.
          </p>
          <p className="mt-4 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

