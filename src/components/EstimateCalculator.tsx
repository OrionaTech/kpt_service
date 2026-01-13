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
          <input name="capacity" placeholder="Capacity" required className="border rounded px-3 py-2" />
          <input name="span" placeholder="Span" className="border rounded px-3 py-2" />
        </>
      )}

      {estimator === "panel" && (
        <>
          <input name="load" placeholder="Load (kW)" required className="border rounded px-3 py-2" />
          <input name="feeders" placeholder="No. of Feeders" required className="border rounded px-3 py-2" />
        </>
      )}

      <button className="bg-slate-900 text-white rounded px-4 py-2 md:col-span-2">
        Generate Estimate
      </button>

      {result && (
        <div className="md:col-span-2 bg-white p-4 rounded border mt-4">
          <p className="font-semibold">Estimated Cost Range</p>
          <p className="text-lg">
            ₹ {result.min.toLocaleString()} – ₹ {result.max.toLocaleString()}
          </p>
        </div>
      )}
    </form>
  )
}
