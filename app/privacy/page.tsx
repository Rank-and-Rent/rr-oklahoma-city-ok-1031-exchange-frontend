import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import Breadcrumbs from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: "Privacy policy for 1031 Exchange Oklahoma City. Learn how we collect, use, and protect your information.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Privacy", href: "/privacy" },
          ]}
        />

        <div className="mt-8">
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="mt-12 prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Introduction</h2>
              <p className="mt-4 text-base text-slate-700">
                {SITE_NAME} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Information We Collect</h2>
              <p className="mt-4 text-base text-slate-700">
                We may collect information that you provide directly to us, including:
              </p>
              <ul className="mt-4 list-disc pl-6 text-base text-slate-700">
                <li>Name and contact information (email address, phone number)</li>
                <li>Company information</li>
                <li>Project details and requirements</li>
                <li>Any other information you choose to provide</li>
              </ul>
              <p className="mt-4 text-base text-slate-700">
                We also automatically collect certain information when you visit our website, such as your IP address, browser type, and usage patterns.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">How We Use Your Information</h2>
              <p className="mt-4 text-base text-slate-700">
                We use the information we collect to:
              </p>
              <ul className="mt-4 list-disc pl-6 text-base text-slate-700">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Send you information about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Information Sharing</h2>
              <p className="mt-4 text-base text-slate-700">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Data Security</h2>
              <p className="mt-4 text-base text-slate-700">
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Your Rights</h2>
              <p className="mt-4 text-base text-slate-700">
                You have the right to access, update, or delete your personal information. To exercise these rights, please contact us using the information provided on our contact page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Cookies</h2>
              <p className="mt-4 text-base text-slate-700">
                Our website may use cookies to enhance your experience. You can set your browser to refuse cookies, but this may limit some functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Changes to This Policy</h2>
              <p className="mt-4 text-base text-slate-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Contact Us</h2>
              <p className="mt-4 text-base text-slate-700">
                If you have questions about this Privacy Policy, please contact us through our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

