import type { PageLayoutVariant, LayoutAssignments } from "./types";
import { servicesData } from "./services";
import { locationsData } from "./locations";

export const serviceVariants: PageLayoutVariant[] = [
  {
    key: "classic",
    label: "Classic",
    description: "Standard layout with hero, description, FAQs, and sidebar.",
    sections: ["hero", "description", "faqs", "sidebar"],
    features: {
      sidebar: true,
      stickyCta: true,
      heroStyle: "gradient",
    },
  },
  {
    key: "detailed",
    label: "Detailed",
    description: "Comprehensive layout with table of contents and multiple sections.",
    sections: ["hero", "toc", "description", "inclusions", "situations", "faqs", "compliance"],
    features: {
      toc: true,
      stickyCta: true,
      heroStyle: "image",
    },
  },
  {
    key: "focused",
    label: "Focused",
    description: "Streamlined layout emphasizing key information.",
    sections: ["hero", "description", "inclusions", "faqs"],
    features: {
      stickyCta: true,
      heroStyle: "abstract",
    },
  },
  {
    key: "comparison",
    label: "Comparison",
    description: "Layout designed for comparing service options.",
    sections: ["hero", "description", "comparison", "faqs", "sidebar"],
    features: {
      sidebar: true,
      heroStyle: "gradient",
    },
  },
  {
    key: "process",
    label: "Process",
    description: "Step-by-step process focused layout.",
    sections: ["hero", "description", "process", "situations", "faqs"],
    features: {
      stickyCta: true,
      heroStyle: "image",
    },
  },
  {
    key: "minimal",
    label: "Minimal",
    description: "Clean minimal layout with essential information only.",
    sections: ["hero", "description", "faqs"],
    features: {
      heroStyle: "abstract",
    },
  },
];

export const locationVariants: PageLayoutVariant[] = [
  {
    key: "map-first",
    label: "Map First",
    description: "Map-centric layout with location details.",
    sections: ["hero", "map", "description", "paths", "faqs"],
    features: {
      heroStyle: "map",
      stickyCta: true,
    },
  },
  {
    key: "overview",
    label: "Overview",
    description: "Comprehensive location overview layout.",
    sections: ["hero", "description", "paths", "faqs", "sidebar"],
    features: {
      sidebar: true,
      heroStyle: "image",
    },
  },
  {
    key: "focused",
    label: "Focused",
    description: "Focused layout emphasizing property identification.",
    sections: ["hero", "description", "paths", "faqs"],
    features: {
      heroStyle: "gradient",
    },
  },
  {
    key: "detailed",
    label: "Detailed",
    description: "Detailed location information with multiple sections.",
    sections: ["hero", "description", "paths", "details", "faqs"],
    features: {
      heroStyle: "image",
      stickyCta: true,
    },
  },
  {
    key: "minimal",
    label: "Minimal",
    description: "Clean minimal location layout.",
    sections: ["hero", "description", "paths", "faqs"],
    features: {
      heroStyle: "abstract",
    },
  },
  {
    key: "comparison",
    label: "Comparison",
    description: "Comparison focused layout for multiple locations.",
    sections: ["hero", "description", "comparison", "paths", "faqs"],
    features: {
      heroStyle: "gradient",
    },
  },
];

// Round robin assignment function
function assignLayouts<T extends { slug: string }>(
  items: T[],
  variants: PageLayoutVariant[]
): Record<string, string> {
  const assignments: Record<string, string> = {};
  let variantIndex = 0;

  items.forEach((item) => {
    assignments[item.slug] = variants[variantIndex].key;
    variantIndex = (variantIndex + 1) % variants.length;
  });

  return assignments;
}

export const assignments: LayoutAssignments = {
  services: assignLayouts(servicesData, serviceVariants),
  locations: assignLayouts(locationsData, locationVariants),
};

