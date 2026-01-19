import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { propertyTypesData } from "@/data/property-types";
import { inventorySpotlight01 } from "@/data/batches/inventory/batch-01";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";

function getPropertyTypeBySlug(slug: string) {
  return propertyTypesData.find((pt) => pt.slug === slug);
}

function getPropertyTypeContent(slug: string) {
  return inventorySpotlight01.find((item) => item.type === slug);
}

function getRelatedPropertyTypes(currentSlug: string, limit: number = 6) {
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

  const relatedPropertyTypes = getRelatedPropertyTypes(slug, 6);
  const heroImageSrc = propertyType.heroImage || `/inventory/${propertyType.slug}-oklahoma-1031-exchange.jpg`;

  // Key investment metrics
  const investmentMetrics = [
    { label: "Typical Cap Rate", value: "5.5% - 7.5%" },
    { label: "Lease Term", value: "10-20 years" },
    { label: "Lease Type", value: "NNN (Triple Net)" },
    { label: "Tenant Credit", value: "Investment Grade" },
    { label: "Annual Increases", value: "1-2% or CPI" },
    { label: "Price Range", value: "$1M - $10M+" },
  ];

  // Benefits specific to this property type
  const propertyBenefits = [
    { title: "Stable Cash Flow", description: "Consistent monthly income from credit-rated tenants" },
    { title: "Minimal Management", description: "NNN structure means tenant handles most expenses" },
    { title: "Long-Term Security", description: "Extended lease terms provide predictable returns" },
    { title: "Appreciation Potential", description: "Well-located properties gain value over time" },
    { title: "1031 Qualified", description: "All properties meet like-kind exchange requirements" },
    { title: "Nationwide Options", description: "Available across all 50 states for diversification" },
  ];

  const faqs = [
    {
      question: `What are ${propertyType.name.toLowerCase()} properties?`,
      answer: content?.copy || `${propertyType.name} properties are commercial real estate assets featuring established tenants with long-term lease commitments. These properties are popular with 1031 exchange investors seeking stable, passive income.`,
    },
    {
      question: `Are ${propertyType.name.toLowerCase()} properties suitable for 1031 exchange?`,
      answer: `Yes, ${propertyType.name.toLowerCase()} properties qualify as like-kind replacement properties for 1031 exchanges. These properties are held for investment purposes and meet IRS requirements for tax-deferred exchange treatment.`,
    },
    {
      question: `What should I consider when identifying ${propertyType.name.toLowerCase()} replacement properties?`,
      answer: `Key factors include tenant credit quality, lease term remaining, rent escalation structure, property condition, location fundamentals, and cap rate relative to market. We help investors evaluate these factors within the 45-day identification deadline.`,
    },
    {
      question: `How do I get started?`,
      answer: `Contact us to discuss ${propertyType.name.toLowerCase()} replacement property identification for your 1031 exchange. We can help identify suitable properties nationwide and coordinate with qualified intermediaries to meet your deadlines.`,
    },
  ];

  return (
    <div className="bg-white">
      {/* Page Title */}
      <section className="border-b border-gray-100 py-12 pt-24 md:py-16 md:pt-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h1 className="font-heading text-4xl uppercase md:text-5xl lg:text-6xl">
            {propertyType.name}
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            1031 Exchange Replacement Properties
          </p>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-gray-600">
            {content?.copy || `${propertyType.name} properties offer stable cash flow and long-term lease commitments, making them ideal replacement properties for 1031 exchanges. Available nationwide with credit-rated tenants.`}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      {propertyType.heroImage && (
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <Image
            src={heroImageSrc}
            alt={propertyType.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </section>
      )}

      {/* Property Overview */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            {propertyType.name} - Investment Overview & Guide
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600">
            {propertyType.name} properties represent a significant category in the 1031 exchange 
            replacement market. These assets typically feature national or regional tenants 
            operating under long-term lease agreements, providing investors with predictable 
            income streams and minimal management responsibilities.
          </p>

          {/* Investment Metrics Table */}
          <div className="mt-12 overflow-hidden rounded-lg border border-gray-200">
            <div className="bg-gray-600 px-6 py-4">
              <h4 className="font-heading text-lg uppercase text-white">
                Key Investment Metrics for {propertyType.name}
              </h4>
            </div>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {investmentMetrics.map((metric, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3">
                      {metric.label}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {metric.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-500 italic">
            *Metrics are indicative ranges and vary by specific property, location, and market conditions.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            Investment Benefits
          </h2>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            Why investors choose {propertyType.name.toLowerCase()} properties for 1031 exchanges.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {propertyBenefits.map((benefit, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-1 bg-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-sm uppercase tracking-wide">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Image */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src="/locations/oklahoma-city-ok-1031-exchange.jpg"
          alt={`${propertyType.name} investment`}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </section>

      {/* 1031 Exchange Considerations */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            1031 Exchange Considerations for {propertyType.name}
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600">
            When identifying {propertyType.name.toLowerCase()} properties as replacement assets 
            for your 1031 exchange, several factors deserve careful consideration to ensure 
            both compliance and investment success.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <div className="h-6 w-1 bg-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-sm uppercase tracking-wide">
                    Identification Timeline
                  </h3>
                  <div className="mt-3 space-y-2 text-sm text-gray-600">
                    <p><strong>45 Days:</strong> Identify replacement properties in writing</p>
                    <p><strong>180 Days:</strong> Complete acquisition of replacement property</p>
                    <p><strong>Tip:</strong> Start identifying properties before closing on your relinquished property</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <div className="h-6 w-1 bg-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-sm uppercase tracking-wide">
                    Value Requirements
                  </h3>
                  <div className="mt-3 space-y-2 text-sm text-gray-600">
                    <p><strong>Equal or Greater:</strong> Replacement value should meet or exceed relinquished property</p>
                    <p><strong>Debt Replacement:</strong> New debt should equal or exceed old debt to avoid boot</p>
                    <p><strong>Tip:</strong> Consult with your CPA for specific calculations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-center text-3xl uppercase md:text-4xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 space-y-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden rounded-lg border border-gray-200">
                <div className="bg-gray-600 px-6 py-4">
                  <h3 className="text-base font-medium text-white">{faq.question}</h3>
                </div>
                <div className="bg-white px-6 py-4">
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Property Types */}
      <section className="section-dark py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-center text-3xl uppercase md:text-4xl">
            Other Property Types
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPropertyTypes.map((related) => (
              <Link
                key={related.slug}
                href={related.route}
                className="group rounded-lg border border-gray-700 bg-gray-800/50 p-6 transition hover:border-gray-500"
              >
                <h3 className="font-heading text-lg uppercase">{related.name}</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Available nationwide for 1031 exchange replacement.
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/inventory" className="btn-white">
              View All Property Types
            </Link>
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
            Ready to explore {propertyType.name.toLowerCase()} properties for your 1031 exchange? 
            Our team helps you identify the right replacement properties nationwide.
          </p>
          <Link href="/contact" className="btn-primary mt-8 bg-white text-gray-900 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
