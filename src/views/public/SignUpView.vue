<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import router from '../../router'
import type { FormRules } from 'element-plus'
import { emailRules, passwordRules } from '../../utils/rules'
import { getErrorMessage } from '../../utils/handler'
import { getLoading } from '../../utils/loading'

const error = ref<string | null>(null)
const verify = ref<boolean>(false)
const agree = ref<boolean>(false)
const formValidity = ref<{
  email: boolean
  password: boolean
  confirmPassword: boolean
}>({
  email: false,
  password: false,
  confirmPassword: false
})

const formValid = computed(() => {
  return (
    formValidity.value.email && formValidity.value.password && formValidity.value.confirmPassword
  )
})
const validateForm = (propName: string, isValid: boolean) => {
  ;(formValidity.value as any)[propName] = isValid
}

const form: {
  email: string
  password: string
  confirmPassword: string
} = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const onSignUp = async () => {
  const loading = getLoading()
  try {
    const { signUp } = useAuthStore()
    await signUp({ ...form })
    verify.value = true
  } catch (err) {
    error.value = getErrorMessage(err)
  } finally {
    loading.close()
  }
}

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else if (value !== form.password) {
    callback(new Error('The password confirmation doesn’t match'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  email: emailRules,
  password: passwordRules,
  confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }]
})

const goToSignIn = () => {
  verify.value = false
  router.push({ name: 'LogIn' })
}
</script>

<template>
  <el-row class="content m-4">
    <el-col v-if="!verify" class="flex justify-center mt-12 w-full sm:w-2/3 lg:w-1/3">
      <el-form
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="top"
        @validate="validateForm"
        @submit.prevent
      >
        <el-form-item prop="email" label="E-mail">
          <el-input v-model="form.email" size="large" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" size="large" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm password" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            size="large"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="agree" class="p-0 m-0 w-full">
            <div class="truncate">
              <span class="align-middle">I agree to the</span>

              <el-link underline href="link" target="_blank">Terms and Conditions</el-link>
              <span class="align-middle">and</span>
              <el-link underline href="link" target="_blank">Privacy Policy</el-link>
            </div>
          </el-checkbox>
        </el-form-item>
        <el-form-item v-if="error">
          <span class="text-orange-500">{{ error }}</span>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="
              !agree || !form.email || !form.password || !form.confirmPassword || !formValid
            "
            class="w-full"
            round
            size="large"
            @click="onSignUp"
            >Sign up</el-button
          >
          <el-col class="text-center">
            <span class="align-middle">Already have an account?</span>
            <el-button link type="primary" @click="goToSignIn">Log in</el-button>
          </el-col>
        </el-form-item>
      </el-form></el-col
    ><el-col v-else class="flex justify-center mt-12 flex-col items-center">
      <div>Link send on your email. Please verify your email and log in to the system</div>
      <div class="mt-4">
        <el-button round type="primary" @click="goToSignIn">To Log in</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<style scoped lang="scss">
.el-link {
  margin-left: 4px;
  margin-right: 4px;
}
:deep(.el-checkbox__label) {
  width: 100%;
}
.el-checkbox__label {
  width: 100%;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>
