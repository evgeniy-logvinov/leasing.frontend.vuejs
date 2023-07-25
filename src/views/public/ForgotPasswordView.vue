<script setup lang="ts">
import { FormRules } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { getErrorMessage } from '../../utils/handler'
import { getLoading } from '../../utils/loading'
import { emailRules } from '../../utils/rules'

const form: {
  email: string
} = reactive({
  email: ''
})
const send = ref(false)
const error = ref('')
const { resetRequired } = useAuthStore()

const rules = reactive<FormRules>({
  email: emailRules
})

const reset = async () => {
  const loading = getLoading()
  try {
    await resetRequired(form.email)
    send.value = true
  } catch (err) {
    error.value = getErrorMessage(err)
  } finally {
    loading.close()
  }
}

const formValidity = ref<{
  email: boolean
}>({
  email: false
})

const formValid = computed(() => {
  return formValidity.value.email
})

const validateForm = (propName: string, isValid: boolean) => {
  ;(formValidity.value as any)[propName] = isValid
}
</script>
<template>
  <el-row>
    <el-col>Forgot Password</el-col>
    <el-col v-if="!send"
      ><el-form
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="top"
        @submit.prevent
        @validate="validateForm"
      >
        <el-form-item prop="email" label="E-mail">
          <el-input v-model="form.email" size="large" />
        </el-form-item>
        <el-form-item>
          <span class="text-orange-500">{{ error }}</span>
        </el-form-item>
        <el-form-item>
          <div class="w-full text-center">
            <el-button
              type="primary"
              class="w-full"
              size="large"
              :disabled="!form.email || !formValid"
              round
              @click="reset"
              >Reset password</el-button
            >
          </div>
        </el-form-item>
      </el-form></el-col
    >
    <el-col v-else>Email send. Please check inbox</el-col>
    <el-col>{{ error }}</el-col></el-row
  >
</template>
