import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock } from "lucide-react"

interface PracticeSessionCardProps {
  date: string
  duration: string
  focus: string
  completed: boolean
}

export function PracticeSessionCard({ date, duration, focus, completed }: PracticeSessionCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div className="font-medium">{date}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {duration}
          </div>
        </div>
        <div className="text-lg font-bold mb-1">{focus} Practice</div>
        <div className="flex items-center text-sm">
          {completed ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-500">Completed</span>
            </>
          ) : (
            <span className="text-amber-500">Scheduled</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

