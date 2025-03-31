"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Round 1",
    score: 92,
  },
  {
    name: "Round 2",
    score: 89,
  },
  {
    name: "Round 3",
    score: 91,
  },
  {
    name: "Round 4",
    score: 87,
  },
  {
    name: "Round 5",
    score: 90,
  },
  {
    name: "Round 6",
    score: 88,
  },
  {
    name: "Round 7",
    score: 85,
  },
  {
    name: "Round 8",
    score: 86,
  },
  {
    name: "Round 9",
    score: 84,
  },
  {
    name: "Round 10",
    score: 83,
  },
]

export function ScoreHistoryChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          domain={["dataMin - 5", "dataMax + 5"]}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">{payload[0].name}</span>
                      <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#f43f5e"
          strokeWidth={2}
          activeDot={{ r: 6, style: { fill: "#f43f5e", opacity: 0.8 } }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

