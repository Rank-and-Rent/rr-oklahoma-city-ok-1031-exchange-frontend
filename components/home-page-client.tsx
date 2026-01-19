"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/data/services";
import { locationsData } from "@/data/locations";
import { propertyTypesData } from "@/data/property-types";
import { PHONE_NUMBER, PHONE_HREF, EMAIL, SITE_NAME } from "@/lib/config";

// Rolling number component with smooth animation
function RollingNumber({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.floor(target * easeOut));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

// Improved Carousel component that cycles through all items infinitely
function Carousel({
  children,
  itemsPerView = 3,
  viewAllHref,
  viewAllText = "View All",
}: {
  children: React.ReactNode[];
  itemsPerView?: number;
  viewAllHref: string;
  viewAllText?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = children.length;

  // Calculate proper width percentage based on items per view
  const itemWidth = 100 / itemsPerView;

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Create infinite scroll effect by tripling the items
  const extendedChildren = useMemo(() => {
    return [...children, ...children, ...children];
  }, [children]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          style={{ gap: "1.5rem" }}
          animate={{ 
            x: `calc(-${(currentIndex + totalItems) * itemWidth}% - ${(currentIndex + totalItems) * 1.5}rem)` 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {extendedChildren.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: `calc(${itemWidth}% - 1rem)` }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Controls */}
      <div className="mt-8 flex items-center justify-between">
        <Link href={viewAllHref} className="btn-primary">
          {viewAllText}
        </Link>
        
        {/* Progress line */}
        <div className="hidden flex-1 mx-8 md:block">
          <div className="h-px bg-gray-700 relative">
            <motion.div 
              className="absolute top-0 left-0 h-px bg-white"
              style={{ width: `${((currentIndex % totalItems) + 1) / totalItems * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        
        <div className="carousel-nav">
          <button onClick={prev} aria-label="Previous">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={next} aria-label="Next">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Benefits data for rotating display
const benefits = [
  {
    title: "Defer 100% of Capital Gains Tax",
    description:
      "A properly structured 1031 exchange allows you to defer all federal capital gains taxes, keeping more of your investment working for you.",
  },
  {
    title: "Compound Your Wealth Faster",
    description:
      "By deferring taxes, you can reinvest the full sale proceeds into a higher-value property, accelerating your wealth building over time.",
  },
  {
    title: "Upgrade to Better Properties",
    description:
      "Exchange into higher quality assets, better locations, or properties with stronger cash flow potential without the tax penalty.",
  },
  {
    title: "Diversify Your Portfolio",
    description:
      "Use 1031 exchanges to spread your investments across different markets, property types, and risk profiles tax-efficiently.",
  },
  {
    title: "Eliminate Depreciation Recapture",
    description:
      "Defer the 25% depreciation recapture tax that would otherwise be due when you sell an investment property.",
  },
  {
    title: "Pass Wealth to Heirs Tax-Free",
    description:
      "With a stepped-up basis at death, your heirs may never pay the deferred capital gains taxes, creating generational wealth.",
  },
];

// Stats data
const stats = [
  { value: 4, prefix: "$", suffix: "B+", label: "Total Exchanges Facilitated" },
  { value: 413, prefix: "$", suffix: "M+", label: "2025 Exchange Volume" },
  { value: 45, suffix: "+", label: "Years Combined Experience" },
  { value: 1, prefix: "#", suffix: "", label: "Oklahoma QI Partner" },
];

// Resources/Press items
const resources = [
  {
    title: "IRS Publication 544: Sales and Other Dispositions of Assets",
    description: "Official IRS guidance on like-kind exchanges under Section 1031.",
    source: "Internal Revenue Service",
    date: "2024",
    href: "https://www.irs.gov/publications/p544",
  },
  {
    title: "Understanding the 45-Day Identification Period",
    description: "Critical timeline requirements every exchanger must know to protect their deferral.",
    source: "1031 Exchange Guide",
    date: "January 2024",
    href: "/blog",
  },
  {
    title: "Oklahoma Real Estate Market Outlook",
    description: "Current trends and opportunities for replacement property investors in the Oklahoma market.",
    source: "Market Analysis",
    date: "2024",
    href: "/blog",
  },
];

export default function HomePageClient() {
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);

  // Rotate benefits every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextBenefit = useCallback(() => {
    setCurrentBenefit((prev) => (prev + 1) % benefits.length);
  }, []);

  const prevBenefit = useCallback(() => {
    setCurrentBenefit((prev) => (prev - 1 + benefits.length) % benefits.length);
  }, []);

  // Schema.org structured data
  const organizationLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: "https://www.1031exchangeoklahomacity.com/",
      telephone: "+18327431964",
      address: {
        "@type": "PostalAddress",
        streetAddress: "701 N Broadway Ave",
        addressLocality: "Oklahoma City",
        addressRegion: "OK",
        postalCode: "73102",
        addressCountry: "US",
      },
      description:
        "Oklahoma intermediary coordination, CPA and attorney support, and statewide 1031 exchange guidance.",
    }),
    []
  );

  return (
    <div className="font-body">
      <Script id="jsonld-org" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(organizationLd)}
      </Script>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/oklahoma-city-hero.jpg"
        >
          <source src="/lame bum fuck ofc .mp4" type="video/mp4" />
        </video>
        
        <div className="hero-overlay absolute inset-0" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <motion.div
            initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-heading text-5xl leading-none tracking-wide md:text-7xl lg:text-8xl">
              #1 OKLAHOMA CITY
              <br />
              1031 EXCHANGE EXPERTS
              </h1>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.3em] text-white/90">
              Defer Taxes. Build Wealth. Invest Smarter.
              </p>
            </motion.div>
        </div>

            <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-white/60">Scroll</span>
            <motion.div
              className="h-12 w-px bg-white/40"
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
                </div>
        </motion.div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src="/oklahoma-city-hero.jpg"
                alt="Oklahoma City skyline - 1031 Exchange experts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl uppercase leading-tight md:text-5xl">
                Meet The Oklahoma City
                <br />
                1031 Exchange Team
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600">
                Our team was founded with a singular mission: to help Oklahoma property owners navigate 
                the complexities of 1031 exchanges with confidence. As Oklahoma real estate specialists, 
                we approach the state&apos;s investment landscape with deep local knowledge, established 
                qualified intermediary relationships, and forward-thinking strategies.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                We possess extensive knowledge regarding Oklahoma City, Tulsa, Norman, Edmond, and 
                all Oklahoma markets. Together, our network has facilitated over $4 billion in 
                exchange transactions with a 100% compliance record.
              </p>
              <Link href="/about" className="btn-primary mt-8">
                Meet The Team
              </Link>
            </motion.div>
          </div>
          </div>
        </section>

      {/* Stats Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-center text-4xl uppercase md:text-5xl">Our Stats</h2>
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="font-heading text-4xl md:text-5xl">
                  <RollingNumber
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2000 + index * 200}
                  />
              </div>
                <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
              </motion.div>
              ))}
            </div>
          </div>
      </section>

      {/* Featured Services Section (Dark) */}
      <section className="section-dark py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-center text-4xl uppercase md:text-5xl">
            Featured Services
              </h2>
          <div className="mt-12">
            <Carousel itemsPerView={3} viewAllHref="/services" viewAllText="View All">
              {servicesData.map((service) => (
                <Link
                  key={service.slug}
                  href={service.route}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-800">
                    <Image
                      src="/locations/oklahoma-city-ok-1031-exchange.jpg"
                      alt={service.name}
                      fill
                      className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-4 right-4 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-900">
                      Service
                    </span>
                      </div>
                  <div className="mt-4">
                    <h3 className="font-heading text-xl uppercase">{service.name}</h3>
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">{service.short}</p>
                    </div>
                </Link>
              ))}
            </Carousel>
            </div>
            </div>
      </section>

      {/* Benefits Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/locations/tulsa-ok-1031-exchange.jpg"
            alt="Oklahoma landscape"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
          </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
              <h2 className="font-heading text-4xl uppercase text-white md:text-5xl">
                See Why 1031
                <br />
                Exchanges Work
                </h2>
              <Link href="/services" className="btn-outline mt-8 border-white text-white hover:bg-white hover:text-gray-900">
                View All
              </Link>
              </div>

            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBenefit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-white"
                >
                  <div className="mb-4 text-5xl font-light text-white/40">&quot;</div>
                  <p className="text-xl leading-relaxed md:text-2xl">
                    {benefits[currentBenefit].description}
                  </p>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-wider">
                    {benefits[currentBenefit].title}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex justify-end">
                <div className="carousel-nav">
                  <button onClick={prevBenefit} aria-label="Previous benefit">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button onClick={nextBenefit} aria-label="Next benefit">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section (Dark) */}
      <section className="section-dark py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-center text-4xl uppercase md:text-5xl">
            Neighborhoods
                </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
            Browse our neighborhood guides below to learn more about each area.
                </p>
          <div className="mt-12">
            <Carousel itemsPerView={3} viewAllHref="/service-areas" viewAllText="View All">
              {locationsData.map((location) => (
              <Link
                  key={location.slug}
                  href={location.route}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-800">
                    <Image
                      src={location.heroImage || `/locations/${location.slug}-1031-exchange.jpg`}
                      alt={location.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-heading text-xl uppercase">{location.name}</h3>
                    <p className="mt-2 text-sm text-gray-400">
                      1031 exchange services for {location.name} area investors.
                    </p>
                  </div>
              </Link>
              ))}
            </Carousel>
            </div>
          </div>
      </section>

      {/* Property Types Section (Light) */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-center text-4xl uppercase md:text-5xl">
            Property Types
                </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Explore available property types for 1031 exchange replacement.
          </p>
          <div className="mt-12">
            <div className="relative">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {propertyTypesData.slice(0, 6).map((propertyType) => (
              <Link
                    key={propertyType.slug}
                    href={propertyType.route}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      {propertyType.heroImage ? (
                        <Image
                          src={propertyType.heroImage}
                          alt={propertyType.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gray-200">
                          <span className="font-heading text-xl text-gray-400">{propertyType.name}</span>
            </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-4 right-4 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-900">
                        Property Type
                      </span>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-heading text-xl uppercase text-gray-900">{propertyType.name}</h3>
                      <p className="mt-2 text-sm text-gray-600">
                        Available nationwide for 1031 exchange.
                      </p>
                    </div>
                </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/inventory" className="btn-outline">
                  View All Property Types
                </Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-center text-4xl uppercase md:text-5xl">
            Industry Resources
                </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Stay informed with the latest guidance and market insights for 1031 exchanges.
          </p>

          <div className="mt-12 divide-y divide-gray-200 border-y border-gray-200 bg-white">
            {resources.map((resource, index) => (
              <motion.a
                key={resource.title}
                href={resource.href}
                target={resource.href.startsWith("http") ? "_blank" : undefined}
                rel={resource.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-6 p-6 transition-colors hover:bg-gray-50"
              >
                <div className="hidden h-20 w-28 flex-shrink-0 overflow-hidden bg-gray-100 md:block">
                  <Image
                    src="/oklahoma-city-hero.jpg"
                    alt={resource.title}
                    width={112}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl uppercase transition-colors group-hover:text-gray-600">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{resource.description}</p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-gray-400">
                    {resource.source} | {resource.date}
                  </p>
            </div>
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            ))}
                      </div>

          <div className="mt-8 text-center">
            <Link href="/blog" className="btn-outline">
              View All Resources
            </Link>
                  </div>
            </div>
      </section>

      {/* Work With Us CTA Section */}
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* Let's Connect Floating Button */}
      <button
        onClick={() => setContactOpen(!contactOpen)}
        className="connect-btn"
        aria-label="Open contact options"
      >
        Let&apos;s Connect
        <svg
          className={`h-4 w-4 transition-transform ${contactOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Contact Popup */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-8 z-50 w-72 rounded-lg bg-white p-6 shadow-2xl"
          >
            <h3 className="font-heading text-xl uppercase">Get In Touch</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-3 text-gray-600 transition-colors hover:text-gray-900"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {PHONE_NUMBER}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-gray-600 transition-colors hover:text-gray-900"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {EMAIL}
              </a>
            <Link
                href="/contact"
                className="btn-primary mt-4 w-full"
                onClick={() => setContactOpen(false)}
            >
                Contact Form
            </Link>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
