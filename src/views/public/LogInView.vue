<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '../../stores/user'
import router from '../../router'

import { getLoading } from '../../utils/loading'
import { type FormRules } from 'element-plus'
import { emailRules, passwordRules } from '../../utils/rules'
import { getErrorMessage } from '../../utils/handler'
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
  } catch (err) {
    error.value = getErrorMessage(err)
  } finally {
    loading.close()
  }
}

const rules = reactive<FormRules>({
  email: emailRules,
  password: passwordRules
})

const goToSignUp = () => {
  router.push({
    name: 'SignUp'
  })
}

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
</template>

<style scoped lang="scss">
:deep(.el-form-item__content) {
  justify-content: end;
}
</style>
