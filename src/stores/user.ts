import { reactive } from 'vue'
import { defineStore } from 'pinia'
// import { computed } from 'vue'
import UsersService from '../services/UsersService'
// import type { UserInfoData } from '../interfaces/UserInfoData'

interface UserInfo {
  loggedIn: boolean
  data: {
    displayName: string | null
    email: string | null
    // userInfo?: UserInfoData | null
  }
}

export const useUserStore = defineStore('user', () => {
  // const emptyData = {
  //   email: '',
  //   displayName: '',
  //   userInfo: null
  // }

  const user: UserInfo = reactive({
    loggedIn: false,
    data: {
      email: '',
      displayName: '',
      userInfo: null
    }
  })

  async function signUp({
    email,
    password,
    confirmPassword,
  }: {
    email: string
    password: string,
    confirmPassword: string
  }) {
    const response = await UsersService.sighUp({email, password, confirmPassword})
    console.log('response', response)
    // if (response) {
    //   user.data = {
    //     displayName: response.user.displayName,
    //     email: response.user.email
    //   } // TODO: check
    //   // response.updateProfile({ displayName: name })
    //   await sendEmailVerification(response.user)
    // } else {
    //   throw new Error('Unable to signup user')
    // }
  }

  async function  confirmEmail(id:string) {
    await UsersService.confirmEmail(id)
  }

  // async function logIn({
  //   email,
  //   password
  // }: {
  //   email: string
  //   password: string
  // }) {
  //   const response = await signInWithEmailAndPassword(auth, email, password)
  //   if (response) {
  //     user.data = {
  //       displayName: response.user.displayName,
  //       email: response.user.email
  //     }
  //   } else {
  //     throw new Error('SignIn failed')
  //   }
  // }

  // async function logOut() {
  //   await signOut(auth)
  //   user.data = { ...emptyData }
  // }

  // async function fetchUser(userInfo: User | null) {
  //   user.loggedIn = userInfo !== null
  //   if (userInfo) {
  //     user.data = {
  //       displayName: userInfo.displayName,
  //       email: userInfo.email
  //     }
  //   } else {
  //     user.data = { ...emptyData }
  //   }
  // }

  // const fetchUserInfo = async () => {
  //   if (user.loggedIn) {
  //     const { data: userInfo } = await UsersService.getUserInfo()
  //     user.data.userInfo = userInfo
  //   }
  // }

  // const isLoggedIn = computed(() => !!user.loggedIn)
  // const userName = computed(
  //   () => user.data && (user.data.email || user.data.displayName)
  // )
  // const userEmail = computed(() => user.data?.email)
  // const userInfo = computed(() => user.data?.userInfo)
  // const planMiliseconds = computed(
  //   () => Number(user.data?.userInfo?.PlanMinutes) * 60000
  // )

  return {
    user,
    // userEmail,
    // userName,
    // userInfo,
    // fetchUserInfo,
    // signIn,
    // logOut,
    // fetchUser,
    signUp,
    confirmEmail,
    // isLoggedIn,
    // planMiliseconds
  }
})
