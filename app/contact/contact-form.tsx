"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { servicesData } from "@/data/services";

type ContactFormProps = {
  initialProjectType?: string;
  initialCity?: string;
};

type FormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  property: string;
  estimatedCloseDate: string;
  city: string;
  timeline: string;
  details: string;
};

export default function ContactForm({ initialProjectType = "", initialCity = "" }: ContactFormProps) {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: initialProjectType || searchParams.get("projectType") || "",
    property: "",
    estimatedCloseDate: "",
    city: initialCity || searchParams.get("city") || "",
    timeline: "",
    details: "",
  });
  const [projectTypeQuery, setProjectTypeQuery] = useState(formValues.projectType);
  const [projectTypeSuggestions, setProjectTypeSuggestions] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);

  // Scroll form into view if projectType is prefilled
  useEffect(() => {
    if (formValues.projectType && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [formValues.projectType]);

  // Update city if provided
  useEffect(() => {
    if (initialCity) {
      setFormValues((prev) => ({ ...prev, projectType: prev.projectType || initialCity }));
    }
  }, [initialCity]);

  // Typeahead for project type - use servicesData and sort alphabetically
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

  // Initialize Turnstile after script loads
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

    // Check if already loaded
    if (typeof window !== "undefined" && window.turnstile) {
      return initTurnstile();
    }

    // Wait for script to load
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

  const validateForm = (values: FormValues) => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

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

  const handleInputChange = (field: keyof FormValues) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let value = event.target.value;
    
    // Prevent letters and special characters in phone input (only allow numbers, spaces, dashes, parentheses, plus)
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
      setFormValues({
        name: "",
        company: "",
        email: "",
        phone: "",
        projectType: "",
        property: "",
        estimatedCloseDate: "",
        city: "",
        timeline: "",
        details: "",
      });
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

  // Get sorted services for dropdown
  const sortedServices = [...servicesData].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Script loaded, Turnstile will initialize via useEffect
        }}
      />
      <form ref={formRef} className="space-y-6" onSubmit={handleSubmit} noValidate aria-live="polite">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Name *
          <input
            type="text"
            value={formValues.name}
            onChange={handleInputChange("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
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
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
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
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
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
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
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
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
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
        Property Being Sold
        <input
          type="text"
          value={formValues.property}
          onChange={handleInputChange("property")}
          placeholder="Include property type, location, and estimated value (optional)"
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Estimated Close Date
          <input
            type="date"
            value={formValues.estimatedCloseDate}
            onChange={handleInputChange("estimatedCloseDate")}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
          />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          City
          <input
            type="text"
            value={formValues.city}
            onChange={handleInputChange("city")}
            placeholder="Primary metro or submarket (optional)"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
          />
        </label>
      </div>

      <label className="text-sm font-semibold text-slate-700">
        Timeline
        <select
          value={formValues.timeline}
          onChange={handleInputChange("timeline")}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
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
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
        />
      </label>

      <div ref={turnstileRef} className="flex justify-center" />

      <button
        type="submit"
        disabled={isSubmitting || !turnstileToken}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#1E3A8A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63] disabled:cursor-not-allowed disabled:opacity-75"
      >
        {isSubmitting ? "Sending..." : "Submit Request"}
      </button>

      <div className="text-center text-sm text-slate-500" role="status" aria-live="polite">
        {statusMessage && (
          <span className={status === "error" ? "text-red-600" : "text-emerald-600"}>{statusMessage}</span>
        )}
      </div>
    </form>
    </>
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

