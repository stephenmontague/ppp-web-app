"use client"

import { useState, useCallback } from "react"
import type { PracticeSession } from "@/types/practice"
import { generatePracticePlan } from "@/lib/practice-plan-generator"
import { useToast } from "@/hooks/use-sonner"

export function usePracticeSession(planId: string) {
  const [session, setSession] = useState<PracticeSession | null>(null)
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const startSession = useCallback(() => {
    setIsLoading(true)

    // In a real app, we would fetch the session data from an API
    // For demo purposes, we'll generate a mock session or use saved ones
    setTimeout(() => {
      try {
        // Mock different practice plans based on ID
        let mockSession: PracticeSession

        if (planId === "weekend-warmup") {
          mockSession = {
            id: "weekend-warmup",
            title: "Weekend Warmup",
            totalDuration: 45,
            segments: [
              {
                area: "Putting",
                duration: 20,
                description: "Focus on 3-6 foot putts. Try to make 20 in a row from 3 feet, then work on 6-footers.",
                color: "#4CAF50",
              },
              {
                area: "Chipping",
                duration: 15,
                description: "Practice bump-and-run shots from just off the green. Focus on landing spot and roll out.",
                color: "#FF9800",
              },
              {
                area: "Pitch Shots",
                duration: 10,
                description: "Work on 30-50 yard pitch shots with different clubs. Focus on distance control.",
                color: "#2196F3",
              },
            ],
            createdAt: new Date().toISOString(),
          }
        } else if (planId === "full-range") {
          mockSession = {
            id: "full-range",
            title: "Full Range Session",
            totalDuration: 90,
            segments: [
              {
                area: "Warm Up",
                duration: 10,
                description: "Start with half-swings using a short iron. Gradually work up to full swings.",
                color: "#9C27B0",
              },
              {
                area: "Driving",
                duration: 20,
                description:
                  "Focus on hitting the fairway. Visualize a fairway and try to hit 7 out of 10 shots within the target area.",
                color: "#F44336",
              },
              {
                area: "Iron Play",
                duration: 30,
                description: "Work on consistent contact with your irons. Practice with 7-iron, 5-iron, and 3-iron.",
                color: "#2196F3",
              },
              {
                area: "Wedge Play",
                duration: 20,
                description: "Practice different distances with your wedges. Focus on 50, 75, and 100 yard shots.",
                color: "#FF9800",
              },
              {
                area: "Trouble Shots",
                duration: 10,
                description: "Practice shots from difficult lies - uphill, downhill, and sidehill.",
                color: "#607D8B",
              },
            ],
            createdAt: new Date().toISOString(),
          }
        } else if (planId === "lunch-break") {
          mockSession = {
            id: "lunch-break",
            title: "Quick Lunch Break",
            totalDuration: 30,
            segments: [
              {
                area: "Putting",
                duration: 15,
                description: "Focus on speed control. Practice lag putts from 20-30 feet.",
                color: "#4CAF50",
              },
              {
                area: "Chipping",
                duration: 15,
                description: "Practice different landing spots with your favorite chipping club.",
                color: "#FF9800",
              },
            ],
            createdAt: new Date().toISOString(),
          }
        } else {
          // Default to a generated plan
          mockSession = generatePracticePlan(60)
          mockSession.id = planId
        }

        setSession(mockSession)
        setCurrentSegmentIndex(0)

        toast({
          title: "Practice Session Started",
          description: `${mockSession.title} - ${mockSession.totalDuration} minutes`,
        })
      } catch (error) {
        console.error("Error starting session:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to start practice session. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }, 1000) // Simulate API delay
  }, [planId, toast])

  const nextSegment = useCallback(() => {
    if (!session) return

    if (currentSegmentIndex < session.segments.length - 1) {
      setCurrentSegmentIndex((prev) => prev + 1)

      // In a real app, we would track progress on the server
      toast({
        title: "Next Segment",
        description: `Moving to: ${session.segments[currentSegmentIndex + 1].area}`,
      })
    } else {
      // End of session
      setCurrentSegmentIndex(-1)

      toast({
        title: "All Segments Complete",
        description: "You've completed all practice segments!",
      })
    }
  }, [session, currentSegmentIndex, toast])

  const completeSession = useCallback(() => {
    // In a real app, we would send completion data to the API
    console.log("Session completed:", planId)

    // Track the completion time, stats, etc.
    const completionData = {
      sessionId: planId,
      completedAt: new Date().toISOString(),
      duration: session?.totalDuration || 0,
    }

    console.log("Completion data:", completionData)
  }, [planId, session])

  const currentSegment = session && currentSegmentIndex >= 0 ? session.segments[currentSegmentIndex] : null

  const progress = {
    completedSegments: currentSegmentIndex,
    totalSegments: session?.segments.length || 0,
    percentage: session ? (currentSegmentIndex / session.segments.length) * 100 : 0,
  }

  return {
    session,
    currentSegment,
    progress,
    startSession,
    nextSegment,
    completeSession,
    isLoading,
  }
}

