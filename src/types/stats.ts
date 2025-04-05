export interface Stats {
	handicap: number
	swingSpeed: number
	strokesGained: StrokesGained
}

export interface StrokesGained {
	offTheTee: number
	approach: number
	aroundTheGreen: number
	putting: number
}

export interface Round {
	date: string
	course: string
	score: number
	teeBox: string
	par: number
}
