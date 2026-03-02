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
    <section className="industrial-card mt-14 border border-[#2c2c2c] p-6 md:p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">Quick Pricing</p>
      <h2 className="font-heading mb-2 text-3xl font-semibold text-[var(--bright)]">
        Get Estimated Cost
      </h2>
      <p className="text-sm text-[var(--steel)]">
        Enter the core parameters below to get an indicative project range.
      </p>

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
