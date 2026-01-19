import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { locationsData } from "@/data/locations";
import { servicesData } from "@/data/services";
import { locationsBatch01 } from "@/data/batches/locations/batch-01";
import { locationsBatch02 } from "@/data/batches/locations/batch-02";
import { locationsBatch03 } from "@/data/batches/locations/batch-03";
import { SITE_NAME, SITE_URL, PRIMARY_STATE_ABBR } from "@/lib/config";

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
    title: `${location.name}, ${PRIMARY_STATE_ABBR} Real Estate | ${SITE_NAME}`,
    description: `Discover ${location.name}, ${PRIMARY_STATE_ABBR} real estate for 1031 exchanges. Market trends, lifestyle guides, and investment opportunities.`,
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

  const heroImageSrc = location.heroImage || `/locations/${location.slug}-1031-exchange.jpg`;
  const locationServices = servicesData.slice(0, 6);

  // Key facts for the location
  const keyFacts = [
    { label: "Area", value: `${location.name} Metro Area` },
    { label: "County", value: "Oklahoma County" },
    { label: "State", value: "Oklahoma" },
    { label: "Population", value: location.name === "Oklahoma City" ? "~700,000 (city) / ~1.4M (metro)" : "See local data" },
    { label: "Elevation", value: "~1,200 ft (366 m)" },
    { label: "Signature Attractions", value: "Bricktown, Myriad Gardens, Oklahoma City National Memorial" },
    { label: "Main Roads", value: "I-35, I-40, I-44" },
  ];

  // Lifestyle categories
  const lifestyleCategories = [
    { title: `Location in ${location.name}`, content: `${location.name} sits in the heart of Oklahoma with easy access to major highways and regional airports.` },
    { title: `Community in ${location.name}`, content: "A diverse mix of families, professionals, and retirees. Strong neighborhood associations and community events foster year-round connection." },
    { title: `Dining in ${location.name}`, content: "From upscale steakhouses to authentic international cuisine. Local favorites and national chains serve every palate." },
    { title: `Education in ${location.name}`, content: "Quality public schools, private academies, and higher education institutions including universities and community colleges." },
    { title: `Housing in ${location.name}`, content: "Diverse housing options from historic homes to modern developments. Single-family, condos, and luxury properties available." },
    { title: `Transportation in ${location.name}`, content: "Well-connected road network with expanding public transit. Airport access for regional and national travel." },
    { title: `Climate in ${location.name}`, content: "Four distinct seasons with warm summers and mild winters. Occasional severe weather requires preparation." },
    { title: `Amenities in ${location.name}`, content: "Shopping centers, medical facilities, parks, golf courses, and entertainment venues throughout the area." },
    { title: `Demographics in ${location.name}`, content: "Growing population with diverse economic backgrounds. Strong workforce supporting multiple industries." },
  ];

  // Market trends data
  const marketTrends = [
    { type: "Single-Family Home", medianPrice: "$250,000-$400,000", pricePerSqFt: "$150-$200", avgRent: "$1,500-$2,500/mo", yield: "5-7% (est.)" },
    { type: "Townhome / Condo", medianPrice: "$180,000-$300,000", pricePerSqFt: "$140-$180", avgRent: "$1,200-$1,800/mo", yield: "5-6% (est.)" },
    { type: "Multifamily (2-4 units)", medianPrice: "$300,000-$600,000", pricePerSqFt: "$120-$160", avgRent: "$800-$1,200/unit", yield: "6-8% (est.)" },
    { type: "Commercial / Retail", medianPrice: "$500,000+", pricePerSqFt: "$100-$250", avgRent: "$15-$25/sqft NNN", yield: "6-9% (est.)" },
  ];

  // FAQs
  const faqs = locationContent?.faqs || [
    {
      question: `How much does it cost to invest in ${location.name}?`,
      answer: `Investment property prices in ${location.name} vary by type and location. Single-family homes typically range from $200,000-$500,000, while commercial properties start at $500,000+. Contact us for current market data specific to your investment criteria.`,
    },
    {
      question: `Is ${location.name} a good place for investment properties?`,
      answer: `Yes - ${location.name}'s growing economy, diverse employment base, and population growth make it attractive for real estate investment. Investors target rental properties, commercial spaces, and development opportunities. Cap rates typically range from 5-8% depending on property type.`,
    },
    {
      question: "What is the rental market like?",
      answer: `Strong rental demand driven by population growth and employment. Long-term rentals perform well, with vacancy rates below the national average. Single-family rentals command $1,500-$2,500/month depending on size and location.`,
    },
  ];

  return (
    <div className="bg-white">
      {/* Page Title */}
      <section className="border-b border-gray-100 py-12 pt-24 md:py-16 md:pt-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h1 className="font-heading text-4xl uppercase md:text-5xl lg:text-6xl">
            {location.name}, {PRIMARY_STATE_ABBR} Real Estate
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-gray-600">
            {location.name} offers excellent opportunities for 1031 exchange investors. 
            The area combines economic stability, population growth, and diverse property 
            types suitable for tax-deferred exchanges. Whether you&apos;re looking for 
            residential rentals, commercial properties, or development land, {location.name} 
            provides options across all investment strategies.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <Image
            src={heroImageSrc}
          alt={`${location.name}, ${PRIMARY_STATE_ABBR}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
      </section>

      {/* Community Overview */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            {location.name}, {PRIMARY_STATE_ABBR} - Community Overview & Real Estate Guide
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600">
            {location.name} is one of Oklahoma&apos;s premier destinations for real estate investment. 
            The area features strong employment, quality schools, and growing infrastructure. 
            Real estate options range from affordable single-family homes to high-end commercial 
            developments, all with favorable investment fundamentals for 1031 exchange replacement properties.
          </p>

          <h3 className="mt-12 font-heading text-xl uppercase">
            Overview of {location.name}, {PRIMARY_STATE_ABBR}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            {location.name} sits in the heart of Oklahoma with excellent highway access and 
            regional connectivity. The area is known for its friendly communities, growing 
            job market, and affordable cost of living compared to coastal markets. Real estate 
            here ranges from historic neighborhoods to modern planned developments, all reflecting 
            the area&apos;s steady appreciation and rental demand.
          </p>

          {/* Key Facts Table */}
          <div className="mt-12 overflow-hidden rounded-lg border border-gray-200">
            <div className="bg-gray-600 px-6 py-4">
              <h4 className="font-heading text-lg uppercase text-white">
                Key Facts about {location.name}, {PRIMARY_STATE_ABBR}
              </h4>
            </div>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {keyFacts.map((fact, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3">
                      {fact.label}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {fact.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-base leading-relaxed text-gray-600">
            {location.name} represents solid fundamentals for real estate investment - stable 
            population growth, diverse employment, and finite supply supporting resilient 
            values across market cycles.
          </p>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${encodeURIComponent(location.name + ", Oklahoma")}&output=embed&zoom=12`}
              allowFullScreen
              title={`Map of ${location.name}, ${PRIMARY_STATE_ABBR}`}
            />
          </div>
        </div>
      </section>

      {/* Location & Connectivity */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            Location & Connectivity in {location.name}
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600">
            {location.name} offers excellent connectivity in a central Oklahoma location. 
            Major highways provide easy access to regional markets, while the local 
            airport offers connections to major hubs. The area is well-connected with 
            growing infrastructure supporting both residents and businesses.
          </p>

          {/* Connectivity Table */}
          <div className="mt-12 overflow-hidden rounded-lg border border-gray-200">
            <div className="bg-gray-600 px-6 py-4">
              <h4 className="font-heading text-lg uppercase text-white">
                Connectivity & Transportation - {location.name}, {PRIMARY_STATE_ABBR}
              </h4>
            </div>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3">Location Map & Overview</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Central Oklahoma location with easy access to I-35 and I-40 corridors. 
                    Strategic position for regional commerce and investment.
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Nearby Areas & Communities</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Edmond - affluent suburb with excellent schools</li>
                      <li>Norman - university town with steady rental demand</li>
                      <li>Moore - growing suburban community</li>
                      <li>Midwest City - established suburb near Tinker AFB</li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Road Access & Main Highways</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <ul className="list-disc pl-4 space-y-1">
                      <li>I-35 - major north-south corridor connecting Texas to Kansas</li>
                      <li>I-40 - east-west interstate across the southern US</li>
                      <li>I-44 - connects to Tulsa and points northeast</li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Airport Access</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Will Rogers World Airport (OKC) - ~15 minutes from downtown; 
                    direct flights to major US cities. Wiley Post Airport for general aviation.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            {location.name} Real Estate Market Trends (2025)
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600">
            {location.name}&apos;s market is defined by steady growth, affordable entry points, 
            and strong rental fundamentals. Investors find opportunities across residential 
            and commercial sectors with competitive cap rates compared to coastal markets.
          </p>

          {/* Market Table */}
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-heading uppercase">Property Type</th>
                  <th className="px-6 py-4 text-left text-sm font-heading uppercase">Median Price (USD)</th>
                  <th className="px-6 py-4 text-left text-sm font-heading uppercase">Price per Sq.Ft (USD)</th>
                  <th className="px-6 py-4 text-left text-sm font-heading uppercase">Average Rent (USD/month)</th>
                  <th className="px-6 py-4 text-left text-sm font-heading uppercase">Rental Yield*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {marketTrends.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.medianPrice}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.pricePerSqFt}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.avgRent}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.yield}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-500 italic">
            *Methodology & Notes: Estimates based on current market conditions. Actual yields vary by 
            location, property condition, and management. Contact us for detailed analysis.
          </p>
        </div>
      </section>

      {/* Second Hero Image */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src={`/locations/${locationsData[1]?.slug || "edmond-ok"}-1031-exchange.jpg`}
          alt={`${location.name} area`}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </section>

      {/* Lifestyle Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            Lifestyle in {location.name}
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600">
            {location.name} balances urban convenience with community warmth. The area offers 
            diverse neighborhoods, quality schools, and year-round activities. Its affordable 
            cost of living and strong job market make it attractive for residents and 
            investors alike.
          </p>

          {/* Lifestyle Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lifestyleCategories.map((category, index) => (
              <div key={index} className="rounded-lg border border-gray-200 p-6">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-1 bg-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading text-sm uppercase tracking-wide">
                      {category.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-600">
                      {category.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Potential */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            Investment Potential in {location.name}, {PRIMARY_STATE_ABBR}
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600">
            {location.name} consistently ranks among Oklahoma&apos;s strongest markets for real estate 
            investment, driven by population growth, employment diversification, and affordable 
            entry points. Investors benefit from strong rental demand and appreciation potential.
          </p>

          {/* Investment Highlights */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <div className="h-6 w-1 bg-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-sm uppercase tracking-wide">
                    Rental Snapshot in {location.name}
                  </h3>
                  <div className="mt-3 space-y-2 text-sm text-gray-600">
                    <p><strong>Single-Family Homes:</strong> $1,500-$2,500/mo</p>
                    <p><strong>Apartments:</strong> $900-$1,500/mo</p>
                    <p><strong>Commercial:</strong> $12-$25/sqft NNN</p>
                    <p className="italic text-xs">Premiums for newer construction and prime locations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-3">
                <div className="h-6 w-1 bg-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading text-sm uppercase tracking-wide">
                    What Performs Well in {location.name}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc pl-4">
                    <li>Single-family rentals in quality school districts</li>
                    <li>Multifamily near employment centers</li>
                    <li>NNN retail with national tenants</li>
                    <li>Medical office near hospitals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-center text-3xl uppercase md:text-4xl">
            Frequently Asked Questions About {location.name}, {PRIMARY_STATE_ABBR}
          </h2>

          <div className="mt-12 space-y-6">
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

      {/* Available Services */}
      <section className="section-dark py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-center text-3xl uppercase md:text-4xl">
            1031 Exchange Services in {location.name}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locationServices.map((service) => (
              <Link
                key={service.slug}
                href={service.route}
                className="group rounded-lg border border-gray-700 bg-gray-800/50 p-6 transition hover:border-gray-500"
              >
                <h3 className="font-heading text-lg uppercase">{service.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{service.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Work With Us CTA */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0">
          <Image
            src={`/locations/${locationsData[2]?.slug || "norman-ok"}-1031-exchange.jpg`}
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
            started on your 1031 exchange journey with the experts for {location.name} Real Estate.
          </p>
          <Link href="/contact" className="btn-primary mt-8 bg-white text-gray-900 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
