<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { getErrorMessage, showError } from '../utils/handler'
import { useClientProfileStore } from '../stores/client-profile'
import { ClientProfile } from '../interfaces/ClientProfile'

const { getClientProfile, saveClientProfile } = useClientProfileStore()
const { client } = storeToRefs(useClientProfileStore())
const loading = ref(true)

onMounted(() => {
  try {
    getClientProfile()
  } catch (err) {
    showError(getErrorMessage(err))
  } finally {
    loading.value = false
  }
})

const onSave = async (profile: ClientProfile) => {
  loading.value = true
  try {
    await saveClientProfile(profile)
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
