import { apiClient } from '~/http'
import type { UserSignUp } from '~/interfaces/UserSignUp'
import type { UserLogIn } from '~/interfaces/UserLogIn'
import { UserInfo } from '~/interfaces/UserInfo'
import { AxiosResponse } from 'axios'

export default {
  sighUp(user: UserSignUp) {
    return apiClient.post<UserSignUp>('auth/signup', user)
  },
  logIn(user: UserLogIn) {
    return apiClient.post<UserLogIn, AxiosResponse<{ accessToken: string; user: UserInfo }>>(
      'auth/login',
      user
    )
  },
  confirmEmail(id: string) {
    return apiClient.post<string>('auth/confirm-email', { id })
  },
  sendConfirmEmail(email: string) {
    return apiClient.post<string>('auth/send-confirm-email', { email })
  },
  resetRequired(email: string) {
    return apiClient.post<string>('auth/reset-required', { email })
  },
  resetPassword(resetPasswordInfo: { id: string; password: string; confirmPassword: string }) {
    return apiClient.post<string>('auth/reset-password', resetPasswordInfo)
  }
}
