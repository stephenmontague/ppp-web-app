"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

interface Round {
  id: string
  date: string
  course: string
  score: number
  putts: number
  fairways: number
  gir: number
}

const rounds: Round[] = [
  {
    id: "1",
    date: "2023-06-15",
    course: "Pine Valley Golf Club",
    score: 92,
    putts: 36,
    fairways: 5,
    gir: 4,
  },
  {
    id: "2",
    date: "2023-06-22",
    course: "Oakmont Country Club",
    score: 89,
    putts: 34,
    fairways: 6,
    gir: 5,
  },
  {
    id: "3",
    date: "2023-07-01",
    course: "Pebble Beach Golf Links",
    score: 91,
    putts: 35,
    fairways: 7,
    gir: 6,
  },
  {
    id: "4",
    date: "2023-07-08",
    course: "Augusta National",
    score: 87,
    putts: 32,
    fairways: 8,
    gir: 7,
  },
  {
    id: "5",
    date: "2023-07-15",
    course: "St Andrews Links",
    score: 90,
    putts: 33,
    fairways: 6,
    gir: 5,
  },
  {
    id: "6",
    date: "2023-07-22",
    course: "Winged Foot Golf Club",
    score: 88,
    putts: 31,
    fairways: 7,
    gir: 6,
  },
  {
    id: "7",
    date: "2023-07-29",
    course: "Shinnecock Hills",
    score: 85,
    putts: 30,
    fairways: 9,
    gir: 8,
  },
  {
    id: "8",
    date: "2023-08-05",
    course: "Merion Golf Club",
    score: 86,
    putts: 31,
    fairways: 8,
    gir: 7,
  },
  {
    id: "9",
    date: "2023-08-12",
    course: "Cypress Point Club",
    score: 84,
    putts: 29,
    fairways: 10,
    gir: 9,
  },
  {
    id: "10",
    date: "2023-08-19",
    course: "Riviera Country Club",
    score: 83,
    putts: 28,
    fairways: 11,
    gir: 10,
  },
]

export function RoundHistoryTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter rounds based on search query
  const filteredRounds = rounds.filter((round) => round.course.toLowerCase().includes(searchQuery.toLowerCase()))

  // Calculate pagination
  const totalPages = Math.ceil(filteredRounds.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedRounds = filteredRounds.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1) // Reset to first page on new search
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Putts</TableHead>
              <TableHead className="text-right">Fairways</TableHead>
              <TableHead className="text-right">GIR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRounds.map((round) => (
              <TableRow key={round.id}>
                <TableCell>
                  {new Date(round.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>{round.course}</TableCell>
                <TableCell className="text-right">{round.score}</TableCell>
                <TableCell className="text-right">{round.putts}</TableCell>
                <TableCell className="text-right">{round.fairways}/14</TableCell>
                <TableCell className="text-right">{round.gir}/18</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

