<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { reactive } from 'vue'
import { useUserStore } from '../../stores/user'
import router from '../../router'
import type { FormRules } from 'element-plus'
import { isAxiosError } from 'axios'

const { params } = useRoute()

const id = ref<string>('')
onMounted(() => {
  form.id = params.id as string
})

const error = ref<string | null>(null)
const form: {
  id: string
  password: string
  confirmPassword: string
} = reactive({
  id: '',
  password: '',
  confirmPassword: ''
})

const onReset = async () => {
  try {
    const { resetPassword } = useUserStore()
    await resetPassword({ ...form })
    goToLogIn()
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.data.message) {
      error.value = err.response.data.message
    } else {
      error.value = (err as Error).message
    }
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

const validateConfirmPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else if (value !== form.password) {
    callback(new Error('The password confirmation doesn’t match'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  password: [{ validator: validatePass, trigger: 'blur' }],
  confirmPassword: [{ validator: validateConfirmPass, trigger: 'blur' }]
})

const goToLogIn = () => {
  router.push({ name: 'LogIn' })
}
</script>
<template>
  <el-row>
    <el-col> Reset Password </el-col>
    <el-col>{{ id }} </el-col>
  </el-row>

  <el-row class="content m-4">
    <el-col class="flex justify-center mt-12 w-full sm:w-2/3 lg:w-1/3">
      <el-form
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="top"
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
            :disabled="!form.password || !form.confirmPassword"
            class="w-full"
            round
            size="large"
            @click="onReset"
            >Reset</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="secondary" class="w-full" round size="large" @click="goToLogIn"
            >To Log In</el-button
          >
        </el-form-item>
      </el-form></el-col
    >
  </el-row>
</template>
