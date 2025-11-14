import type { InventoryCategory } from "./types";

export const inventoryCategories: InventoryCategory[] = [
  {
    slug: "nnn",
    name: "NNN Properties",
    route: "/inventory/nnn",
    note: "Single tenant net lease properties available nationwide for 1031 exchange replacement.",
  },
  {
    slug: "stnl",
    name: "STNL Properties",
    route: "/inventory/stnl",
    note: "Single tenant net lease retail properties with credit tenants.",
  },
  {
    slug: "multifamily",
    name: "Multifamily Properties",
    route: "/inventory/multifamily",
    note: "Garden apartments, mid-rise, and workforce housing assets.",
  },
  {
    slug: "industrial",
    name: "Industrial Properties",
    route: "/inventory/industrial",
    note: "Warehouse, distribution, and flex industrial properties.",
  },
  {
    slug: "dst",
    name: "DST Interests",
    route: "/inventory/dst",
    note: "Delaware Statutory Trust interests may be securities. We do not sell securities. We provide introductions to licensed providers only.",
  },
];

