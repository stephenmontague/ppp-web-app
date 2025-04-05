import type { PracticeSession, PracticeSegment } from "@/types/practice"

// This is a simplified implementation for demonstration purposes
// In a real app, this would use the user's stats to generate a more personalized plan

export function generatePracticePlan(availableTime: number): PracticeSession {
	// Mock data - in a real app, this would be based on user's stats
	const strokesGained = {
		offTee: -1.2,
		approach: -2.5,
		aroundGreen: -1.8,
		putting: -3.1
	}

	// Calculate total strokes lost
	const totalStrokesLost =
		Math.abs(strokesGained.offTee) +
		Math.abs(strokesGained.approach) +
		Math.abs(strokesGained.aroundGreen) +
		Math.abs(strokesGained.putting)

	// Calculate time allocation based on strokes gained
	const puttingTime = Math.round((Math.abs(strokesGained.putting) / totalStrokesLost) * availableTime)
	const approachTime = Math.round((Math.abs(strokesGained.approach) / totalStrokesLost) * availableTime)
	const aroundGreenTime = Math.round((Math.abs(strokesGained.aroundGreen) / totalStrokesLost) * availableTime)
	const offTeeTime = Math.round((Math.abs(strokesGained.offTee) / totalStrokesLost) * availableTime)

	// Ensure minimum time for each segment
	const minTime = 5
	const segments: PracticeSegment[] = []

	if (puttingTime >= minTime) {
		segments.push({
			area: "Putting",
			duration: puttingTime,
			description:
				"Focus on 6-10 foot putts. Try to make 20 in a row from 3 feet, then work on distance control from 20-30 feet.",
			color: "#4CAF50" // green
		})
	}

	if (approachTime >= minTime) {
		segments.push({
			area: "Approach Shots",
			duration: approachTime,
			description: "Practice 100-150 yard shots. Focus on consistent contact and distance control.",
			color: "#2196F3" // blue
		})
	}

	if (aroundGreenTime >= minTime) {
		segments.push({
			area: "Short Game",
			duration: aroundGreenTime,
			description: "Work on chip shots from different lies. Practice bump-and-run and high flop shots.",
			color: "#FF9800" // orange
		})
	}

	if (offTeeTime >= minTime) {
		segments.push({
			area: "Driving",
			duration: offTeeTime,
			description:
				"Focus on hitting the fairway. Visualize a fairway and try to hit 7 out of 10 shots within the target area.",
			color: "#F44336" // red
		})
	}

	// Adjust times if needed to match total available time
	const totalTime = segments.reduce((sum, segment) => sum + segment.duration, 0)
	if (totalTime < availableTime) {
		// Add the remaining time to the segment with the worst strokes gained
		const worstSegment = segments.find((segment) => segment.area === "Putting")
		if (worstSegment) {
			worstSegment.duration += availableTime - totalTime
		}
	}

	return {
		id: `session-${Date.now()}`,
		title: `${availableTime} Minute Practice Plan`,
		totalDuration: availableTime,
		segments,
		createdAt: new Date().toISOString()
	}
}
