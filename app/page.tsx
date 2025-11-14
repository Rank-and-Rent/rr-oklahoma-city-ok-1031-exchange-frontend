import type { Metadata } from "next";
import HomePageClient from "@/components/home-page-client";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.1031exchangeoklahomacity.com"),
  title: "Oklahoma City 1031 Exchange Experts | Statewide Qualified Intermediary Network",
  description:
    "1031 exchange guidance for Oklahoma property owners. Local intermediary coordination, CPA and attorney support, and deadline compliance for investors across Oklahoma City and beyond.",
  openGraph: {
    title: "Oklahoma City 1031 Exchange Experts",
    description:
      "Trusted 1031 specialists helping Oklahoma investors navigate deadlines and compliance. Local service, state coverage.",
    url: "https://www.1031exchangeoklahomacity.com/",
    siteName: "1031 Exchange Oklahoma City",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oklahoma City 1031 Exchange Experts",
    description: "Learn how to defer capital gains taxes with a compliant 1031 exchange in Oklahoma.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.1031exchangeoklahomacity.com/",
  },
};

export default function Page() {
  return <HomePageClient />;
}
