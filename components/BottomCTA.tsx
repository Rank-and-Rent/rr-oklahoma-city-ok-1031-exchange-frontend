import Link from "next/link";
import site from "@/content/site.json";

export default function BottomCTA() {
  return (
    <section className="mt-16 border-t border-[#334155] bg-[#11151B]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <h2 className="text-2xl font-semibold text-white">Ready to start?</h2>
        <div className="flex gap-3">
          <a
            href={`tel:${site.phoneDigits}`}
            className="rounded-full bg-[#0EA5A6] px-5 py-3 text-[#0B0F13]"
          >
            Call Now
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-[#334155] px-5 py-3 text-[#E7E9EC]"
          >
            Get A Quote
          </Link>
        </div>
      </div>
    </section>
  );
}