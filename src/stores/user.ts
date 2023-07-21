import { ref } from 'vue'
import { defineStore } from 'pinia'
import UsersService from '~/services/UsersService'
import type { UserLogIn } from '~/interfaces/UserLogIn'
import type { UserSignUp } from '~/interfaces/UserSignUp'
import { UserInfo } from '~/interfaces/UserInfo'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const user = ref<UserInfo>({
    email: '',
    confirmed: false,
    permissions: [],
    role: null
  })

  async function signUp(user: UserSignUp) {
    // TODO: remove token when signup
    await UsersService.sighUp(user)
  }

  async function confirmEmail(id: string) {
    await UsersService.confirmEmail(id)
  }

  async function sendConfirmEmail(email: string | null) {
    const confirmEmail = email || user.value.email || ''
    await UsersService.sendConfirmEmail(confirmEmail)
  }

  async function resetRequired(email: string) {
    await UsersService.resetRequired(email)
  }

  async function resetPassword(resetPasswordInfo: {
    id: string
    password: string
    confirmPassword: string
  }) {
    await UsersService.resetPassword(resetPasswordInfo)
  }

  async function logIn(userLogIn: UserLogIn) {
    const { data } = await UsersService.logIn(userLogIn)
    console.log('response', data)
    if (data) {
      accessToken.value = data.accessToken
      user.value = data.user
    } else {
      throw new Error('Login failed')
    }
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
