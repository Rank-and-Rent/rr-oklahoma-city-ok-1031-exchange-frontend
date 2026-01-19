import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_URL, OFFICE_ADDRESS, PHONE_NUMBER, PHONE_HREF, EMAIL } from "@/lib/config";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get started with your 1031 exchange. Contact us to discuss replacement property identification and exchange coordination.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

type Props = {
  searchParams: Promise<{ projectType?: string; city?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialProjectType = params.projectType || "";
  const initialCity = params.city || "";

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src="/locations/oklahoma-city-ok-1031-exchange.jpg"
          alt="Contact us for 1031 Exchange"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <h1 className="font-heading text-5xl uppercase tracking-wide md:text-6xl lg:text-7xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Get started on your 1031 exchange journey today.
          </p>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="section-dark py-8">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center md:gap-16">
            <a href={PHONE_HREF} className="group flex items-center gap-3 text-white transition hover:text-gray-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-heading text-lg uppercase tracking-wide">{PHONE_NUMBER}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="group flex items-center gap-3 text-white transition hover:text-gray-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-heading text-lg uppercase tracking-wide">{EMAIL}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Form Column */}
            <div>
              <h2 className="font-heading text-3xl uppercase md:text-4xl">
                Send Us a Message
              </h2>
              <p className="mt-4 text-gray-600">
                Fill out the form below and a 1031 exchange specialist will reach out shortly.
              </p>
              <div className="mt-8">
                <ContactForm initialProjectType={initialProjectType} initialCity={initialCity} />
              </div>
            </div>

            {/* Info Column */}
            <div>
              <h2 className="font-heading text-3xl uppercase md:text-4xl">
                Our Office
              </h2>
              <p className="mt-4 text-gray-600">
                Visit us or connect with our team to discuss your 1031 exchange needs.
              </p>

              {/* Address Card */}
              <div className="mt-8 rounded-lg border border-gray-200 p-6">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-1 bg-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg uppercase">Address</h3>
                    <p className="mt-2 text-gray-600">{OFFICE_ADDRESS}</p>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className="mt-4 rounded-lg border border-gray-200 p-6">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-1 bg-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-lg uppercase">Hours</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: By Appointment</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS)}&output=embed&zoom=15`}
                  allowFullScreen
                  title={`Map showing ${OFFICE_ADDRESS}`}
                />
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-heading text-lg uppercase">Follow Us</h3>
                <div className="mt-4 flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
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
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
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
            started on your 1031 exchange journey.
          </p>
          <Link href="/services" className="btn-primary mt-8 bg-white text-gray-900 hover:bg-gray-100">
            View Services
          </Link>
        </div>
      </section>
    </div>
  );
}
