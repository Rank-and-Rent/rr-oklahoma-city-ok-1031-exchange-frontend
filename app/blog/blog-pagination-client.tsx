"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
};

type BlogPaginationClientProps = {
  initialPosts: BlogPost[];
  currentPage: number;
  totalPages: number;
};

export default function BlogPaginationClient({ initialPosts, currentPage, totalPages }: BlogPaginationClientProps) {
  if (initialPosts.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
        <p className="text-lg font-semibold text-slate-900">No blog posts yet</p>
        <p className="mt-2 text-slate-600">Check back soon for 1031 exchange resources and updates.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initialPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(30,58,138,0.06)] transition hover:-translate-y-1 hover:border-[#1E3A8A]"
          >
            {post.featuredImage && (
              <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-slate-100">
                <img
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[#1E3A8A]">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A8A]">
              Read more <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-[#1E3A8A]"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2 text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-[#1E3A8A]"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

