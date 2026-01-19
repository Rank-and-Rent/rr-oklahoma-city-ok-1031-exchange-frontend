import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";
import { servicesBatch01 } from "@/data/batches/services/batch-01";
import { servicesBatch02 } from "@/data/batches/services/batch-02";
import { servicesBatch03 } from "@/data/batches/services/batch-03";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/config";

function getServiceContent(slug: string) {
  return servicesBatch01[slug as keyof typeof servicesBatch01] ||
         servicesBatch02[slug as keyof typeof servicesBatch02] ||
         servicesBatch03[slug as keyof typeof servicesBatch03];
}

function getServiceBySlug(slug: string) {
  return servicesData.find((s) => s.slug === slug);
}

function getRelatedServices(currentSlug: string, limit: number = 6) {
  const current = getServiceBySlug(currentSlug);
  if (!current) return servicesData.slice(0, limit);
  
  const sameCategory = servicesData.filter((s) => s.slug !== currentSlug && s.category === current.category);
  return sameCategory.length >= limit ? sameCategory.slice(0, limit) : servicesData.filter((s) => s.slug !== currentSlug).slice(0, limit);
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.name} | ${SITE_NAME}`,
    description: service.short,
    alternates: {
      canonical: `${SITE_URL}/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const serviceContent = getServiceContent(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(slug, 6);

  const faqs = serviceContent?.faqs || [
    {
      question: `How does ${service.name.toLowerCase()} work in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}?`,
      answer: `${service.short} In ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}, investors can access this service through our platform. We help coordinate with qualified intermediaries and provide property identification support.`,
    },
    {
      question: `What are the deadlines for ${service.name.toLowerCase()}?`,
      answer: `The 45 day identification deadline and 180 day closing deadline apply to all 1031 exchanges. Our service helps you meet these deadlines with property lists and documentation support.`,
    },
    {
      question: `What types of properties qualify?`,
      answer: `Like-kind replacement properties generally qualify for 1031 exchange treatment. This includes real property held for investment or productive use in a trade or business. Our service helps identify qualifying properties.`,
    },
  ];

  // Key benefits for this service
  const keyBenefits = [
    { title: "Expert Guidance", description: "Professional support throughout your exchange process" },
    { title: "Deadline Management", description: "Never miss critical 45 and 180 day deadlines" },
    { title: "Property Identification", description: "Access to nationwide replacement property options" },
    { title: "Documentation Support", description: "Complete paperwork and compliance assistance" },
    { title: "QI Coordination", description: "Seamless qualified intermediary relationships" },
    { title: "Tax Optimization", description: "Maximize your tax deferral benefits" },
  ];

  // Process steps
  const processSteps = [
    { step: "1", title: "Initial Consultation", description: "Discuss your exchange goals and timeline" },
    { step: "2", title: "Property Analysis", description: "Evaluate your relinquished property and identify options" },
    { step: "3", title: "Identification Period", description: "Select replacement properties within 45 days" },
    { step: "4", title: "Closing Coordination", description: "Complete acquisition within 180 days" },
  ];

  return (
    <div className="bg-white">
      {/* Page Title */}
      <section className="border-b border-gray-100 py-12 pt-24 md:py-16 md:pt-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h1 className="font-heading text-4xl uppercase md:text-5xl lg:text-6xl">
            {service.name}
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-gray-600">
            {service.short}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src="/locations/oklahoma-city-ok-1031-exchange.jpg"
          alt={service.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </section>

      {/* Service Overview */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            {service.name} - Service Overview & Guide
          </h2>
          
          {serviceContent?.mainDescription ? (
            <div 
              className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600 prose prose-gray"
              dangerouslySetInnerHTML={{ __html: serviceContent.mainDescription }}
            />
          ) : (
            <p className="mt-6 max-w-4xl text-base leading-relaxed text-gray-600">
              Our {service.name.toLowerCase()} service helps Oklahoma investors navigate 
              the complexities of 1031 exchanges with confidence. We provide comprehensive 
              support from initial consultation through closing, ensuring you meet all 
              IRS requirements and maximize your tax deferral benefits.
            </p>
          )}

          {/* Key Benefits Grid */}
          <div className="mt-16">
            <h3 className="font-heading text-2xl uppercase">Key Benefits</h3>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-1 bg-gray-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading text-sm uppercase tracking-wide">
                        {benefit.title}
                      </h4>
                      <p className="mt-2 text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            Our Process
          </h2>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            A streamlined approach to help you complete your 1031 exchange successfully.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white font-heading text-xl">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg uppercase">{step.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-12 w-full h-px bg-gray-300 -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Table */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-3xl uppercase md:text-4xl">
            Service Details
          </h2>

          <div className="mt-12 overflow-hidden rounded-lg border border-gray-200">
            <div className="bg-gray-600 px-6 py-4">
              <h4 className="font-heading text-lg uppercase text-white">
                What&apos;s Included with {service.name}
              </h4>
            </div>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3">Service Type</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{service.category || "Exchange Support"}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Coverage Area</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Oklahoma statewide with nationwide property identification</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Timeline Support</td>
                  <td className="px-6 py-4 text-sm text-gray-600">45-day identification and 180-day closing deadline management</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Documentation</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Complete paperwork preparation and filing support</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">QI Coordination</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Qualified intermediary relationship management</td>
                </tr>
              </tbody>
            </table>
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

      {/* Related Services */}
      <section className="section-dark py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="font-heading text-center text-3xl uppercase md:text-4xl">
            Related Services
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((relatedService) => (
              <Link
                key={relatedService.slug}
                href={relatedService.route}
                className="group rounded-lg border border-gray-700 bg-gray-800/50 p-6 transition hover:border-gray-500"
              >
                <h3 className="font-heading text-lg uppercase">{relatedService.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{relatedService.short}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services" className="btn-white">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Work With Us CTA */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0">
          <Image
            src="/locations/norman-ok-1031-exchange.jpg"
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
            Ready to get started with {service.name.toLowerCase()}? Our team is here to 
            help you navigate your 1031 exchange with confidence. Contact us today.
          </p>
          <Link href="/contact" className="btn-primary mt-8 bg-white text-gray-900 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
