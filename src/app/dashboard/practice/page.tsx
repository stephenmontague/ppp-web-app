"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PracticeCreator } from "@/components/practice/practice-creator"
import { PracticePlanCard } from "@/components/practice/practice-plan-card"
import { Plus, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-sonner"

export default function PracticePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreatePlan = () => {
    setIsCreateDialogOpen(true)
  }

  const handleQuickStart = (duration: number) => {
    // Generate a quick practice plan and start it
    toast({
      title: "Creating Practice Plan",
      description: `Generating a ${duration}-minute practice plan...`,
    })

    // Simulate a brief delay before redirecting
    setTimeout(() => {
      router.push(`/dashboard/practice/session?planId=quick-${duration}`)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Practice Plans" text="Create and manage your golf practice plans">
        <Button onClick={handleCreatePlan}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </DashboardHeader>

      {/* Quick Practice Card - Now at the top level */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Practice</CardTitle>
          <CardDescription>Start a practice session based on your available time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="font-medium">How much time do you have?</div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => handleQuickStart(30)}>
                30 min
              </Button>
              <Button variant="outline" onClick={() => handleQuickStart(60)}>
                1 hour
              </Button>
              <Button variant="outline" onClick={() => handleQuickStart(90)}>
                90 min
              </Button>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(true)}>
                Custom
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="saved" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="saved" className="flex-1">
            Saved Plans
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex-1">
            Recent
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex-1">
            AI Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PracticePlanCard
              id="weekend-warmup"
              title="Weekend Warmup"
              duration="45 min"
              focus={["Putting", "Short Game"]}
              lastUsed="2 days ago"
            />
            <PracticePlanCard
              id="full-range"
              title="Full Range Session"
              duration="90 min"
              focus={["Full Swing", "Driving", "Approach"]}
              lastUsed="1 week ago"
            />
            <PracticePlanCard
              id="lunch-break"
              title="Quick Lunch Break"
              duration="30 min"
              focus={["Putting", "Chipping"]}
              lastUsed="3 days ago"
            />
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Practice Sessions</CardTitle>
              <CardDescription>Quickly repeat your recent practice sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                      <Clock className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <div className="font-medium">60 Minute Practice</div>
                      <div className="text-sm text-muted-foreground">2 days ago</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleQuickStart(60)}>
                    Repeat
                  </Button>
                </div>

                <div className="flex justify-between items-center border-b pb-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                      <Clock className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <div className="font-medium">30 Minute Practice</div>
                      <div className="text-sm text-muted-foreground">5 days ago</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleQuickStart(30)}>
                    Repeat
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                      <Clock className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                    </div>
                    <div>
                      <div className="font-medium">90 Minute Full Range</div>
                      <div className="text-sm text-muted-foreground">1 week ago</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleQuickStart(90)}>
                    Repeat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Practice Recommendations</CardTitle>
              <CardDescription>Get personalized practice plans based on your stats and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Based on your recent stats, we recommend focusing on these areas:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Putting Improvement</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">
                        Your putting stats show you're losing the most strokes on the green. Focus on 6-10 foot putts.
                      </p>
                    </CardContent>
                    <CardContent className="pt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => router.push(`/dashboard/practice/session?planId=ai-putting`)}
                      >
                        Start Plan
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Approach Shot Precision</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">Work on 100-150 yard approach shots to improve your GIR percentage.</p>
                    </CardContent>
                    <CardContent className="pt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => router.push(`/dashboard/practice/session?planId=ai-approach`)}
                      >
                        Start Plan
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Custom Practice Plan</DialogTitle>
            <DialogDescription>Customize your practice plan based on your needs and available time</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <PracticeCreator
              onComplete={(plan) => {
                setIsCreateDialogOpen(false)
                // In a real app, we would save the plan and then navigate
                toast({
                  title: "Practice Plan Created",
                  description: `${plan.title} - ${plan.totalDuration} minutes`,
                })
                router.push(`/dashboard/practice/session?planId=${plan.id}`)
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

