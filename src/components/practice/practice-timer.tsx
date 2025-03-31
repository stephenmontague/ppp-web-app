"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw } from "lucide-react"
import { formatTime } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface PracticeTimerProps {
  duration: number // in seconds
  isActive: boolean
  onToggle: () => void
  onComplete: () => void
}

export function PracticeTimer({ duration, isActive, onToggle, onComplete }: PracticeTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  const resetTimer = useCallback(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    resetTimer()
  }, [duration, resetTimer])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            if (interval) clearInterval(interval)
            onComplete()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (!isActive && interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, onComplete])

  const progress = ((duration - timeLeft) / duration) * 100

  return (
    <Card className="w-full p-6 text-center">
      <div className="text-5xl font-bold mb-4 font-mono">{formatTime(timeLeft)}</div>

      <Progress value={progress} className="h-2 mb-6" />

      <div className="flex justify-center gap-4">
        <Button variant="outline" size="icon" onClick={resetTimer}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button size="lg" onClick={onToggle} className="w-32">
          {isActive ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Start
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}

