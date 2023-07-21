<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router'
import { useUserStore } from '../../stores/user'

const send = ref(false)
const {
  user: { email },
  sendConfirmEmail
} = useUserStore()
const sendEmail = async () => {
  console.log(email)
  await sendConfirmEmail(email)
  send.value = true
}

const toLogin = () => {
  router.push({ name: 'LogIn' })
}
</script>

<template>
  <el-row
    ><el-col>
      <div>Please confirme email using message from inbox {{ email }}</div>
      <el-button v-if="!send" @click="sendEmail">Send email again</el-button>
      <div v-else>Email send. Please check your inbox or spam and after that please relogin</div>
      <div><el-button @click="toLogin">Back to login</el-button></div>
    </el-col></el-row
  >
</template>
