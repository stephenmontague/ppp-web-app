"use client"

import { Progress } from "@/components/ui/progress"

interface StatItemProps {
  label: string
  value: number
  max: number
  unit: string
  color: string
}

function StatItem({ label, value, max, unit, color }: StatItemProps) {
  const percentage = (value / max) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          {value} {unit}
        </span>
      </div>
      <Progress value={percentage} className={`h-2 ${color}`} />
    </div>
  )
}

export function StatsBreakdown() {
  return (
    <div className="space-y-4">
      <StatItem label="Driving Accuracy" value={42} max={100} unit="%" color="bg-blue-500" />
      <StatItem label="Greens in Regulation" value={28} max={100} unit="%" color="bg-green-500" />
      <StatItem label="Putts per Round" value={34} max={45} unit="" color="bg-red-500" />
      <StatItem label="Sand Saves" value={15} max={100} unit="%" color="bg-yellow-500" />
      <StatItem label="Scrambling" value={30} max={100} unit="%" color="bg-purple-500" />
    </div>
  )
}

