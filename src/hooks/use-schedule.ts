"use client"

import { useState, useEffect } from "react"

export interface ScheduleEventType {
  id: string
  title: string
  date: Date
  type: string
  duration: number
}

export function useSchedule() {
  // In a real app, this would be fetched from an API
  const [events, setEvents] = useState<ScheduleEventType[]>([])

  // Initialize with some sample data
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    const sampleEvents: ScheduleEventType[] = [
      {
        id: "1",
        title: "Morning Practice",
        date: new Date(today.setHours(9, 0, 0, 0)),
        type: "practice",
        duration: 60,
      },
      {
        id: "2",
        title: "Round at City Course",
        date: new Date(tomorrow.setHours(10, 30, 0, 0)),
        type: "round",
        duration: 240,
      },
      {
        id: "3",
        title: "Lesson with Coach",
        date: new Date(nextWeek.setHours(14, 0, 0, 0)),
        type: "lesson",
        duration: 45,
      },
    ]

    setEvents(sampleEvents)
  }, [])

  const addEvent = (event: ScheduleEventType) => {
    setEvents((prev) => [...prev, event])
  }

  const updateEvent = (id: string, updatedEvent: Partial<ScheduleEventType>) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...updatedEvent } : event)))
  }

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  }
}

