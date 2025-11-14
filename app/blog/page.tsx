import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_URL, PHONE_HREF, PHONE_NUMBER } from "@/lib/config";
import BlogPaginationClient from "./blog-pagination-client";
import { ArrowUpRightIcon, PhoneIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Blog",
  description: "Learn about 1031 exchanges, replacement property identification, and exchange strategies.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

// TODO: Replace with actual Sanity query
async function getBlogPosts(page: number = 1, perPage: number = 6) {
  // Placeholder - replace with actual Sanity client query
  return {
    posts: [],
    total: 0,
    totalPages: 0,
  };
}

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);
  const { posts, total, totalPages } = await getBlogPosts(currentPage, 6);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E3A8A]">Blog</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">
            1031 Exchange Resources
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Learn about 1031 exchanges, replacement property identification, and exchange strategies.
          </p>
        </div>

        <BlogPaginationClient initialPosts={posts} currentPage={currentPage} totalPages={totalPages} />

        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Ready to Get Started?</h2>
          <p className="mt-2 text-slate-600">
            Contact us to discuss your 1031 exchange needs.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
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

