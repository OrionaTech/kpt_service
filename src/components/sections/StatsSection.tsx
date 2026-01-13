"use client"

import { useMemo } from "react"
import { Group } from "@visx/group"
import { Bar } from "@visx/shape"
import { scaleBand, scaleLinear } from "@visx/scale"
import { AxisBottom, AxisLeft } from "@visx/axis"

const stats = [
  { label: "Projects", value: 200, color: "oklch(0.55 0.18 35)" },
  { label: "Clients", value: 50, color: "oklch(0.45 0.12 240)" },
  { label: "Years", value: 25, color: "oklch(0.55 0.18 35)" },
  { label: "Countries", value: 2, color: "oklch(0.45 0.12 240)" },
]

const chartData = [
  { year: "2019", value: 350 },
  { year: "2020", value: 420 },
  { year: "2021", value: 480 },
  { year: "2022", value: 550 },
  { year: "2023", value: 620 },
  { year: "2024", value: 700 },
]

const width = 600
const height = 300
const margin = { top: 20, right: 20, bottom: 40, left: 60 }

export function StatsSection() {
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        domain: chartData.map((d) => d.year),
        padding: 0.3,
      }),
    [xMax]
  )

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        domain: [0, Math.max(...chartData.map((d) => d.value)) + 100],
      }),
    [yMax]
  )

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Track Record
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Numbers that speak for our commitment and excellence
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-slate-50 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.value.toLocaleString()}+
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="bg-slate-50 rounded-lg p-8 overflow-x-auto">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              Projects Completed (Last 6 Years)
            </h3>
            <svg width={width} height={height}>
              <Group left={margin.left} top={margin.top}>
                {chartData.map((d) => {
                  const barWidth = xScale.bandwidth()
                  const barHeight = yMax - (yScale(d.value) ?? 0)
                  const barX = xScale(d.year)
                  const barY = yMax - barHeight

                  return (
                    <Bar
                      key={d.year}
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill="oklch(0.55 0.18 35)"
                      rx={4}
                    />
                  )
                })}
                <AxisLeft
                  scale={yScale}
                  stroke="#64748b"
                  tickStroke="#64748b"
                  tickLabelProps={{
                    fill: "#64748b",
                    fontSize: 12,
                    textAnchor: "end",
                    dy: "0.33em",
                  }}
                />
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  stroke="#64748b"
                  tickStroke="#64748b"
                  tickLabelProps={{
                    fill: "#64748b",
                    fontSize: 12,
                    textAnchor: "middle",
                  }}
                />
              </Group>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
