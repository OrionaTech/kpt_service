"use client"

import { useState } from "react"

type EstimateResult = {
  inputs: Record<string, number>
  result: { min: number; max: number }
}

type Props = {
  estimator: "eot" | "gantry" | "panel"
  onEstimate?: (data: EstimateResult) => void
}

export default function EstimateCalculator({ estimator, onEstimate }: Props) {
  const [result, setResult] =
    useState<EstimateResult["result"] | null>(null)

  function calculate(formData: FormData) {
    let base = 0
    const inputs: Record<string, number> = {}

    if (estimator === "eot") {
      inputs.capacity = Number(formData.get("capacity"))
      inputs.span = Number(formData.get("span"))
      base = inputs.capacity * 90000 + inputs.span * 12000
    }

    if (estimator === "gantry") {
      inputs.capacity = Number(formData.get("capacity"))
      base = inputs.capacity * 110000
    }

    if (estimator === "panel") {
      inputs.load = Number(formData.get("load"))
      inputs.feeders = Number(formData.get("feeders"))
      base = inputs.load * 4500 + inputs.feeders * 3000
    }

    const computed = {
      min: Math.round(base * 0.9),
      max: Math.round(base * 1.15),
    }

    setResult(computed)

    onEstimate?.({
      inputs,
      result: computed,
    })
  }

  return (
    <form action={calculate} className="grid md:grid-cols-2 gap-4 mt-6">
      {estimator !== "panel" && (
        <>
          <input
            name="capacity"
            placeholder="Capacity (Ton)"
            required
            className="border-0 border-b border-[#3a3a3a] bg-transparent px-0 py-2 text-[var(--bright)] placeholder:text-[var(--steel)] focus:border-[var(--accent)] focus:outline-none"
          />
          <input
            name="span"
            placeholder="Span (Meter)"
            className="border-0 border-b border-[#3a3a3a] bg-transparent px-0 py-2 text-[var(--bright)] placeholder:text-[var(--steel)] focus:border-[var(--accent)] focus:outline-none"
          />
        </>
      )}

      {estimator === "panel" && (
        <>
          <input
            name="load"
            placeholder="Load (kW)"
            required
            className="border-0 border-b border-[#3a3a3a] bg-transparent px-0 py-2 text-[var(--bright)] placeholder:text-[var(--steel)] focus:border-[var(--accent)] focus:outline-none"
          />
          <input
            name="feeders"
            placeholder="No. of Feeders"
            required
            className="border-0 border-b border-[#3a3a3a] bg-transparent px-0 py-2 text-[var(--bright)] placeholder:text-[var(--steel)] focus:border-[var(--accent)] focus:outline-none"
          />
        </>
      )}

      <button className="shimmer-btn md:col-span-2 mt-2 border border-[var(--accent)] bg-[var(--accent)] px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-[#1c1204] transition hover:bg-[#f1b84f]">
        Generate Estimate
      </button>

      {result && (
        <div className="md:col-span-2 mt-4 border border-[#343434] bg-[#121212] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--steel)]">
            Estimated Cost Range
          </p>
          <p className="mt-1 text-xl font-semibold text-[var(--accent)]">
            ₹ {result.min.toLocaleString()} – ₹ {result.max.toLocaleString()}
          </p>
        </div>
      )}
    </form>
  )
}
