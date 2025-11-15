import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {items.map((item, index) => (
          <li key={item.href || item.label} className="flex items-center gap-2">
            {index > 0 && <ChevronRightIcon className="h-4 w-4 text-slate-400" />}
            {index === items.length - 1 || !item.href ? (
              <span className="font-semibold text-slate-900">{item.label}</span>
            ) : (
              <Link href={item.href} className="transition hover:text-[#1E3A8A]">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

