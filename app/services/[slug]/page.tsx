import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { servicesBatch01 } from "@/data/batches/services/batch-01";
import { servicesBatch02 } from "@/data/batches/services/batch-02";
import { servicesBatch03 } from "@/data/batches/services/batch-03";
import { SITE_NAME, SITE_URL, PRIMARY_CITY, PRIMARY_STATE_ABBR, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import ServicePageClient from "./service-page-client";
import Breadcrumbs from "@/components/breadcrumbs";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

function getServiceContent(slug: string) {
  return servicesBatch01[slug as keyof typeof servicesBatch01] ||
         servicesBatch02[slug as keyof typeof servicesBatch02] ||
         servicesBatch03[slug as keyof typeof servicesBatch03];
}

function getServiceBySlug(slug: string) {
  return servicesData.find((s) => s.slug === slug);
}

function getRelatedServices(currentSlug: string, limit: number = 4) {
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

  const relatedServices = getRelatedServices(slug, 4);

  // Use FAQs from batch content if available, otherwise generate defaults
  const faqs = serviceContent?.faqs || [
    {
      question: `How does ${service.name.toLowerCase()} work in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}?`,
      answer: `${service.short} In ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}, investors can access this service through our platform. We help coordinate with qualified intermediaries and provide property identification support.`,
    },
    {
      question: `What are the deadlines for ${service.name.toLowerCase()} in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}?`,
      answer: `The 45 day identification deadline and 180 day closing deadline apply to all 1031 exchanges in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Our service helps you meet these deadlines with property lists and documentation support.`,
    },
    {
      question: `What types of properties qualify for ${service.name.toLowerCase()} in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}?`,
      answer: `Like-kind replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} generally qualify for 1031 exchange treatment. This includes real property held for investment or productive use in a trade or business. Our service helps identify qualifying properties.`,
    },
    {
      question: `How do I get started with ${service.name.toLowerCase()} in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}?`,
      answer: `Contact us to discuss your 1031 exchange needs in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We can help identify replacement properties and coordinate with qualified intermediaries. This site helps investors identify potential replacement properties.`,
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.name, href: service.route },
          ]}
        />

        <div className="mt-8">
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">{service.name}</h1>
          <p className="mt-4 text-lg text-slate-600">{service.short}</p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {serviceContent?.mainDescription ? (
              <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: serviceContent.mainDescription }} />
            ) : (
              <div className="prose prose-slate max-w-none">
                <p className="text-base text-slate-700">{service.short}</p>
              </div>
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
          </div>

          <div className="lg:col-span-1">
            <ServicePageClient relatedServices={relatedServices} currentSlug={service.slug} />
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Ready to Get Started?</h2>
          <p className="mt-2 text-slate-600">
            Contact us to learn more about {service.name} in {PRIMARY_CITY}, {PRIMARY_STATE_ABBR}.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/contact?projectType=${encodeURIComponent(service.name)}`}
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

