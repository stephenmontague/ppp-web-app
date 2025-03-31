"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PracticeTimer } from "@/components/practice/practice-timer"
import { ArrowLeft, CheckCircle, ChevronRight } from "lucide-react"
import { usePracticeSession } from "@/hooks/use-practice-session"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-sonner"

export default function PracticeSessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("planId")
  const { toast } = useToast()

  const { session, currentSegment, progress, startSession, nextSegment, completeSession, isLoading } =
    usePracticeSession(planId || "default")

  const [isActive, setIsActive] = useState(false)
  const [showCompletionAlert, setShowCompletionAlert] = useState(false)

  useEffect(() => {
    startSession()
  }, [startSession])

  const handleComplete = () => {
    completeSession()
    setShowCompletionAlert(true)

    // Show completion message and redirect after a delay
    setTimeout(() => {
      toast({
        title: "Practice Complete!",
        description: "Great job completing your practice session.",
      })
      router.push("/dashboard/practice")
    }, 3000)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <DashboardHeader heading="Practice Session" text="Loading your practice plan..." />
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-48 bg-muted rounded"></div>
            <div className="h-4 w-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-col gap-6">
        <DashboardHeader heading="Practice Session" text="Session not found">
          <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/practice")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practice Plans
          </Button>
        </DashboardHeader>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">The practice session you're looking for couldn't be found.</p>
              <Button onClick={() => router.push("/dashboard/practice")}>Return to Practice Plans</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Practice Session" text={session.title}>
        <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/practice")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Exit Session
        </Button>
      </DashboardHeader>

      {showCompletionAlert ? (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Practice Complete!</AlertTitle>
          <AlertDescription>
            Great job completing your practice session. Redirecting you back to practice plans...
          </AlertDescription>
        </Alert>
      ) : null}

      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Current Activity</CardTitle>
              <CardDescription>
                {progress.completedSegments} of {session.segments.length} activities completed
              </CardDescription>
            </div>
            <Progress value={progress.percentage} className="w-1/3" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentSegment ? (
            <>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{currentSegment.area}</h3>
                <div className="p-4 rounded-lg border-l-4" style={{ borderColor: currentSegment.color }}>
                  <p>{currentSegment.description}</p>
                </div>
              </div>

              <PracticeTimer
                duration={currentSegment.duration * 60}
                isActive={isActive}
                onToggle={() => setIsActive(!isActive)}
                onComplete={nextSegment}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={nextSegment}>
                  Skip
                </Button>
                <Button onClick={nextSegment} className="gap-2">
                  Complete & Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="text-xl font-bold">Practice Complete!</h3>
              <p className="text-muted-foreground">You've completed all activities in this practice session.</p>
              <Button onClick={handleComplete}>Finish Session</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Session Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {session.segments.map((segment, index) => {
              const isCompleted = index < progress.completedSegments
              const isCurrent = index === progress.completedSegments

              return (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-lg border ${
                    isCurrent ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      isCompleted
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : isCurrent
                          ? "bg-primary/20 text-primary"
                          : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-4 w-4" /> : <span>{index + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{segment.area}</div>
                    <div className="text-sm text-muted-foreground">{segment.duration} minutes</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

