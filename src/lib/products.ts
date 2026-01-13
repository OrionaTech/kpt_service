// src/lib/products.ts

export type Product = {
  id: string
  slug: string
  name: string
  category: string
  shortDescription: string
  description: string
  applications: string[]
  features: string[]
  images: string[]          // 🔥 slider-ready
  estimator: "eot" | "gantry" | "panel" // 🔥 for future calculators
}

export const products: Product[] = [
  // ===== EOT CRANES =====
  {
    id: "eot-single",
    slug: "single-girder-eot-crane",
    name: "Single Girder EOT Crane",
    category: "EOT Cranes",
    shortDescription: "Cost-effective crane for light to medium duty applications.",
    description:
      "Single Girder EOT Cranes are designed for efficient material handling in workshops, warehouses, and factories. They are lightweight, economical, and easy to maintain.",
    applications: ["Manufacturing units", "Warehouses", "Small fabrication shops"],
    features: [
      "Compact design",
      "Low headroom requirement",
      "Smooth operation",
      "Easy installation",
    ],
    images: [
       "/products/single-girder-eot-cranes.jpg"
    ],
    estimator: "eot",
  },

  {
    id: "eot-double",
    slug: "double-girder-eot-crane",
    name: "Double Girder EOT Crane",
    category: "EOT Cranes",
    shortDescription: "Heavy-duty crane for higher capacities and spans.",
    description:
      "Double Girder EOT Cranes are ideal for heavy-duty operations requiring higher lifting capacity and longer spans.",
    applications: ["Steel plants", "Heavy engineering units"],
    features: ["High lifting capacity", "Robust construction", "Long service life"],
    images: [
      "/products/double-girder-eot-cranes-1.jpg",
    ],
    estimator: "eot",
  },

  {
    id: "goliath",
    slug: "goliath-crane",
    name: "Goliath Crane",
    category: "Gantry Cranes",
    shortDescription: "Outdoor crane solution for yards and large assemblies.",
    description:
      "Goliath cranes are widely used in shipyards, construction sites, and heavy assembly yards.",
    applications: ["Shipyards", "Construction yards"],
    features: ["Outdoor duty design", "High stability", "Heavy load handling"],
    images: [
      "/products/goliath.jpg"
    ],
    estimator: "gantry",
  },

  {
    id: "jib",
    slug: "jib-crane",
    name: "Jib Crane",
    category: "EOT Cranes",
    shortDescription: "Flexible lifting solution for localized areas.",
    description:
      "Jib cranes provide efficient lifting for workstations and assembly lines with minimal space requirements.",
    applications: ["Workstations", "Assembly lines"],
    features: ["360° rotation", "Space saving design", "Easy operation"],
    images: [
      "/products/jib-crane.jpg"
    ],
    estimator: "eot",
  },

  // ===== ELECTRICAL PANELS =====
  {
    id: "pcc",
    slug: "pcc-panel",
    name: "PCC Panel",
    category: "Electrical Panels",
    shortDescription: "Power Control Centre for reliable power distribution.",
    description:
      "PCC Panels are designed to control and distribute electrical power efficiently across industrial setups.",
    applications: ["Factories", "Industrial plants"],
    features: ["High safety", "Reliable performance", "Robust enclosure"],
    images: [
      "/products/electric-pcc-panel.jpg"
    ],
    estimator: "panel",
  },

  {
    id: "mcc",
    slug: "mcc-panel",
    name: "MCC Panel",
    category: "Electrical Panels",
    shortDescription: "Motor Control Centre for motor operations.",
    description:
      "MCC Panels control and protect electric motors in industrial applications with centralized control.",
    applications: ["Process industries", "Manufacturing plants"],
    features: ["Motor protection", "Centralized control", "Easy maintenance"],
    images: [
      "/products/mcc-panels.jpg"
    ],
    estimator: "panel",
  },

  {
    id: "plc",
    slug: "plc-panel",
    name: "PLC Panel",
    category: "Electrical Panels",
    shortDescription: "Automation-ready PLC control panel.",
    description:
      "PLC panels are used for automation and process control in modern industrial systems.",
    applications: ["Automation systems", "Smart factories"],
    features: ["High automation", "Flexible programming", "Remote monitoring"],
    images: [
      "/products/plc-panel.jpg"
    ],
    estimator: "panel",
  },

  {
    id: "apfc",
    slug: "apfc-panel",
    name: "APFC Panel",
    category: "Electrical Panels",
    shortDescription: "Automatic Power Factor Correction panel.",
    description:
      "APFC panels improve power factor efficiency and reduce electricity penalties.",
    applications: ["Power management", "Industrial plants"],
    features: ["Energy efficient", "Automatic correction", "Low losses"],
    images: [
      "/products/apfc-panel.png"
    ],
    estimator: "panel",
  },
]

/* Helpers */
export const getAllProducts = () => products

export const getAllCategories = () =>
  [...new Set(products.map((p) => p.category))]

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category)

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug)
