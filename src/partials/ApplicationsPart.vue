<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import ApplicationDetails from '../components/ApplicationDetails.vue'
import { Application } from '../interfaces/Application'
import { useApplicationStore } from '../stores/application'
import { getErrorMessage, showError } from '../utils/handler'

const { getApplications } = useApplicationStore()
const { applications } = storeToRefs(useApplicationStore())
const loading = ref(true)
const application = ref<Application | null>(null)
const details = ref(false)

const onDetails = (row: Application) => {
  application.value = row
  details.value = true
}

const onBack = () => {
  details.value = false
}

onMounted(async () => {
  try {
    await getApplications()
  } catch (err) {
    showError(getErrorMessage(err))
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <el-skeleton v-if="!details" :rows="5" :loading="loading" animated>
    <template #default>
      <ApplicationsTable :applications="applications" @details="onDetails"></ApplicationsTable>
    </template>
  </el-skeleton>
  <ApplicationDetails :application="application" @back="onBack" v-else-if="application" />
</template>
