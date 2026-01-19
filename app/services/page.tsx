import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "1031 Exchange Services | Oklahoma Qualified Intermediary Services",
  description: "Comprehensive 1031 exchange services for Oklahoma investors. Property identification, deadline support, and qualified intermediary coordination.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

// Group services by category
const servicesByCategory = servicesData.reduce((acc, service) => {
  const category = service.category || "Other";
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(service);
  return acc;
}, {} as Record<string, typeof servicesData>);

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src="/locations/tulsa-ok-1031-exchange.jpg"
          alt="Oklahoma skyline"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="font-heading text-5xl uppercase tracking-wide md:text-6xl lg:text-7xl">
            Our Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Comprehensive 1031 exchange support for Oklahoma investors. From property identification to closing coordination.
          </p>
          
          {/* Social Icons */}
          <div className="mt-8 flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 transition hover:bg-gray-100"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 transition hover:bg-gray-100"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 transition hover:bg-gray-100"
              aria-label="YouTube"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid - Dark Section */}
      <section className="section-dark py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          {Object.entries(servicesByCategory).map(([category, services]) => (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="font-heading text-2xl uppercase tracking-wide text-white/80 mb-8">
                {category}
              </h2>
              <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={service.route}
                    className="group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-800">
                      <Image
                        src="/locations/oklahoma-city-ok-1031-exchange.jpg"
                        alt={service.name}
                        fill
                        className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-4 right-4 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-900">
                        Service
                      </span>
                    </div>
                    <div className="mt-6 text-center">
                      <h3 className="font-heading text-xl uppercase tracking-wide">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-400">
                        {service.short}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work With Us CTA */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0">
          <Image
            src="/locations/edmond-ok-1031-exchange.jpg"
            alt="Oklahoma property"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="absolute left-1/2 top-12 h-16 w-px -translate-x-1/2 bg-white/30" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white md:px-8">
          <h2 className="font-heading text-4xl uppercase md:text-5xl lg:text-6xl">
            Work With Us
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            Our team approaches Oklahoma&apos;s real estate landscape with an auspicious blend of 
            experience, deep community ties and forward thinking. Contact us today to get 
            started on your 1031 exchange journey with Oklahoma&apos;s leading experts.
          </p>
          <Link href="/contact" className="btn-primary mt-8 bg-white text-gray-900 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
