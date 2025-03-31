"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, GlobeIcon as GolfBall, Pencil, Trash2, User } from "lucide-react"

interface ScheduleEventProps {
  title: string
  type: string
  date?: string
  time: string
  duration: number
  onEdit?: () => void
  onDelete?: () => void
}

export function ScheduleEvent({ title, type, date, time, duration, onEdit, onDelete }: ScheduleEventProps) {
  // Determine icon based on event type
  const getIcon = () => {
    switch (type) {
      case "practice":
        return <GolfBall className="h-5 w-5" />
      case "round":
        return <Calendar className="h-5 w-5" />
      case "lesson":
        return <User className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  // Determine color based on event type
  const getColor = () => {
    switch (type) {
      case "practice":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "round":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "lesson":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-stretch">
          <div className={`flex items-center justify-center p-4 ${getColor()}`}>{getIcon()}</div>
          <div className="flex-1 p-4">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">
              {date && <span className="mr-2">{date}</span>}
              <span>{time}</span> • {duration} min
            </div>
          </div>
          <div className="flex items-center p-2 gap-1">
            {onEdit && (
              <Button variant="ghost" size="icon" onClick={onEdit}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="icon" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

