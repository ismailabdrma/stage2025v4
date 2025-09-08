export interface User {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  role: "ADMIN" | "CLIENT"
  active: boolean
}

export interface LoginRequest {
  identifier: string
  password: string
}

export interface SignupRequest {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
}

export interface OtpVerifyRequest {
  email: string
  otp: string
}

export interface JwtResponse {
  token: string
  username: string
  email: string
  role: string
}
