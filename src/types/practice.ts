export interface PracticeSegment {
	area: string
	description: string
	duration: number
	color: string
}

export interface PracticeSession {
	id: string
	title: string
	totalDuration: number
	segments: PracticeSegment[]
	createdAt: string
}
