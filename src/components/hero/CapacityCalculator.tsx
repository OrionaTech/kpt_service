"use client"

import React, { useMemo } from "react"
import { CraneConfig } from "./CraneViewer"

interface Props {
  selectedConfig: CraneConfig
}

export default function CapacityCalculator({ selectedConfig }: Props) {
  const [span, setSpan] = React.useState<number>(10)
  const [liftHeight, setLiftHeight] = React.useState<number>(6)
  const [hoistPower, setHoistPower] = React.useState<number>(15)

  const factor = useMemo(() => {
    switch (selectedConfig) {
      case "heavy":
        return 1.6
      case "dual-hoist":
        return 1.3
      default:
        return 1
    }
  }, [selectedConfig])

  const capacity = useMemo(() => {
    const base = hoistPower * 100
    const spanPenalty = Math.max(0.6, 1 - (span - 8) * 0.02)
    const heightPenalty = Math.max(0.7, 1 - (liftHeight - 5) * 0.03)
    return Math.round(base * factor * spanPenalty * heightPenalty)
  }, [hoistPower, span, liftHeight, factor])

  return (
    <div className="space-y-4 text-white">
      <h3 className="text-lg font-semibold">Capacity Calculator</h3>

      <label className="block text-sm text-slate-100">
        <span className="flex items-center justify-between">
          <span>Span (m)</span>
          <span className="text-xs text-slate-300">{span} m</span>
        </span>
        <input
          type="range"
          min={4}
          max={30}
          value={span}
          onChange={(e) => setSpan(Number(e.target.value))}
          className="mt-2 w-full accent-primary"
        />
      </label>

      <label className="block text-sm text-slate-100">
        <span className="flex items-center justify-between">
          <span>Lift Height (m)</span>
          <span className="text-xs text-slate-300">{liftHeight} m</span>
        </span>
        <input
          type="range"
          min={2}
          max={20}
          value={liftHeight}
          onChange={(e) => setLiftHeight(Number(e.target.value))}
          className="mt-2 w-full accent-primary"
        />
      </label>

      <label className="block text-sm text-slate-100">
        <span className="flex items-center justify-between">
          <span>Hoist Power (kW)</span>
          <span className="text-xs text-slate-300">{hoistPower} kW</span>
        </span>
        <input
          type="range"
          min={5}
          max={50}
          value={hoistPower}
          onChange={(e) => setHoistPower(Number(e.target.value))}
          className="mt-2 w-full accent-primary"
        />
      </label>

      <div className="mt-1 rounded-xl border border-white/15 bg-white/5 p-4">
        <div className="text-sm text-slate-300">Estimated Safe Working Load</div>
        <div className="mt-1 text-2xl font-bold">{capacity} kg (approx.)</div>
        <div className="mt-1 text-xs uppercase tracking-wide text-slate-400">Configuration: {selectedConfig}</div>
      </div>
    </div>
  )
}
