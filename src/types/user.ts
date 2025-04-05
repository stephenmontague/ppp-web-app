import { Stats } from "./stats"

export interface UserDTO {
	id: number
	username: string
	email: string
	stats: Stats
}
