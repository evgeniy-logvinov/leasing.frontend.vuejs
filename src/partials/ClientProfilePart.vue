<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { getErrorMessage, showError } from '../utils/handler'
import { useClientProfileStore } from '../stores/client-profile'
import { ClientProfile } from '../interfaces/ClientProfile'

const { getProfile, saveProfile } = useClientProfileStore()
const { client } = storeToRefs(useClientProfileStore())
const loading = ref(true)

onMounted(() => {
  try {
    getProfile()
  } catch (err) {
    showError(getErrorMessage(err))
  } finally {
    loading.value = false
  }
})

const onSave = async (profile: ClientProfile) => {
  loading.value = true
  try {
    await saveProfile(profile)
  } catch (err) {
    showError(getErrorMessage(err))
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <el-skeleton :rows="5" :loading="loading" animated>
    <template #default>
      <ClientProfileForm :client="client" @save="onSave" />
    </template>
  </el-skeleton>
</template>
