"use client";

import { useState } from "react";
import EstimateCalculator from "@/components/EstimateCalculator";
import GenerateQuotationButton from "@/components/GenerateQuotationButton";

type Props = {
  estimator: "eot" | "gantry" | "panel";
  productSlug: string;
  productName: string;
};

export default function ProductEstimateSection({
  estimator,
  productSlug,
  productName,
}: Props) {
  const [estimate, setEstimate] = useState<any>(null);

  return (
    <section className="mt-14 bg-slate-100 p-6 rounded-lg">
      <h2 className="font-heading text-2xl font-semibold mb-2">
        Get Estimated Cost
      </h2>

      <EstimateCalculator
        estimator={estimator}
        onEstimate={setEstimate}
      />

      <GenerateQuotationButton
        productSlug={productSlug}
        productName={productName}
        estimate={estimate}
      />
    </section>
  );
}
