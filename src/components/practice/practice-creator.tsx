"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { generatePracticePlan } from "@/lib/practice-plan-generator"
import type { PracticeSession } from "@/types/practice"

interface PracticeCreatorProps {
  onComplete?: (plan: PracticeSession) => void
}

export function PracticeCreator({ onComplete }: PracticeCreatorProps) {
  const [availableTime, setAvailableTime] = useState(60)
  const [generatedPlan, setGeneratedPlan] = useState<PracticeSession | null>(null)
  const [customTitle, setCustomTitle] = useState("")

  const handleCreatePlan = () => {
    const plan = generatePracticePlan(availableTime)

    // If user provided a custom title, use it
    if (customTitle) {
      plan.title = customTitle
    }

    setGeneratedPlan(plan)
  }

  const handleStartPractice = () => {
    if (generatedPlan && onComplete) {
      onComplete(generatedPlan)
    }
  }

  const handleSavePlan = () => {
    if (generatedPlan && onComplete) {
      // In a real app, we would save this plan to the user's saved plans
      onComplete(generatedPlan)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="plan-title">Plan Title (Optional)</Label>
          <Input
            id="plan-title"
            placeholder="My Custom Practice Plan"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="available-time">Available Time (minutes)</Label>
          <div className="flex items-center gap-4 mt-2">
            <Slider
              id="available-time"
              min={15}
              max={180}
              step={5}
              value={[availableTime]}
              onValueChange={(value) => setAvailableTime(value[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={availableTime}
              onChange={(e) => setAvailableTime(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>

        <Button onClick={handleCreatePlan} className="w-full">
          Generate Practice Plan
        </Button>
      </div>

      {generatedPlan && (
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-bold">
            {generatedPlan.title} ({availableTime} minutes)
          </h3>

          <div className="space-y-4">
            {generatedPlan.segments.map((segment, index) => (
              <div key={index} className="border-l-4 pl-4 py-2" style={{ borderColor: segment.color }}>
                <div className="font-medium">{segment.area}</div>
                <div className="text-sm text-muted-foreground">{segment.duration} minutes</div>
                <div className="text-sm mt-1">{segment.description}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleSavePlan}>
              Save Plan
            </Button>
            <Button className="flex-1" onClick={handleStartPractice}>
              Start Practice
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

