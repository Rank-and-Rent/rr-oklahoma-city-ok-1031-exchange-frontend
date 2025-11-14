import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import Breadcrumbs from "@/components/breadcrumbs";
import { PortableText } from "@portabletext/react";

type BlogPost = {
  title: string;
  excerpt: string;
  content: any;
  featuredImage?: {
    url: string;
    alt: string;
  };
};

type Props = {
  params: Promise<{ slug: string }>;
};

// TODO: Replace with actual Sanity query
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Placeholder - replace with actual Sanity client query
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${slug}` },
          ]}
        />

        <article className="mt-8">
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">{post.title}</h1>
          {post.excerpt && <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>}
          
          {post.featuredImage && (
            <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-slate-100">
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="mt-8 prose prose-slate max-w-none">
            <PortableText value={post.content} />
          </div>
        </article>
      </div>
    </div>
  );
}

