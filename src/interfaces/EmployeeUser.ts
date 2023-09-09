import { Employee } from './Employee'

export interface EmployeeUser extends Employee {
  user: { email: string }
}
