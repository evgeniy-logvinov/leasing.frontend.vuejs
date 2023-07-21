<script setup lang="ts">
import router from '../../router'
import { useUserStore } from '../../stores/user'

const { logOut } = useUserStore()
const logOutUser = () => {
  logOut()
  router.push({ name: 'LogIn' })
}
</script>

<template>
  <main>Home</main>
  <el-button @click="logOutUser">Log Out</el-button>
</template>
