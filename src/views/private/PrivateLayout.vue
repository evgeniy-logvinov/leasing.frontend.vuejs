<script setup lang="ts">
import { computed, ref } from 'vue'
import router from '../../router'
import { useAuthStore } from '../../stores/auth'
import { useRoute } from 'vue-router'

const userName = computed(() => {
  const {
    user: { email }
  } = useAuthStore()
  return email
})

const userRole = computed(() => {
  const {
    user: { role }
  } = useAuthStore()
  return role
})

const route = useRoute()

const defaultActive = computed(() => {
  return route.path
})

const logOut = async () => {
  const { logOut } = useAuthStore()
  await logOut()
  router.push({ name: 'LogIn' })
}
const isCollapse = ref<boolean>(true)

const changeCollapse = () => {
  isCollapse.value = !isCollapse.value
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <!-- <el-aside class="absolute h-full z-10"> -->
    <!-- <el-scrollbar class="h-full"> -->
    <div class="absolute h-full z-10 top-14 mt-1">
      <el-menu
        active-text-color="#8f7acf"
        :default-active="defaultActive"
        :collapse="isCollapse"
        router
        class="min-h-max w-48 h-full"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/private/dashboard" :route="{ name: 'Dashboard' }">
          <el-icon><service /></el-icon>
          <span>Dashboard</span>
        </el-menu-item>
        <el-menu-item
          v-if="userRole === 'ROLE_ADMIN'"
          index="/private/users"
          :route="{ name: 'Users' }"
        >
          <el-icon><User /></el-icon>
          <span>Users</span>
        </el-menu-item>
        <el-menu-item
          v-if="userRole === 'ROLE_LEASING_CLIENT'"
          index="/private/applications"
          :route="{ name: 'Applications' }"
        >
          <el-icon><Checked /></el-icon>
          <span>Applications</span>
        </el-menu-item>
        <el-menu-item
          v-if="userRole === 'ROLE_LEASING_CLIENT'"
          index="/private/client-profile"
          :route="{ name: 'ClientProfile' }"
        >
          <el-icon><Checked /></el-icon>
          <span>Client Profile</span>
        </el-menu-item>
        <!-- <el-menu-item index="/private/statistic" :route="{ name: 'Statistic' }">
          <el-icon><PieChart /></el-icon>
          <span>Statistic</span>
        </el-menu-item> -->
        <el-menu-item
          v-if="userRole === 'ROLE_ADMIN'"
          index="/private/admin"
          :route="{ name: 'PrivateAdmin' }"
        >
          <el-icon><View /></el-icon>
          <span>Admin dashboard</span>
        </el-menu-item>
      </el-menu>
      <!-- </el-scrollbar> -->
      <!-- </el-aside> -->
    </div>
    <el-container>
      <el-header
        class="flex items-center border-b-2 border-b-grey-500 justify-between menu-content bg-white"
      >
        <div class="flex items-center">
          <div @click="changeCollapse" class="icon-wrapper cursor-pointer mr-6">
            <el-icon v-if="isCollapse" size="large"><Expand /></el-icon>
            <el-icon size="large" v-else><CloseBold /></el-icon>
          </div>
        </div>
        <div class="toolbar">
          <span class="mx-4 hidden sm:block">{{ userName }}</span>
          <el-button round size="large" @click="logOut">Log Out</el-button>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar class="pl-16 content">
          <RouterView :key="$route.fullPath" />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
header {
  width: 100%;
  line-height: 1.5;
  max-height: 100vh;
}
</style>
