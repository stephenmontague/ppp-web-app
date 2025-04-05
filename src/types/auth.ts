import { UserDTO } from "./user"

export interface AuthRequestDTO {
	email: string
	password: string
}

export interface AuthResponseDTO {
	accessToken?: string
	refreshToken?: string
	expiresIn?: number
	refreshTokenExpiresIn?: number
	user?: UserDTO
	message?: string
}

export interface RegisterRequestDTO {
	name: string
	email: string
	password: string
}
