import { ref } from 'vue'
import { defineStore } from 'pinia'
import AuthService from '~/services/AuthService'
import type { UserLogIn } from '~/interfaces/UserLogIn'
import type { UserSignUp } from '~/interfaces/UserSignUp'
import { UserInfo } from '~/interfaces/UserInfo'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref('')
  const user = ref<UserInfo>({
    email: '',
    confirmed: false,
    permissions: [],
    role: null
  })

  async function signUp(user: UserSignUp) {
    await AuthService.sighUp(user)
  }

  async function confirmEmail(id: string) {
    await AuthService.confirmEmail(id)
  }

  async function sendConfirmEmail(email: string | null) {
    const confirmEmail = email || user.value.email || ''
    await AuthService.sendConfirmEmail(confirmEmail)
  }

  async function resetRequired(email: string) {
    await AuthService.resetRequired(email)
  }

  async function resetPassword(resetPasswordInfo: {
    id: string
    password: string
    confirmPassword: string
  }) {
    await AuthService.resetPassword(resetPasswordInfo)
  }

  async function logIn(userLogIn: UserLogIn) {
    const { data } = await AuthService.logIn(userLogIn)

    if (!data) {
      throw new Error('Login failed')
    }

    accessToken.value = data.accessToken
    user.value = data.user
  }

  async function logOut() {
    accessToken.value = ''
    user.value = { email: '', confirmed: false, permissions: [], role: null }
  }

  return {
    user,
    accessToken,
    logIn,
    logOut,
    signUp,
    confirmEmail,
    sendConfirmEmail,
    resetRequired,
    resetPassword
  }
})
