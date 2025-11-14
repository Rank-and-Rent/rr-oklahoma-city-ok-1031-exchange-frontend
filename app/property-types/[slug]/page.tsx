import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { propertyTypesData } from "@/data/property-types";
import { inventorySpotlight01 } from "@/data/batches/inventory/batch-01";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import Breadcrumbs from "@/components/breadcrumbs";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

function getPropertyTypeBySlug(slug: string) {
  return propertyTypesData.find((pt) => pt.slug === slug);
}

function getPropertyTypeContent(slug: string) {
  return inventorySpotlight01.find((item) => item.type === slug);
}

function getRelatedPropertyTypes(currentSlug: string, limit: number = 4) {
  return propertyTypesData.filter((pt) => pt.slug !== currentSlug).slice(0, limit);
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return propertyTypesData.map((propertyType) => ({
    slug: propertyType.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const propertyType = getPropertyTypeBySlug(slug);

  if (!propertyType) {
    return {
      title: "Property Type Not Found",
    };
  }

  const content = getPropertyTypeContent(slug);
  const description = content?.copy || `${propertyType.name} properties available for 1031 exchange replacement in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`;

  return {
    title: `${propertyType.name} | 1031 Exchange Replacement Properties | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: `${SITE_URL}/property-types/${slug}`,
    },
  };
}

export default async function PropertyTypePage({ params }: Props) {
  const { slug } = await params;
  const propertyType = getPropertyTypeBySlug(slug);
  const content = getPropertyTypeContent(slug);

  if (!propertyType) {
    notFound();
  }

  const relatedPropertyTypes = getRelatedPropertyTypes(slug, 4);
  const heroImageSrc = propertyType.heroImage || `/inventory/${propertyType.slug}-oklahoma-1031-exchange.jpg`;
  const heroImageAlt = `${propertyType.name} property type`;

  const faqs = [
    {
      question: `What are ${propertyType.name.toLowerCase()} properties?`,
      answer: content?.copy || `${propertyType.name} properties are available for 1031 exchange replacement. These properties offer stable cash flow and long-term lease commitments suitable for tax-deferred exchanges.`,
    },
    {
      question: `Are ${propertyType.name.toLowerCase()} properties suitable for 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}?`,
      answer: `Yes, ${propertyType.name.toLowerCase()} properties qualify as like-kind replacement properties for 1031 exchanges in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. These properties are held for investment purposes and meet IRS requirements for like-kind exchange treatment.`,
    },
    {
      question: `What should I consider when identifying ${propertyType.name.toLowerCase()} replacement properties?`,
      answer: `When identifying ${propertyType.name.toLowerCase()} replacement properties for your 1031 exchange, consider location, tenant credit quality, lease terms, property condition, and market fundamentals. We help investors evaluate these factors within the 45 day identification deadline.`,
    },
    {
      question: `How do I get started with ${propertyType.name.toLowerCase()} replacement properties?`,
      answer: `Contact us to discuss ${propertyType.name.toLowerCase()} replacement property identification for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We can help identify suitable properties and coordinate with qualified intermediaries to meet your 45 and 180 day deadlines.`,
    },
  ];

  return (
    <div className="bg-white">
      {propertyType.heroImage && (
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
              {propertyType.name}
            </h1>
            <p className="mt-2 text-lg text-white/90 md:text-xl">
              1031 Exchange Replacement Properties
            </p>
          </div>
        </div>
      )}
      
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        {!propertyType.heroImage && (
          <>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Inventory", href: "/inventory" },
                { label: propertyType.name, href: propertyType.route },
              ]}
            />
            <div className="mt-8">
              <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">{propertyType.name}</h1>
            </div>
          </>
        )}

        {propertyType.heroImage && (
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Inventory", href: "/inventory" },
              { label: propertyType.name, href: propertyType.route },
            ]}
            className="mt-8"
          />
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700">
                {content?.copy || `${propertyType.name} properties are available nationwide for 1031 exchange replacement. These properties offer stable cash flow with established tenants and long-term lease commitments suitable for tax-deferred exchanges.`}
              </p>
              
              <h2 className="mt-8 text-2xl font-semibold text-slate-900">Property Overview</h2>
              <p className="text-base text-slate-700">
                {propertyType.name} properties provide investors with opportunities to complete 1031 exchanges while maintaining consistent rental income. These properties typically feature credit tenants, long-term lease agreements, and stable operational performance that supports tax-deferred exchange strategies.
              </p>

              <h2 className="mt-8 text-2xl font-semibold text-slate-900">1031 Exchange Benefits</h2>
              <ul className="list-disc pl-6 text-base text-slate-700">
                <li>Like-kind replacement property qualification for tax deferral</li>
                <li>Stable cash flow from established tenant operations</li>
                <li>Long-term lease commitments supporting exchange compliance</li>
                <li>Nationwide availability for flexible replacement property identification</li>
                <li>Credit tenant profiles reducing operational risk</li>
              </ul>

              <h2 className="mt-8 text-2xl font-semibold text-slate-900">Identification Process</h2>
              <p className="text-base text-slate-700">
                When identifying {propertyType.name.toLowerCase()} replacement properties for your 1031 exchange, we help investors evaluate property locations, tenant credit profiles, lease terms, and market fundamentals. Our property identification support helps you meet the 45 day identification deadline with qualified replacement properties.
              </p>
            </div>

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
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Related Property Types</h3>
              <ul className="mt-4 space-y-3">
                {relatedPropertyTypes.map((related) => (
                  <li key={related.slug}>
                    <Link
                      href={related.route}
                      className="block text-sm font-medium text-slate-700 transition hover:text-[#1E3A8A]"
                    >
                      {related.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/inventory"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A8A] transition hover:text-[#162d63]"
              >
                View All Property Types <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Ready to Get Started?</h2>
          <p className="mt-2 text-slate-600">
            Contact us to discuss {propertyType.name.toLowerCase()} replacement property identification for your 1031 exchange in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/contact?propertyType=${encodeURIComponent(propertyType.name)}`}
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
      </div>
    </div>
  );
}

