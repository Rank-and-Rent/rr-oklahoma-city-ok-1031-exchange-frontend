import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { locationsData } from "@/data/locations";
import { servicesData } from "@/data/services";
import { locationsBatch01 } from "@/data/batches/locations/batch-01";
import { locationsBatch02 } from "@/data/batches/locations/batch-02";
import { locationsBatch03 } from "@/data/batches/locations/batch-03";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import Breadcrumbs from "@/components/breadcrumbs";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

function getLocationBySlug(slug: string) {
  return locationsData.find((l) => l.slug === slug);
}

function getLocationContent(slug: string) {
  return locationsBatch01[slug as keyof typeof locationsBatch01] ||
         locationsBatch02[slug as keyof typeof locationsBatch02] ||
         locationsBatch03[slug as keyof typeof locationsBatch03];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: `1031 Exchange in ${location.name} | ${SITE_NAME}`,
    description: `Find 1031 exchange support and replacement properties in ${location.name}, ${PRIMARY_STATE_ABBR}.`,
    alternates: {
      canonical: `${SITE_URL}/service-areas/${slug}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  const locationContent = getLocationContent(slug);

  if (!location) {
    notFound();
  }

  // Get relevant services for this location
  const locationServices = servicesData.slice(0, 6);

  // Use FAQs from batch content if available, otherwise generate defaults
  const faqs = locationContent?.faqs || [
    {
      question: `What 1031 exchange services are available in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `We help investors in ${location.name}, ${PRIMARY_STATE_ABBR} identify replacement properties for their 1031 exchanges. Our services include property identification, deadline support, and coordination with qualified intermediaries. This site helps investors identify potential replacement properties.`,
    },
    {
      question: `What types of replacement properties are available in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `Investors in ${location.name}, ${PRIMARY_STATE_ABBR} can find replacement properties across multifamily, industrial, retail, office, and other asset types. We help identify like-kind properties that qualify for 1031 exchange treatment.`,
    },
    {
      question: `How do I meet the 45 and 180 day deadlines in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `The 45 day identification deadline and 180 day closing deadline apply to all 1031 exchanges in ${location.name}, ${PRIMARY_STATE_ABBR}. We help investors meet these deadlines with property lists, documentation support, and timeline tracking.`,
    },
    {
      question: `Do you coordinate with qualified intermediaries in ${location.name}, ${PRIMARY_STATE_ABBR}?`,
      answer: `We help coordinate with qualified intermediaries for investors in ${location.name}, ${PRIMARY_STATE_ABBR}. This site helps identify replacement properties and can connect you with qualified intermediaries, but we are not a Qualified Intermediary ourselves.`,
    },
  ];

  const heroImageSrc = location.heroImage || `/locations/${location.slug}-1031-exchange.jpg`;
  const heroImageAlt = `${location.name}, ${PRIMARY_STATE_ABBR} skyline for 1031 exchange`;

  return (
    <div className="bg-white">
      {location.heroImage && (
        <div className="relative h-64 w-full overflow-hidden md:h-96">
          <Image
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h1 className="text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
              1031 Exchange in {location.name}
            </h1>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/service-areas" },
            { label: location.name, href: `/service-areas/${location.slug}` },
          ]}
        />

        {!location.heroImage && (
          <div className="mt-8">
            <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
              1031 Exchange in {location.name}
            </h1>
          </div>
        )}
        {locationContent?.mainDescription && (
          <div className={`${location.heroImage ? 'mt-8' : 'mt-4'} prose prose-slate max-w-none`} dangerouslySetInnerHTML={{ __html: locationContent.mainDescription }} />
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-base text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">Services Available</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locationServices.map((service) => (
              <Link
                key={service.slug}
                href={service.route}
                className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-[#1E3A8A]"
              >
                <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{service.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A8A]">
                  Learn more <ArrowUpRightIcon className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Ready to Get Started?</h2>
          <p className="mt-2 text-slate-600">
            Contact us to discuss 1031 exchange support in {location.name}, {PRIMARY_STATE_ABBR}.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/contact?city=${encodeURIComponent(location.name)}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63]"
            >
              Get Started <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 transition hover:border-slate-900"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {PHONE_NUMBER}
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-[#1E3A8A]"
          >
            View All {locationsData.length} Service Areas <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

