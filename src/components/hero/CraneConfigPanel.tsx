"use client"

import React from "react"
import { CraneConfig } from "./CraneViewer"

interface Props {
  selectedConfig: CraneConfig
  onSelect: (cfg: CraneConfig) => void
}

export default function CraneConfigPanel({ selectedConfig, onSelect }: Props) {
  const options: { key: CraneConfig; label: string; desc: string }[] = [
    { key: "standard", label: "Standard", desc: "Balanced performance" },
    { key: "heavy", label: "Heavy Duty", desc: "Higher capacity" },
    { key: "dual-hoist", label: "Dual Hoist", desc: "Two lifting points" },
  ]

  return (
    <div className="space-y-4 text-white">
      <h3 className="text-lg font-semibold">Configurations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {options.map((o) => {
          const active = selectedConfig === o.key
          return (
            <button
              key={o.key}
              onClick={() => onSelect(o.key)}
              className={`rounded-xl border px-3 py-3 text-left transition-all ${
                active
                  ? "border-transparent bg-primary text-white shadow-[0_10px_24px_rgba(249,115,22,0.35)]"
                  : "border-white/20 bg-white/5 text-white/90 hover:border-white/40 hover:bg-white/10"
              }`}
            >
              <div className="text-sm font-semibold">{o.label}</div>
              <div className={`text-xs ${active ? "text-white/90" : "text-slate-300"}`}>{o.desc}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
