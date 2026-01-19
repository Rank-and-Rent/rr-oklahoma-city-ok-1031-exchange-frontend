import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { propertyTypesData } from "@/data/property-types";
import { SITE_NAME, SITE_URL, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

function getPropertyTypeBySlug(slug: string) {
  return propertyTypesData.find((pt) => pt.slug === slug);
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

  const description = propertyType.description || `${propertyType.name} properties available for 1031 exchange replacement. Find qualified intermediary services and replacement property identification.`;

  return {
    title: `${propertyType.name} | 1031 Exchange Property Type | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: `${SITE_URL}/property-types/${slug}`,
    },
  };
}

// Property type specific data
const propertyTypeDetails: Record<string, { metrics: Array<{ label: string; value: string }>; benefits: string[] }> = {
  "triple-net-nnn": {
    metrics: [
      { label: "Typical Cap Rate", value: "5.0% - 7.0%" },
      { label: "Lease Term", value: "10-25 years" },
      { label: "Lease Type", value: "Absolute NNN" },
      { label: "Tenant Credit", value: "Investment Grade" },
      { label: "Annual Increases", value: "1-2% fixed" },
      { label: "Price Range", value: "$1M - $20M+" },
    ],
    benefits: ["Zero landlord responsibilities", "Predictable income streams", "Long-term lease security", "Investment-grade tenants", "Minimal management required", "National tenant recognition"],
  },
  "multi-family": {
    metrics: [
      { label: "Typical Cap Rate", value: "4.5% - 7.5%" },
      { label: "Unit Count", value: "5-500+ units" },
      { label: "Lease Type", value: "Gross/Modified Gross" },
      { label: "Vacancy Rate", value: "3-8% typical" },
      { label: "Rent Growth", value: "2-5% annually" },
      { label: "Price Range", value: "$500K - $100M+" },
    ],
    benefits: ["Diversified income from multiple units", "Strong rent growth potential", "Tax benefits (depreciation)", "Inflation hedge", "Forced appreciation through improvements", "High demand asset class"],
  },
  "commercial": {
    metrics: [
      { label: "Typical Cap Rate", value: "5.5% - 8.5%" },
      { label: "Lease Term", value: "3-10 years" },
      { label: "Lease Type", value: "NNN/Modified Gross" },
      { label: "Tenant Mix", value: "National/Regional" },
      { label: "Annual Increases", value: "CPI or 2-3%" },
      { label: "Price Range", value: "$1M - $50M+" },
    ],
    benefits: ["Stable tenant base", "Professional property management", "Long-term lease structures", "Location-driven value", "Diversification options", "Multiple tenant opportunities"],
  },
  "industrial": {
    metrics: [
      { label: "Typical Cap Rate", value: "4.5% - 6.5%" },
      { label: "Lease Term", value: "5-15 years" },
      { label: "Lease Type", value: "NNN" },
      { label: "Tenant Credit", value: "Varies" },
      { label: "Annual Increases", value: "2-3%" },
      { label: "Price Range", value: "$2M - $100M+" },
    ],
    benefits: ["E-commerce driven demand", "Low maintenance requirements", "Long-term lease stability", "High barriers to entry", "Favorable supply dynamics", "Strong rent growth"],
  },
  "retail": {
    metrics: [
      { label: "Typical Cap Rate", value: "5.5% - 8.0%" },
      { label: "Lease Term", value: "5-20 years" },
      { label: "Lease Type", value: "NNN" },
      { label: "Tenant Credit", value: "National/Regional" },
      { label: "Annual Increases", value: "1-3%" },
      { label: "Price Range", value: "$1M - $25M+" },
    ],
    benefits: ["High visibility locations", "National tenant recognition", "Percentage rent upside", "Traffic-driven value", "Essential retail resilience", "Long-term leases available"],
  },
  "office": {
    metrics: [
      { label: "Typical Cap Rate", value: "6.0% - 9.0%" },
      { label: "Lease Term", value: "3-10 years" },
      { label: "Lease Type", value: "Full Service/NNN" },
      { label: "Tenant Mix", value: "Professional Services" },
      { label: "Annual Increases", value: "2-4%" },
      { label: "Price Range", value: "$2M - $100M+" },
    ],
    benefits: ["Professional tenant base", "Multi-year lease terms", "Location premium value", "Building class options", "Amenity-driven value", "Credit tenant opportunities"],
  },
  "medical-office": {
    metrics: [
      { label: "Typical Cap Rate", value: "5.5% - 7.5%" },
      { label: "Lease Term", value: "7-15 years" },
      { label: "Lease Type", value: "NNN" },
      { label: "Tenant Credit", value: "Healthcare Systems" },
      { label: "Annual Increases", value: "2-3%" },
      { label: "Price Range", value: "$2M - $50M+" },
    ],
    benefits: ["Recession-resistant demand", "Long-term lease commitments", "Specialized build-outs", "Sticky tenants", "Demographic tailwinds", "Healthcare system backing"],
  },
  "hospitality": {
    metrics: [
      { label: "Typical Cap Rate", value: "7.0% - 10.0%" },
      { label: "Lease Term", value: "10-20 years (franchised)" },
      { label: "Lease Type", value: "NNN/Management" },
      { label: "Brand", value: "Flagged/Independent" },
      { label: "RevPAR Growth", value: "Varies by market" },
      { label: "Price Range", value: "$3M - $100M+" },
    ],
    benefits: ["Revenue-based income", "Brand recognition value", "Tourism market exposure", "Multiple income streams", "Franchise support", "Value-add opportunities"],
  },
  "self-storage": {
    metrics: [
      { label: "Typical Cap Rate", value: "5.0% - 7.5%" },
      { label: "Unit Mix", value: "Climate/Non-Climate" },
      { label: "Lease Type", value: "Month-to-Month" },
      { label: "Occupancy", value: "85-95% stabilized" },
      { label: "Rent Growth", value: "3-6% annually" },
      { label: "Price Range", value: "$1M - $30M+" },
    ],
    benefits: ["Recession-resistant demand", "Low tenant improvement costs", "Scalable operations", "Technology-driven efficiency", "Diverse customer base", "Consistent cash flow"],
  },
  "land": {
    metrics: [
      { label: "Typical Cap Rate", value: "N/A (appreciation)" },
      { label: "Hold Period", value: "3-10+ years" },
      { label: "Lease Type", value: "Ground Lease/Ag" },
      { label: "Zoning", value: "Varies" },
      { label: "Annual Returns", value: "Appreciation-based" },
      { label: "Price Range", value: "$100K - $50M+" },
    ],
    benefits: ["Appreciation potential", "Development optionality", "Low maintenance costs", "Agricultural income options", "Entitlement value creation", "Long-term wealth building"],
  },
  "mixed-use": {
    metrics: [
      { label: "Typical Cap Rate", value: "5.5% - 8.0%" },
      { label: "Lease Term", value: "Varies by use" },
      { label: "Lease Type", value: "NNN/Gross" },
      { label: "Tenant Mix", value: "Retail/Office/Residential" },
      { label: "Annual Increases", value: "2-3%" },
      { label: "Price Range", value: "$2M - $100M+" },
    ],
    benefits: ["Diversified income streams", "Urban location premium", "Live-work-play demand", "Reduced vacancy risk", "Multiple value drivers", "Redevelopment potential"],
  },
  "specialty": {
    metrics: [
      { label: "Typical Cap Rate", value: "5.5% - 9.0%" },
      { label: "Lease Term", value: "10-20 years" },
      { label: "Lease Type", value: "NNN/Absolute" },
      { label: "Tenant Credit", value: "Varies" },
      { label: "Annual Increases", value: "1-3%" },
      { label: "Price Range", value: "$500K - $20M+" },
    ],
    benefits: ["Unique asset characteristics", "Limited competition", "Specialized tenant base", "Long-term lease structures", "Essential services focus", "Niche market expertise"],
  },
};

export default async function PropertyTypePage({ params }: Props) {
  const { slug } = await params;
  const propertyType = getPropertyTypeBySlug(slug);

  if (!propertyType) {
    notFound();
  }

  const relatedPropertyTypes = getRelatedPropertyTypes(slug, 6);
  const heroImageSrc = propertyType.heroImage || `/locations/oklahoma-city-ok-1031-exchange.jpg`;
  const details = propertyTypeDetails[slug] || propertyTypeDetails["commercial"];

  const faqs = [
    {
      question: `What are ${propertyType.name} properties?`,
      answer: propertyType.description || `${propertyType.name} properties are commercial real estate assets featuring established tenants with long-term lease commitments. These properties are popular with 1031 exchange investors seeking stable, passive income.`,
    },
    {
      question: `Are ${propertyType.name} properties suitable for 1031 exchange?`,
      answer: `Yes, ${propertyType.name} properties qualify as like-kind replacement properties for 1031 exchanges. These properties are held for investment purposes and meet IRS requirements for tax-deferred exchange treatment.`,
    },
    {
      question: `What should I consider when identifying ${propertyType.name} replacement properties?`,
      answer: `Key factors include tenant credit quality, lease term remaining, rent escalation structure, property condition, location fundamentals, and cap rate relative to market. We help investors evaluate these factors within the 45-day identification deadline.`,
    },
    {
      question: `How do I get started?`,
      answer: `Contact us to discuss ${propertyType.name} replacement property identification for your 1031 exchange. We can help identify suitable properties nationwide and coordinate with qualified intermediaries to meet your deadlines.`,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src={heroImageSrc}
          alt={propertyType.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
            1031 Exchange Property Type
          </p>
          <h1 className="mt-4 font-heading text-5xl uppercase tracking-wide md:text-6xl lg:text-7xl">
            {propertyType.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            {propertyType.description || `${propertyType.name} properties available for 1031 exchange replacement. Find the right investment for your portfolio.`}
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase tracking-wide text-gray-900 md:text-4xl">
            Investment Overview
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-gray-600">
            {propertyType.name} properties represent a significant category in the 1031 exchange 
            replacement market. These assets typically feature established tenants 
            operating under lease agreements, providing investors with predictable 
            income streams and investment stability.
          </p>

          {/* Investment Metrics Table */}
          <div className="mt-12 overflow-hidden rounded-xl border border-gray-200">
            <div className="bg-gray-900 px-6 py-4">
              <h3 className="font-heading text-lg uppercase tracking-wide text-white">
                Key Investment Metrics
              </h3>
            </div>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {details.metrics.map((metric, index) => (
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

      {/* Benefits Grid - Dark */}
      <section className="section-dark py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase tracking-wide text-white md:text-4xl">
            Investment Benefits
          </h2>
          <p className="mt-4 max-w-2xl text-gray-400">
            Why investors choose {propertyType.name} properties for 1031 exchanges.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {details.benefits.map((benefit, index) => (
              <div key={index} className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-1 bg-white/30 flex-shrink-0" />
                  <p className="text-white">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1031 Exchange Considerations */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase tracking-wide text-gray-900 md:text-4xl">
            1031 Exchange Considerations
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-gray-600">
            When identifying {propertyType.name} properties as replacement assets 
            for your 1031 exchange, several factors deserve careful consideration.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="font-heading text-xl uppercase tracking-wide text-gray-900">
                Identification Timeline
              </h3>
              <div className="mt-4 space-y-3 text-gray-600">
                <p><strong>45 Days:</strong> Identify replacement properties in writing</p>
                <p><strong>180 Days:</strong> Complete acquisition of replacement property</p>
                <p><strong>Tip:</strong> Start identifying properties before closing on your relinquished property</p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="font-heading text-xl uppercase tracking-wide text-gray-900">
                Value Requirements
              </h3>
              <div className="mt-4 space-y-3 text-gray-600">
                <p><strong>Equal or Greater:</strong> Replacement value should meet or exceed relinquished property</p>
                <p><strong>Debt Replacement:</strong> New debt should equal or exceed old debt to avoid boot</p>
                <p><strong>Tip:</strong> Consult with your CPA for specific calculations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <h2 className="font-heading text-center text-3xl uppercase tracking-wide text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="bg-gray-900 px-6 py-4">
                  <h3 className="font-medium text-white">{faq.question}</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Property Types */}
      <section className="section-dark py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-center text-3xl uppercase tracking-wide text-white md:text-4xl">
            Other Property Types
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPropertyTypes.map((related) => (
              <Link
                key={related.slug}
                href={related.route}
                className="group rounded-xl border border-gray-700 bg-gray-800/50 p-6 transition hover:border-white/30"
              >
                <h3 className="font-heading text-lg uppercase tracking-wide text-white">{related.name}</h3>
                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {related.description || "Available nationwide for 1031 exchange replacement."}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/property-types" className="btn-white">
              View All Property Types
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <Image
            src="/locations/edmond-ok-1031-exchange.jpg"
            alt="Oklahoma property"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white md:px-8">
          <h2 className="font-heading text-4xl uppercase md:text-5xl">
            Work With Us
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/90">
            Ready to explore {propertyType.name} properties for your 1031 exchange? 
            Our team helps you identify the right replacement properties nationwide.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-white inline-flex items-center gap-2"
            >
              Get Started <ArrowUpRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-none border border-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-gray-900"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {PHONE_NUMBER}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
