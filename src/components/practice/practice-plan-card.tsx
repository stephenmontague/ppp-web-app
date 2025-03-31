"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PracticePlanCardProps {
  id: string
  title: string
  duration: string
  focus: string[]
  lastUsed: string
  onEdit?: () => void
}

export function PracticePlanCard({ id, title, duration, focus, lastUsed, onEdit }: PracticePlanCardProps) {
  const router = useRouter()

  const handleStart = () => {
    router.push(`/dashboard/practice/session?planId=${id}`)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div className="text-lg font-bold">{title}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {duration}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {focus.map((area, index) => (
            <Badge key={index} variant="secondary">
              {area}
            </Badge>
          ))}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          Last used: {lastUsed}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button size="sm" className="flex-1" onClick={handleStart}>
          Start
        </Button>
      </CardFooter>
    </Card>
  )
}

