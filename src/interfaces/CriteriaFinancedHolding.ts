import { Ip } from './Ip'
import { Legal } from './Legal'

export interface CriteriaFinancedHolding {
  maxCountOfMonth: number
  ip: Ip
  legal: Legal
}
