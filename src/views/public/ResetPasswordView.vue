<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { reactive } from 'vue'
import { useUserStore } from '../../stores/user'
import router from '../../router'
import type { FormRules } from 'element-plus'
import { passwordRules } from '../../utils/rules'
import { getErrorMessage } from '../../utils/handler'
import { getLoading } from '../../utils/loading'

const { params } = useRoute()
const id = ref<string>('')
const formValidity = ref<{
  password: boolean
  confirmPassword: boolean
}>({
  password: false,
  confirmPassword: false
})

onMounted(() => {
  id.value = params.resetId as string
})

const error = ref<string | null>(null)
const form: {
  password: string
  confirmPassword: string
} = reactive({
  password: '',
  confirmPassword: ''
})
const onReset = async () => {
  const loading = getLoading()
  try {
    const { resetPassword } = useUserStore()
    await resetPassword({ ...form, id: id.value })
    goToLogIn()
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
  password: passwordRules,
  confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }]
})

const formValid = computed(() => {
  return formValidity.value.password && formValidity.value.confirmPassword
})
const validateForm = (propName: string, isValid: boolean) => {
  ;(formValidity.value as any)[propName] = isValid
}

const goToLogIn = () => {
  router.push({ name: 'LogIn' })
}
</script>
<template>
  <el-row class="content m-4">
    {{ form }}
    <el-col class="flex justify-center mt-12 w-full sm:w-2/3 lg:w-1/3">
      <el-form
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="top"
        @validate="validateForm"
        @submit.prevent
      >
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
        <el-form-item v-if="error">
          <span class="text-orange-500">{{ error }}</span>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="!form.password || !form.confirmPassword || !formValid"
            class="w-full"
            round
            size="large"
            @click="onReset"
            >Reset</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" round size="large" @click="goToLogIn">To Log In</el-button>
        </el-form-item>
      </el-form></el-col
    >
  </el-row>
</template>
