export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  specifications: {
    capacity?: string;
    span?: string;
    reach?: string;
    liftingHeight?: string;
    liftingSpeed?: string;
    powerSupply: string;
    control: string;
  };
  features: string[];
  image: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  icon: string;
}

