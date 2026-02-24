export interface IUser {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  stripeCustomerId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface IUserCreate {
  name: string
  email: string
  password: string
}

export interface IUserSession {
  id: string
  email: string
  name: string | null
}
