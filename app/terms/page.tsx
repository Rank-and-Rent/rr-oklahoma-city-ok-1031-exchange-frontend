import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import Breadcrumbs from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: "Terms of service for 1031 Exchange Oklahoma City. Read our terms and conditions for using our website and services.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Terms", href: "/terms" },
          ]}
        />

        <div className="mt-8">
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="mt-12 prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Acceptance of Terms</h2>
              <p className="mt-4 text-base text-slate-700">
                By accessing and using {SITE_NAME} ("the Website"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Use License</h2>
              <p className="mt-4 text-base text-slate-700">
                Permission is granted to temporarily access the materials on {SITE_NAME}'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="mt-4 list-disc pl-6 text-base text-slate-700">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Disclaimer</h2>
              <p className="mt-4 text-base text-slate-700">
                The materials on {SITE_NAME}'s website are provided on an 'as is' basis. {SITE_NAME} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="mt-4 text-base text-slate-700">
                This website provides educational information about 1031 exchanges. This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult a Qualified Intermediary and tax advisor before acting on any information provided.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Limitations</h2>
              <p className="mt-4 text-base text-slate-700">
                In no event shall {SITE_NAME} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {SITE_NAME}'s website, even if {SITE_NAME} or a {SITE_NAME} authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Accuracy of Materials</h2>
              <p className="mt-4 text-base text-slate-700">
                The materials appearing on {SITE_NAME}'s website could include technical, typographical, or photographic errors. {SITE_NAME} does not warrant that any of the materials on its website are accurate, complete, or current. {SITE_NAME} may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Links</h2>
              <p className="mt-4 text-base text-slate-700">
                {SITE_NAME} has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by {SITE_NAME} of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Modifications</h2>
              <p className="mt-4 text-base text-slate-700">
                {SITE_NAME} may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Governing Law</h2>
              <p className="mt-4 text-base text-slate-700">
                These terms and conditions are governed by and construed in accordance with the laws of the State of Oklahoma and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Contact Information</h2>
              <p className="mt-4 text-base text-slate-700">
                If you have any questions about these Terms of Service, please contact us through our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

