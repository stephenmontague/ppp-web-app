import { Round, Stats, StrokesGained } from "./stats"

export interface UserDTO {
	id: number
	username: string
	email: string
	stats: Stats
	rounds: Round[]
}
