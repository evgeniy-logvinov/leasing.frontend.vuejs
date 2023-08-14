import { Employee } from './Employee'
import { Manager } from './Manager'

export interface CityManager {
  head: Employee
  manager: Manager[]
}
