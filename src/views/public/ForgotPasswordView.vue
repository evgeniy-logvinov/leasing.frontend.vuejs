<script setup lang="ts">
import { isAxiosError } from 'axios'
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'
import { getErrorMessage } from '../../utils/handler'
import { getLoading } from '../../utils/loading'

const email = ref('')
const send = ref(false)
const error = ref('')
const { resetRequired } = useUserStore()
const reset = async () => {
  const loading = getLoading()
  try {
    await resetRequired(email.value)
    send.value = true
  } catch (err) {
    error.value = getErrorMessage(err)
  } finally {
    loading.close()
  }
}
</script>
<template>
  <el-row>
    <el-col>Forgot Password</el-col>
    <el-col v-if="!send"
      ><el-input v-model="email" placeholder="Email"></el-input>
      <el-button :disabled="!email" @click="reset">Reset</el-button></el-col
    >
    <el-col v-else>Email send. Please check inbox</el-col>
    <el-col>{{ error }}</el-col></el-row
  >
</template>
