<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '../../stores/user'
import router from '../../router'

import { getLoading } from '../../utils/loading'
import { type FormRules } from 'element-plus'
// TODO: verification case when email send but not confirmed
// send email again
const error = ref<string | null>(null)
const showVerify = ref<boolean>(false)
const { logIn } = useUserStore()

const form: {
  email: string
  password: string
} = reactive({
  email: '',
  password: ''
})

const onLogIn = async () => {
  const loading = getLoading()
  try {
    await logIn(form)
    router.push({
      name: 'Home'
    })
    console.log('done')
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.close()
  }
}

const validatePass = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

const validateEmail = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input email address'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  email: [
    { validator: validateEmail, trigger: 'blur' },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur']
    }
  ],
  password: [{ validator: validatePass, trigger: 'blur' }]
})

const goToSignUp = () => {
  router.push({
    name: 'SignUp'
  })
}

// const openVerifyInfo = () => {
//   ElNotification({
//     title: 'Info',
//     message: 'Email send again. please check your mailbox',
//     type: 'info'
//   })
// }

// const sendEmail = async () => {
//   const loading = getLoading()
//   try {
//     await sendEmailVerification(auth.currentUser)
//   } catch (err) {
//     error.value = formatError((err as Error).message)
//   } finally {
//     loading.close()
//   }
// }

const forgotPassword = () => {
  router.push({ name: 'ForgotPassword' })
}
</script>

<template>
  <el-row v-if="!showVerify" class="content m-4">
    <el-col class="flex justify-center mt-12 w-full sm:w-2/3 lg:w-1/3">
      <el-form
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="top"
        @submit.prevent
      >
        <el-form-item prop="email" label="E-mail">
          <el-input v-model="form.email" size="large" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" size="large" type="password" autocomplete="off" />
          <el-button link @click="forgotPassword">Forgot your password?</el-button>
        </el-form-item>
        <el-form-item>
          <span class="text-orange-500">{{ error }}</span>
        </el-form-item>
        <el-form-item>
          <div class="w-full text-center">
            <el-button type="primary" class="w-full" size="large" round @click="onLogIn"
              >Log In</el-button
            >
          </div>
          <el-col class="text-center">
            <span class="align-middle">Don't have an account</span>
            <el-button link type="primary" @click="goToSignUp">Sign Up.</el-button>
          </el-col>
        </el-form-item>
      </el-form></el-col
    ></el-row
  >
  <!-- <template v-else>
    <el-row class="content text-center justify-center items-center mt-12">
      <el-col class="text-center mt-8">
        <div>Please verify your email and refresh the page</div>
      </el-col>
    </el-row>
    <el-row class="text-center justify-center items-center mt-4"
      ><el-col
        ><el-button type="primary" size="large" round @click="sendEmail"
          >Send email again</el-button
        >
      </el-col></el-row
    >
    <el-row class="text-center justify-center items-center mt-4"
      ><el-col
        ><el-button round size="large" @click="loginAgain"
          >Change email and relogin</el-button
        ></el-col
      ></el-row
    >
  </template> -->
</template>

<style scoped lang="scss">
// .content:after {
//   content: '';
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: -1;
//   -webkit-overflow-scrolling: touch;
//   background-image: url('https://static.tildacdn.com/tild3330-3161-4465-b264-396461383031/shutterstock_2131199.jpg');
//   background-repeat: no-repeat;
//   background-position: center;
//   -webkit-background-size: cover;
//   background-size: cover;
//   min-height: 100%;
//   height: 100vh;
//   background-attachment: initial;
//   -webkit-transform: translate3d(0, 0, 0);
//   transform: translate3d(0, 0, 0);
//   transition: all 0.2s linear;
// }

:deep(.el-form-item__content) {
  justify-content: end;
}
</style>
