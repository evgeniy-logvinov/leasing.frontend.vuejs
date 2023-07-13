import { apiClient } from '../http'
// import type { UserInfoData } from '@/interfaces/UserInfoData'
import type { AuthUser } from '@/interfaces/AuthUser'

export default {
  // getUserInfo() {
  //   return apiClient.get<UserInfoData>('/users/info')
  // },
  // getCaCertificate() {
  //   return apiClient.get<UserInfoData>('/users/ca-certificate')
  // },
  sighUp(user: AuthUser) {
    return apiClient.post<AuthUser>('auth/signup', user)
    // return apiClient.post<AuthUser>('auth/signup', user)
  },
  confirmEmail(id: string) {
    return apiClient.post<string>('auth/confirm-email', { id })
  }
}
