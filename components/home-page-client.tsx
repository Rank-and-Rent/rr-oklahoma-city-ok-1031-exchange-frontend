"use client";

import type { ComponentType, SVGProps } from "react";
import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import HomeServicesSection from "./home-services-section";
import HomeLocationsSection from "./home-locations-section";
import HomeInventorySection from "./home-inventory-section";
import { servicesData } from "@/data/services";
import {
  ArrowUpRightIcon,
  ArrowPathIcon,
  BanknotesIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  CalculatorIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  CubeIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  HandThumbUpIcon,
  HomeModernIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ScaleIcon,
  SparklesIcon,
  Squares2X2Icon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { DM_Serif_Display, Inter } from "next/font/google";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type WhyCard = {
  title: string;
  description: string;
  icon: IconComponent;
};

type StepItem = {
  title: string;
  description: string;
  icon: IconComponent;
};

type ServiceCard = {
  title: string;
  description: string;
  icon: IconComponent;
  span?: "tall";
};

type PropertyTypeCard = {
  title: string;
  description: string;
  icon: IconComponent;
};

type FaqItem = {
  question: string;
  answer: string;
};

type LeadFormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  timeline: string;
  details: string;
};

const phoneNumber = "(832) 743-1964";
const phoneHref = "tel:+18327431964";
const okTaxTransferUrl =
  "https://oklahoma.gov/tax/help-center/oklahoma-businesses/real-estate-excise-tax.html";
const hasStaffedOffice = false;

const whyCards: WhyCard[] = [
  {
    title: "Oklahoma tax and property knowledge",
    description:
      "Local insight on Oklahoma City valuations, market timelines, and state-level reporting expectations.",
    icon: MapPinIcon,
  },
  {
    title: "Qualified intermediary partnerships",
    description:
      "Screened intermediary network with fidelity bonds, trust accounts, and transparent pricing.",
    icon: HandThumbUpIcon,
  },
  {
    title: "CPA and attorney review options",
    description:
      "Coordinated briefings so your advisors can confirm structures, basis tracking, and entity needs.",
    icon: ScaleIcon,
  },
  {
    title: "Fast, clear process",
    description: "Document checklists, scheduled updates, and deadline dashboards to keep every step visible.",
    icon: ClockIcon,
  },
  {
    title: "Statewide support and communication",
    description: "Responsive specialists for investors across Oklahoma, from Edmond to Lawton to Tulsa.",
    icon: GlobeAltIcon,
  },
];

const steps: StepItem[] = [
  {
    title: "Sell your relinquished property",
    description:
      "Engage an Oklahoma intermediary before closing so sale proceeds move directly into the exchange account.",
    icon: DocumentTextIcon,
  },
  {
    title: "Identify replacements within 45 days",
    description: "Submit written identification to your intermediary with property details and contingencies.",
    icon: Squares2X2Icon,
  },
  {
    title: "Close on the new property within 180 days",
    description:
      "Coordinate funding, inspections, and lender packages so you meet federal and Oklahoma reporting deadlines.",
    icon: CheckCircleIcon,
  },
];

const services: ServiceCard[] = [
  {
    title: "Exchange intake assessment",
    description: "Timeline review, gain estimate alignment, and Oklahoma intermediary matching for each transaction.",
    icon: ArrowPathIcon,
  },
  {
    title: "Qualified intermediary coordination",
    description: "Escrow agreements, assignment notices, and document execution handled with compliant workflows.",
    icon: ShieldCheckIcon,
    span: "tall",
  },
  {
    title: "Replacement search guidance",
    description: "Market briefs across Oklahoma metros plus DST and NNN screeners for passive investors.",
    icon: ChartBarIcon,
  },
  {
    title: "Deadline monitoring",
    description: "Automated reminders for 45 and 180 day milestones, lender needs, and insurance binders.",
    icon: ClockIcon,
  },
  {
    title: "CPA and legal liaison",
    description: "Coordinated file sharing, Rev. Proc. evaluations, and entity guidance with your professional team.",
    icon: BuildingOffice2Icon,
  },
  {
    title: "Statewide closing support",
    description: "On-call specialists for site visits, county filings, and mobile notary scheduling anywhere in Oklahoma.",
    icon: PhoneIcon,
    span: "tall",
  },
];

const propertyTypes: PropertyTypeCard[] = [
  {
    title: "Multifamily portfolios",
    description: "Garden, mid-rise, and workforce housing assets in Oklahoma City, Tulsa, and tertiary markets.",
    icon: HomeModernIcon,
  },
  {
    title: "Triple net retail",
    description: "NNN and ground lease assets with regional or national tenants for consistent cash flow.",
    icon: BuildingStorefrontIcon,
  },
  {
    title: "Industrial and flex",
    description: "Distribution, fabrication, and flex warehouses aligned with I-35 and I-40 logistics corridors.",
    icon: CubeIcon,
  },
  {
    title: "Agricultural and land",
    description: "Transitional land, agricultural tracts, and conservation holdings with Oklahoma tax considerations.",
    icon: SunIcon,
  },
  {
    title: "Office and medical",
    description: "Professional campuses, medical office, and adaptive reuse opportunities with reliable tenancy.",
    icon: BuildingOfficeIcon,
  },
  {
    title: "Mixed use infill",
    description: "Downtown and neighborhood infill sites that pair residential density with retail stability.",
    icon: SparklesIcon,
  },
];

const faqItems: FaqItem[] = [
  {
    question: "What are the 45 and 180 day deadlines?",
    answer:
      "The IRS requires written identification of replacement property within 45 calendar days of closing on the relinquished property and completion of the purchase within 180 days or the due date of your tax return, whichever comes first.",
  },
  {
    question: "What properties qualify as like-kind?",
    answer:
      "Any real property held for investment or productive use in a trade or business is generally like-kind to any other real property with the same intent, including land, multifamily, retail, industrial, or oil and gas interests.",
  },
  {
    question: "What is boot and how is it taxed?",
    answer:
      "Boot is any cash or non-like-kind property you receive in the exchange. It becomes taxable to the extent of realized gain and should be reviewed with your CPA to confirm state and federal treatment.",
  },
  {
    question: "Are local transfer taxes deferred?",
    answer:
      "A 1031 exchange defers federal and Oklahoma state income tax. Local excise, transfer, and recording fees still apply and must be budgeted at each county level.",
  },
  {
    question: "Can I complete a reverse exchange?",
    answer:
      "Yes. A reverse exchange allows you to acquire the replacement property before selling the relinquished one using an exchange accommodation titleholder structure that meets IRS Rev. Proc. 2000-37 guidelines.",
  },
  {
    question: "How do I report using Form 8824?",
    answer:
      "Your CPA files IRS Form 8824 with your federal tax return, outlining relinquished and replacement property details, valuation, and boot calculations to substantiate the deferral.",
  },
];

const okCities = [
  { name: "Oklahoma City", slug: "oklahoma-city-ok" },
  { name: "Tulsa", slug: "tulsa-ok" },
  { name: "Norman", slug: "norman-ok" },
  { name: "Edmond", slug: "edmond-ok" },
  { name: "Stillwater", slug: "stillwater-ok" },
  { name: "Broken Arrow", slug: "broken-arrow-ok" },
];

const irsLinks = {
  form8824: "https://www.irs.gov/forms-pubs/about-form-8824",
  likeKind:
    "https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips",
  revProc: "https://www.irs.gov/irb/2008-10_IRB#RP-2008-16",
};

const initialFormValues: LeadFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  timeline: "",
  details: "",
};

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HomePageClient() {
  const [formValues, setFormValues] = useState<LeadFormValues>(initialFormValues);
  const [projectTypeQuery, setProjectTypeQuery] = useState("");
  const [projectTypeSuggestions, setProjectTypeSuggestions] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(faqItems[0]?.question ?? null);

  // Typeahead for project type
  useEffect(() => {
    if (projectTypeQuery.trim().length > 1) {
      const sortedServices = [...servicesData].sort((a, b) => a.name.localeCompare(b.name));
      const matches = sortedServices
        .filter((s) => s.name.toLowerCase().includes(projectTypeQuery.toLowerCase()))
        .map((s) => s.name)
        .slice(0, 5);
      setProjectTypeSuggestions(matches);
    } else {
      setProjectTypeSuggestions([]);
    }
  }, [projectTypeQuery]);

  // Initialize Turnstile
  useEffect(() => {
    const initTurnstile = () => {
      if (typeof window !== "undefined" && window.turnstile && turnstileRef.current) {
        const widgetId = window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          "error-callback": () => {
            setTurnstileToken("");
          },
          "expired-callback": () => {
            setTurnstileToken("");
          },
        });
        return () => {
          if (widgetId && window.turnstile) {
            window.turnstile.remove(widgetId);
          }
        };
      }
    };

    if (typeof window !== "undefined" && window.turnstile) {
      return initTurnstile();
    }

    const checkTurnstile = setInterval(() => {
      if (typeof window !== "undefined" && window.turnstile) {
        clearInterval(checkTurnstile);
        initTurnstile();
      }
    }, 100);

    return () => {
      clearInterval(checkTurnstile);
    };
  }, []);

  const organizationLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "1031 Exchange Oklahoma City",
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
      sameAs: ["https://www.linkedin.com/company/1031-exchange-oklahoma-city"],
      description:
        "Oklahoma intermediary coordination, CPA and attorney support, and statewide 1031 exchange guidance.",
    }),
    []
  );

  const websiteLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "1031 Exchange Oklahoma City",
      url: "https://www.1031exchangeoklahomacity.com/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.1031exchangeoklahomacity.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    }),
    []
  );

  const faqLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }),
    []
  );

  const validateForm = (values: LeadFormValues) => {
    const nextErrors: Partial<Record<keyof LeadFormValues, string>> = {};

    if (!values.name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email.";
    }
    if (!values.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[0-9()+\-\s.]{7,20}$/.test(values.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!values.projectType.trim()) {
      nextErrors.projectType = "Project type is required.";
    }

    return nextErrors;
  };

  const handleInputChange = (field: keyof LeadFormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let value = event.target.value;
    
    // Prevent letters and special characters in phone input
    if (field === "phone") {
      value = value.replace(/[^\d\s\-()\+]/g, "");
    }
    
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (field === "projectType") {
      setProjectTypeQuery(value);
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormValues((prev) => ({ ...prev, projectType: suggestion }));
    setProjectTypeQuery(suggestion);
    setProjectTypeSuggestions([]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateForm(formValues);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setStatus("error");
      setStatusMessage("Please correct the highlighted fields.");
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setStatusMessage("Please complete the security verification.");
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus("idle");
      setStatusMessage("");

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formValues,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setStatusMessage("Thank you. A 1031 specialist will reach out shortly.");
      setFormValues(initialFormValues);
      setProjectTypeQuery("");
      setTurnstileToken("");
      // Reset Turnstile
      if (typeof window !== "undefined" && window.turnstile && turnstileRef.current) {
        window.turnstile.reset();
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage("We could not submit the form. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${inter.variable} ${dmSerif.variable} bg-white text-slate-900`}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Script loaded, Turnstile will initialize via useEffect
        }}
      />
      <Script id="jsonld-org" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(organizationLd)}
      </Script>
      <Script id="jsonld-website" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(websiteLd)}
      </Script>
      <Script id="jsonld-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      <div className="bg-white">
        <section className="relative bg-white">
          <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: 'url(/oklahoma-city-hero.jpg)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/75" />
            </div>
          </div>
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:px-8 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="space-y-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">1031 EXCHANGE OKC</p>
              <h1 className={`${dmSerif.className} text-4xl leading-tight text-slate-900 md:text-5xl`}>
                Oklahoma City 1031 Exchange Experts
              </h1>
              <p className="text-lg text-slate-600 md:text-xl">
                Navigate every 1031 tax deferral Oklahoma requirement with clear timelines, bonded Oklahoma intermediary
                partners, and coordinated CPA and attorney support so you never miss the 45 or 180 day deadlines.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#lead-form"
                  className="inline-flex items-center justify-center rounded-full bg-[#1E3A8A] px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63]"
                >
                  Start My Exchange
                </Link>
                <Link
                  href={phoneHref}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 transition hover:border-slate-900"
                >
                  Call {phoneNumber}
                </Link>
              </div>
              <p className="text-sm text-slate-500">
                45 Day identification. 180 Day closing. We help you meet every deadline.
              </p>
            </motion.div>
            <motion.div
              id="lead-form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease: "easeOut" }}
              className="rounded-3xl border border-white/30 bg-white/80 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur"
            >
              <div className="mb-6 space-y-2 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Consultation</p>
                <h2 className={`${dmSerif.className} text-2xl text-slate-900`}>Plan your 1031 exchange</h2>
                <p className="text-sm text-slate-500">Educational content only. Not tax or legal advice.</p>
              </div>
              <form className="space-y-5" onSubmit={handleSubmit} noValidate aria-live="polite">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Name *
                    <input
                      type="text"
                      value={formValues.name}
                      onChange={handleInputChange("name")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
                    />
                    {errors.name && (
                      <span id="name-error" className="mt-1 block text-xs text-red-600">
                        {errors.name}
                      </span>
                    )}
                  </label>

                  <label className="text-sm font-semibold text-slate-700">
                    Company
                    <input
                      type="text"
                      value={formValues.company}
                      onChange={handleInputChange("company")}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Email *
                    <input
                      type="email"
                      value={formValues.email}
                      onChange={handleInputChange("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
                    />
                    {errors.email && (
                      <span id="email-error" className="mt-1 block text-xs text-red-600">
                        {errors.email}
                      </span>
                    )}
                  </label>

                  <label className="text-sm font-semibold text-slate-700">
                    Phone *
                    <input
                      type="tel"
                      value={formValues.phone}
                      onChange={handleInputChange("phone")}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
                    />
                    {errors.phone && (
                      <span id="phone-error" className="mt-1 block text-xs text-red-600">
                        {errors.phone}
                      </span>
                    )}
                  </label>
                </div>

                <label className="relative block text-sm font-semibold text-slate-700">
                  Project Type *
                  <input
                    type="text"
                    value={formValues.projectType}
                    onChange={handleInputChange("projectType")}
                    aria-invalid={Boolean(errors.projectType)}
                    aria-describedby={errors.projectType ? "projectType-error" : undefined}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
                    autoComplete="off"
                  />
                  {projectTypeSuggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
                      {projectTypeSuggestions.map((suggestion, index) => (
                        <li key={index}>
                          <button
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                          >
                            {suggestion}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {errors.projectType && (
                    <span id="projectType-error" className="mt-1 block text-xs text-red-600">
                      {errors.projectType}
                    </span>
                  )}
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Timeline
                  <select
                    value={formValues.timeline}
                    onChange={handleInputChange("timeline")}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (within 30 days)</option>
                    <option value="45-days">45 days (identification deadline)</option>
                    <option value="180-days">180 days (closing deadline)</option>
                    <option value="planning">Planning phase</option>
                  </select>
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Details
                  <textarea
                    value={formValues.details}
                    onChange={handleInputChange("details")}
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
                  />
                </label>

                <div ref={turnstileRef} className="flex justify-center" />

                <button
                  type="submit"
                  disabled={isSubmitting || !turnstileToken}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#EAB308] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900 transition hover:bg-[#d49a04] disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {isSubmitting ? "Sending..." : "Submit Request"}
                </button>

                <div className="text-center text-sm text-slate-500" role="status" aria-live="polite">
                  {statusMessage && (
                    <span className={status === "error" ? "text-red-600" : "text-emerald-600"}>{statusMessage}</span>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        <motion.section
          id="why"
          className="bg-[#F9FAFB]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">
                  Why investors work with us
                </p>
                <h2 className={`${dmSerif.className} mt-3 text-3xl text-slate-900 md:text-4xl`}>
                  Local clarity for every 1031 Exchange Oklahoma City investor
                </h2>
              </div>
              <p className="max-w-xl text-base text-slate-600">
                We pair midwestern clarity with institutional discipline so each qualified intermediary OKC engagement feels
                transparent from the first call to the final closing package.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {whyCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(30,58,138,0.06)] transition hover:-translate-y-1 hover:border-[#1E3A8A]"
                >
                  <card.icon className="mb-4 h-10 w-10 text-[#1E3A8A]" aria-hidden />
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-sm text-slate-500">
              A 1031 exchange defers federal and Oklahoma state income tax on qualifying real property. It does not remove local
              transfer or recording fees.{" "}
              <Link href={okTaxTransferUrl} className="text-[#1E3A8A] underline" target="_blank" rel="noreferrer">
                Review Oklahoma transfer guidance
              </Link>
              .
            </p>
          </div>
        </motion.section>

        <motion.section
          className="bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">How a 1031 works</p>
              <h2 className={`${dmSerif.className} mt-3 text-3xl text-slate-900 md:text-4xl`}>
                Three steps to protect your gain
              </h2>
            </div>
            <div className="mt-12 space-y-8">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white via-white to-slate-50 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E3A8A]/10 text-xl font-semibold text-[#1E3A8A]">
                        {index + 1}
                      </div>
                      <step.icon className="h-10 w-10 text-[#EAB308]" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-base text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4 text-sm font-semibold text-[#1E3A8A]">
              <Link className="inline-flex items-center gap-2 underline" href={irsLinks.form8824} target="_blank" rel="noreferrer">
                IRS Form 8824 <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
              </Link>
              <Link className="inline-flex items-center gap-2 underline" href={irsLinks.likeKind} target="_blank" rel="noreferrer">
                Like-Kind Property Rules <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
              </Link>
              <Link className="inline-flex items-center gap-2 underline" href={irsLinks.revProc} target="_blank" rel="noreferrer">
                Rev. Proc. 2008-16 safe harbor <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="services"
          className="bg-gradient-to-b from-white to-[#F9FAFB]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">Our exchange services</p>
                <h2 className={`${dmSerif.className} mt-3 text-3xl text-slate-900 md:text-4xl`}>
                  Precision support for investors and advisors
                </h2>
              </div>
              <Link
                href="/services/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 transition hover:border-[#1E3A8A]"
              >
                See all services <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <HomeServicesSection />
          </div>
        </motion.section>

        <motion.section
          id="property-types"
          className="bg-[#F4F6FB]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">Property types</p>
                <h2 className={`${dmSerif.className} mt-3 text-3xl text-slate-900 md:text-4xl`}>
                  Assets we help you exchange
                </h2>
                <p className="mt-4 max-w-2xl text-base text-slate-600">
                  1031 Exchange Oklahoma City supports sophisticated investors, family offices, and advisors across multifamily,
                  industrial, retail, office, agricultural, and mixed use strategies statewide.
                </p>
              </div>
              <Link
                href="/property-types/"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 shadow ring-1 ring-[#E5E7EB]"
              >
                Explore property types <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <HomeInventorySection />
          </div>
        </motion.section>

        <motion.section
          id="tools"
          className="bg-gradient-to-b from-white to-[#F9FAFB]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">Free Tools</p>
                <h2 className={`${dmSerif.className} mt-3 text-3xl text-slate-900 md:text-4xl`}>
                  Calculators and Resources for Your Exchange
                </h2>
              </div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 transition hover:border-[#1E3A8A]"
              >
                View All Tools <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <motion.div
                variants={sectionMotion}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-[#1E3A8A] to-[#162d63] p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link href="/tools/boot-calculator" className="block">
                  <CalculatorIcon className="mb-4 h-12 w-12 text-[#EAB308]" />
                  <h3 className="mb-2 text-2xl font-semibold">Boot Calculator</h3>
                  <p className="text-gray-100">
                    Calculate boot (cash received, mortgage relief) and estimate tax implications for your exchange.
                  </p>
                </Link>
              </motion.div>
              <motion.div
                variants={sectionMotion}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-[#1E3A8A] to-[#162d63] p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link href="/tools/exchange-cost-estimator" className="block">
                  <BanknotesIcon className="mb-4 h-12 w-12 text-[#EAB308]" />
                  <h3 className="mb-2 text-2xl font-semibold">Exchange Cost Estimator</h3>
                  <p className="text-gray-100">
                    Estimate total costs including QI fees, escrow costs, title insurance, and recording fees.
                  </p>
                </Link>
              </motion.div>
              <motion.div
                variants={sectionMotion}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-[#1E3A8A] to-[#162d63] p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link href="/tools/identification-rules-checker" className="block">
                  <CheckCircleIcon className="mb-4 h-12 w-12 text-[#EAB308]" />
                  <h3 className="mb-2 text-2xl font-semibold">Identification Rules Checker</h3>
                  <p className="text-gray-100">
                    Validate your exchange against the 3-property, 200%, or 95% identification rules.
                  </p>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="coverage"
          className="bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">Oklahoma coverage</p>
                <h2 className={`${dmSerif.className} mt-3 text-3xl text-slate-900 md:text-4xl`}>
                  Providing compliant 1031 exchange support across Oklahoma City and beyond
                </h2>
                <p className="mt-4 text-base text-slate-600">
                  Our qualified intermediary OKC relationships keep escrow accounts, assignment notices, and wiring coordinated with your
                  title company so investors in Tulsa, Norman, Edmond, Stillwater, and every county statewide stay compliant.
                </p>
              </div>
            </div>
            <HomeLocationsSection />
          </div>
        </motion.section>

        <motion.section
          id="faq"
          className="bg-[#F9FAFB]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionMotion}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">
                Frequently asked questions
              </p>
              <h2 className={`${dmSerif.className} mt-3 text-3xl text-slate-900 md:text-4xl`}>
                Answers for Oklahoma investors
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-4xl divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
              {faqItems.map((item) => {
                const isOpen = openFaq === item.question;
                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : item.question)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.question}`}
                    >
                      <span className="text-lg font-semibold text-slate-900">{item.question}</span>
                      <span className="text-sm font-semibold text-[#1E3A8A]">{isOpen ? "-" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div id={`faq-panel-${item.question}`} className="px-6 pb-6 text-base text-slate-600">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="bg-gradient-to-br from-[#0f1f4b] via-[#1E3A8A] to-[#0b1740] text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionMotion}
        >
          <div className="mx-auto max-w-5xl px-6 py-20 text-center md:px-8 md:py-28">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Final CTA</p>
            <h2 className={`${dmSerif.className} mt-4 text-4xl`}>Ready To Begin Your 1031 Exchange?</h2>
            <p className="mt-4 text-lg text-white/80">
              Our Oklahoma team is here to help you meet every IRS deadline with confidence.
            </p>
            <Link
              href="#lead-form"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#EAB308] px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-900 shadow-lg shadow-black/30 transition hover:bg-[#d49a04]"
            >
              Start My Exchange
            </Link>
            <p className="mt-4 text-xs text-white/70" aria-label="Oklahoma City skyline at sunrise with gradient overlay.">
              Oklahoma City skyline at sunrise with gradient overlay.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

// Extend Window interface for Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement | null, options: {
        sitekey: string;
        callback: (token: string) => void;
        "error-callback"?: () => void;
        "expired-callback"?: () => void;
      }) => string;
      remove: (widgetId: string) => void;
      reset: () => void;
    };
  }
}

