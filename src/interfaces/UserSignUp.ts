import { UserLogIn } from './UserLogIn'

export interface UserSignUp extends UserLogIn {
  confirmPassword: string
}
