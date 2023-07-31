import { apiClient } from '~/http'
import type { UserSignUp } from '~/interfaces/UserSignUp'
import type { UserLogIn } from '~/interfaces/UserLogIn'
import { UserInfo } from '~/interfaces/UserInfo'
import { AxiosResponse } from 'axios'

export default {
  url: 'auth',
  sighUp(user: UserSignUp) {
    return apiClient.post<UserSignUp>(`${this.url}/signup`, user)
  },
  logIn(user: UserLogIn) {
    return apiClient.post<UserLogIn, AxiosResponse<{ accessToken: string; user: UserInfo }>>(
      `${this.url}/login`,
      user
    )
  },
  confirmEmail(id: string) {
    return apiClient.post<string>(`${this.url}/confirm-email`, { id })
  },
  sendConfirmEmail(email: string) {
    return apiClient.post<string>(`${this.url}/send-confirm-email`, { email })
  },
  resetRequired(email: string) {
    return apiClient.post<string>(`${this.url}/reset-required`, { email })
  },
  resetPassword(resetPasswordInfo: { id: string; password: string; confirmPassword: string }) {
    return apiClient.post<string>(`${this.url}/reset-password`, resetPasswordInfo)
  }
}
