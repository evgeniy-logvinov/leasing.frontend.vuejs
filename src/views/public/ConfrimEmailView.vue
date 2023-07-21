<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../../stores/user'
import router from '../../router'
import { showError } from '../../utils/handler'
import { getLoading } from '../../utils/loading'

const { params } = useRoute()
const { confirmEmail } = useUserStore()

const id = ref<string>('')
onMounted(() => {
  id.value = params.id as string
})

const onConfirm = async () => {
  const loading = getLoading()
  try {
    await confirmEmail(id.value)
    router.push({ name: 'LogIn' })
  } catch (err) {
    showError(err)
  } finally {
    loading.close()
  }
}
</script>
<template>
  Confirm email
  {{ id }}
  <el-button @click="onConfirm">Confirm email</el-button>
</template>
