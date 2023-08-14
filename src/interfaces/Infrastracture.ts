import { AnaliticsDepartment } from './AnaliticsDepartment'
import { SalesDepartment } from './SalesDepartment'

export interface Infrastructure {
  analiticsDepartment: AnaliticsDepartment
  salesDepartment: SalesDepartment
}
