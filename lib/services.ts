import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "./config";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: "property-identification" | "intermediary-support" | "compliance-planning" | "underwriting-support";
};

// Generate 24+ services focused on replacement property identification
export const services: Service[] = [
  // Property Identification - Asset Types
  {
    slug: "multifamily-replacement-properties",
    title: "Multifamily Replacement Properties",
    shortDescription: "Find garden, mid-rise, and workforce housing assets for your 1031 exchange.",
    description: `Identify multifamily replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} and surrounding markets. We help investors find garden apartments, mid-rise buildings, and workforce housing assets that qualify for like-kind exchange treatment. Our property lists include rent rolls, T12 financials, and market comps to support your identification deadline.`,
    category: "property-identification",
  },
  {
    slug: "industrial-warehouse-properties",
    title: "Industrial and Warehouse Properties",
    shortDescription: "Distribution, fabrication, and flex warehouses along major logistics corridors.",
    description: `Source industrial and warehouse replacement properties for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We identify distribution centers, fabrication facilities, and flex warehouses aligned with I-35 and I-40 logistics corridors. Property details include clear height, dock doors, power capacity, and lease terms.`,
    category: "property-identification",
  },
  {
    slug: "triple-net-retail-properties",
    title: "Triple Net Retail Properties",
    shortDescription: "Commercial properties with corporate-guaranteed tenants handling property expenses for predictable passive income.",
    description: `Discover triple net lease commercial real estate replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Our property portfolios feature single-tenant commercial buildings leased to established corporations who assume responsibility for property taxes, insurance, maintenance costs, and utilities. We deliver comprehensive lease documentation, corporate tenant financial assessments, and investment analysis to support your 45 day identification deadline.`,
    category: "property-identification",
  },
  {
    slug: "medical-office-properties",
    title: "Medical Office Properties",
    shortDescription: "Professional medical campuses and healthcare facilities with reliable tenancy.",
    description: `Identify medical office replacement properties for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We source professional medical campuses, outpatient facilities, and healthcare real estate with long-term leases. Property packages include tenant mix, parking ratios, and compliance documentation.`,
    category: "property-identification",
  },
  {
    slug: "self-storage-properties",
    title: "Self Storage Properties",
    shortDescription: "Climate controlled and drive-up storage facilities with strong occupancy rates.",
    description: `Find self storage replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Our property lists include climate controlled and drive-up facilities with occupancy reports, revenue management data, and expansion potential. We help investors identify storage assets that meet like-kind requirements.`,
    category: "property-identification",
  },
  {
    slug: "hospitality-properties",
    title: "Hospitality Properties",
    shortDescription: "Hotels, extended stay, and limited service properties in high-traffic areas.",
    description: `Identify hospitality replacement properties for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We source hotels, extended stay facilities, and limited service properties in high-traffic corridors. Property details include RevPAR data, brand affiliation, and renovation schedules.`,
    category: "property-identification",
  },
  {
    slug: "mixed-use-properties",
    title: "Mixed Use Properties",
    shortDescription: "Downtown and neighborhood infill sites combining residential and retail.",
    description: `Find mixed use replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We identify downtown and neighborhood infill sites that pair residential density with retail stability. Property packages include zoning documentation, tenant mix, and development potential.`,
    category: "property-identification",
  },
  {
    slug: "agricultural-land-properties",
    title: "Agricultural and Land Properties",
    shortDescription: "Transitional land, agricultural tracts, and conservation holdings.",
    description: `Identify agricultural and land replacement properties for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We source transitional land, agricultural tracts, and conservation holdings with ${PRIMARY_STATE_ABBR} tax considerations. Property details include soil reports, water rights, and zoning classifications.`,
    category: "property-identification",
  },
  {
    slug: "office-properties",
    title: "Office Properties",
    shortDescription: "Professional campuses, medical office, and adaptive reuse opportunities.",
    description: `Find office replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Our lists include professional campuses, medical office buildings, and adaptive reuse opportunities with reliable tenancy. We provide lease abstracts, tenant credit profiles, and market positioning data.`,
    category: "property-identification",
  },
  {
    slug: "flex-industrial-properties",
    title: "Flex Industrial Properties",
    shortDescription: "Office warehouse and flex space for light manufacturing and distribution.",
    description: `Identify flex industrial replacement properties for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We source office warehouse and flex space suitable for light manufacturing and distribution. Property details include clear height, office finish, and loading capacity.`,
    category: "property-identification",
  },
  // Property Identification - Strategies
  {
    slug: "three-property-identification",
    title: "Three Property Identification Strategy",
    shortDescription: "Identify up to three replacement properties within your 45 day deadline.",
    description: `Execute a three property identification strategy for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We help investors identify up to three replacement properties within the 45 day deadline. Our process includes property screening, financial analysis, and identification letter preparation.`,
    category: "property-identification",
  },
  {
    slug: "200-percent-identification",
    title: "200 Percent Identification Rule",
    shortDescription: "Identify multiple properties using the 200 percent of fair market value rule.",
    description: `Use the 200 percent identification rule for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. This strategy allows you to identify multiple replacement properties as long as their combined fair market value does not exceed 200 percent of the relinquished property value. We help structure compliant identification letters.`,
    category: "property-identification",
  },
  {
    slug: "95-percent-identification",
    title: "95 Percent Identification Exception",
    shortDescription: "Identify unlimited properties if you acquire 95 percent of identified value.",
    description: `Execute a 95 percent identification exception for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. This exception allows unlimited property identification if you acquire at least 95 percent of the aggregate identified value. We help structure compliant identification strategies.`,
    category: "property-identification",
  },
  {
    slug: "reverse-exchange-properties",
    title: "Reverse Exchange Property Identification",
    shortDescription: "Identify replacement properties before selling your relinquished property.",
    description: `Identify replacement properties for a reverse 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Reverse exchanges allow you to acquire replacement property before selling relinquished property using an exchange accommodation titleholder. We help structure compliant reverse exchange identification.`,
    category: "property-identification",
  },
  {
    slug: "improvement-exchange-properties",
    title: "Improvement Exchange Properties",
    shortDescription: "Identify land or properties requiring construction or improvements.",
    description: `Identify replacement properties for an improvement exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Improvement exchanges allow you to acquire land or properties requiring construction or improvements. We help structure compliant identification with construction timelines and cost estimates.`,
    category: "property-identification",
  },
  {
    slug: "dst-replacement-properties",
    title: "DST Replacement Properties",
    shortDescription: "Delaware Statutory Trust interests for passive 1031 exchange investors.",
    description: `Identify DST replacement properties for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. Delaware Statutory Trust interests provide passive investment options for investors who prefer not to manage replacement properties directly. We help evaluate DST offerings and structure compliant identification.`,
    category: "property-identification",
  },
  // Timeline and Deadline Support
  {
    slug: "45-day-deadline-support",
    title: "45 Day Identification Deadline Support",
    shortDescription: "Meet your 45 day identification deadline with property lists and documentation.",
    description: `Get support meeting your 45 day identification deadline in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We provide property lists, financial analysis, and identification letter preparation to help you meet this critical deadline. Our deadline tracking tools keep you informed of key milestones.`,
    category: "compliance-planning",
  },
  {
    slug: "180-day-closing-deadline",
    title: "180 Day Closing Deadline Support",
    shortDescription: "Coordinate replacement property acquisition within your 180 day deadline.",
    description: `Get support meeting your 180 day closing deadline in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We coordinate replacement property acquisition, lender packages, and closing documentation to ensure you meet this deadline. Our timeline tracking tools monitor progress from identification to closing.`,
    category: "compliance-planning",
  },
  {
    slug: "timeline-control-strategies",
    title: "Timeline Control Strategies",
    shortDescription: "Manage identification and closing deadlines with proactive planning.",
    description: `Implement timeline control strategies for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We help investors manage identification and closing deadlines with proactive planning, property pre-screening, and lender pre-qualification. Our strategies reduce deadline pressure and improve exchange outcomes.`,
    category: "compliance-planning",
  },
  // Underwriting and Analysis Support
  {
    slug: "rent-roll-analysis",
    title: "Rent Roll Analysis",
    shortDescription: "Review rent rolls and lease terms for replacement property evaluation.",
    description: `Get rent roll analysis for replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We review lease terms, rent rates, and tenant profiles to support your replacement property evaluation. Our analysis includes lease expiration schedules and renewal probability assessments.`,
    category: "underwriting-support",
  },
  {
    slug: "t12-financial-review",
    title: "T12 Financial Review",
    shortDescription: "Analyze trailing twelve month financials for replacement properties.",
    description: `Get T12 financial review for replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We analyze trailing twelve month income statements, expense reports, and cash flow statements to support your replacement property evaluation. Our review identifies trends and potential risks.`,
    category: "underwriting-support",
  },
  {
    slug: "capex-planning-analysis",
    title: "Capex Planning Analysis",
    shortDescription: "Evaluate capital expenditure requirements for replacement properties.",
    description: `Get capex planning analysis for replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We evaluate capital expenditure requirements, deferred maintenance, and improvement costs to support your replacement property evaluation. Our analysis helps budget for post-acquisition improvements.`,
    category: "underwriting-support",
  },
  {
    slug: "market-comp-analysis",
    title: "Market Comp Analysis",
    shortDescription: "Pull comparable sales and lease rates for replacement property markets.",
    description: `Get market comp analysis for replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We pull comparable sales, lease rates, and market trends to support your replacement property evaluation. Our analysis includes cap rate trends and market positioning.`,
    category: "underwriting-support",
  },
  {
    slug: "lender-preflight-support",
    title: "Lender Preflight Support",
    shortDescription: "Prepare lender packages and coordinate financing for replacement properties.",
    description: `Get lender preflight support for replacement properties in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We prepare lender packages, coordinate financing, and ensure replacement property acquisitions meet lender requirements. Our support helps avoid financing delays that could impact your 180 day deadline.`,
    category: "underwriting-support",
  },
  // Intermediary and Compliance Support (Secondary)
  {
    slug: "qualified-intermediary-coordination",
    title: "Qualified Intermediary Coordination",
    shortDescription: "Coordinate with qualified intermediaries for compliant exchange execution.",
    description: `Coordinate with qualified intermediaries for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We work with bonded intermediaries to ensure compliant exchange execution, proper escrow account management, and timely document execution. Our coordination supports smooth exchange completion.`,
    category: "intermediary-support",
  },
  {
    slug: "form-8824-preparation",
    title: "Form 8824 Preparation Support",
    shortDescription: "Prepare documentation to support IRS Form 8824 filing requirements.",
    description: `Get Form 8824 preparation support for your 1031 exchange in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}. We help prepare documentation to support IRS Form 8824 filing requirements, including property valuations, boot calculations, and basis tracking. Our support helps ensure accurate tax reporting.`,
    category: "intermediary-support",
  },
];

// Helper to get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// Helper to get related services (excluding current)
export function getRelatedServices(currentSlug: string, limit: number = 4): Service[] {
  const current = getServiceBySlug(currentSlug);
  if (!current) return services.slice(0, limit);
  
  return services
    .filter((s) => s.slug !== currentSlug && s.category === current.category)
    .slice(0, limit);
}

// Helper to search services
export function searchServices(query: string): Service[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return services;
  
  return services.filter((s) => {
    const titleMatch = s.title.toLowerCase().includes(lowerQuery);
    const descMatch = s.shortDescription.toLowerCase().includes(lowerQuery) || s.description.toLowerCase().includes(lowerQuery);
    return titleMatch || descMatch;
  });
}

