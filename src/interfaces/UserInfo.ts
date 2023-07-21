import { PermissionEnum } from '~/enums/PermissionEnum'
import { RoleEnum } from '~/enums/RoleEnum'

export interface UserInfo {
  role: RoleEnum | null
  permissions: PermissionEnum[]
  confirmed: boolean
  email: string | null
}
