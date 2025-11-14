import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "./config";

export type Location = {
  slug: string;
  name: string;
  description: string;
};

// Generate 10 location slugs near Oklahoma City that investors recognize
export const locations: Location[] = [
  {
    slug: "oklahoma-city-ok",
    name: "Oklahoma City",
    description: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} is the state capital and largest city in ${PRIMARY_STATE_ABBR}. The metro area offers diverse replacement property options across multifamily, industrial, retail, and office sectors.`,
  },
  {
    slug: "edmond-ok",
    name: "Edmond",
    description: `Edmond, ${PRIMARY_STATE_ABBR} is a northern suburb of ${PRIMARY_CITY} known for strong schools and growing residential and commercial development. Investors find quality replacement properties in retail, office, and multifamily sectors.`,
  },
  {
    slug: "norman-ok",
    name: "Norman",
    description: `Norman, ${PRIMARY_STATE_ABBR} is home to the University of Oklahoma and offers replacement property opportunities in student housing, retail, and office sectors. The city's stable economy supports long-term investment.`,
  },
  {
    slug: "moore-ok",
    name: "Moore",
    description: `Moore, ${PRIMARY_STATE_ABBR} is a southern suburb of ${PRIMARY_CITY} with growing retail and residential development. Investors find replacement properties in retail centers, multifamily, and light industrial sectors.`,
  },
  {
    slug: "yukon-ok",
    name: "Yukon",
    description: `Yukon, ${PRIMARY_STATE_ABBR} is a western suburb of ${PRIMARY_CITY} with strong community growth and commercial development. Replacement property options include retail, office, and multifamily assets.`,
  },
  {
    slug: "midwest-city-ok",
    name: "Midwest City",
    description: `Midwest City, ${PRIMARY_STATE_ABBR} is an eastern suburb of ${PRIMARY_CITY} with established retail corridors and residential neighborhoods. Investors find replacement properties in retail, office, and multifamily sectors.`,
  },
  {
    slug: "bethany-ok",
    name: "Bethany",
    description: `Bethany, ${PRIMARY_STATE_ABBR} is a western suburb of ${PRIMARY_CITY} with growing commercial development. Replacement property opportunities include retail centers, office buildings, and multifamily properties.`,
  },
  {
    slug: "mustang-ok",
    name: "Mustang",
    description: `Mustang, ${PRIMARY_STATE_ABBR} is a southwestern suburb of ${PRIMARY_CITY} with expanding residential and commercial development. Investors find replacement properties in retail, office, and light industrial sectors.`,
  },
  {
    slug: "warr-acres-ok",
    name: "Warr Acres",
    description: `Warr Acres, ${PRIMARY_STATE_ABBR} is a northwestern suburb of ${PRIMARY_CITY} with established retail corridors. Replacement property options include retail centers, office buildings, and multifamily assets.`,
  },
  {
    slug: "nichols-hills-ok",
    name: "Nichols Hills",
    description: `Nichols Hills, ${PRIMARY_STATE_ABBR} is an upscale enclave within ${PRIMARY_CITY} known for luxury residential and commercial properties. Investors find high-quality replacement properties in retail, office, and multifamily sectors.`,
  },
];

// Helper to get location by slug
export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

// Helper to search locations
export function searchLocations(query: string): Location[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return locations;
  
  return locations.filter((l) => {
    const nameMatch = l.name.toLowerCase().includes(lowerQuery);
    const descMatch = l.description.toLowerCase().includes(lowerQuery);
    return nameMatch || descMatch;
  });
}

