<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import ApplicationDetails from '../components/ApplicationDetails.vue'
import { Application } from '../interfaces/Application'
import { ApplicationNew } from '../interfaces/ApplicationNew'
import { useApplicationStore } from '../stores/application'
import { getErrorMessage, showError } from '../utils/handler'

const { getApplications, addApplication } = useApplicationStore()
const { applications } = storeToRefs(useApplicationStore())
const loading = ref(true)
const application = ref<Application | null>(null)
const details = ref(false)
const add = ref(false)

const onDetails = (row: Application) => {
  application.value = row
  details.value = true
}

const onBack = () => {
  details.value = false
  add.value = false
}

const onCreate = async (form: ApplicationNew) => {
  await addApplication(form)
  add.value = false
  await getApplications()
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

const onAdd = () => {
  add.value = true
}
</script>
<template>
  <div v-if="!add">
    <el-skeleton v-if="!details" :rows="5" :loading="loading" animated>
      <template #default>
        <el-button @click="onAdd">Add</el-button>
        <ApplicationsTable :applications="applications" @details="onDetails"></ApplicationsTable>
      </template>
    </el-skeleton>
    <ApplicationDetails :application="application" @back="onBack" v-else-if="application" />
  </div>
  <CreateApplicationForm @create="onCreate" @cancel="onBack" v-else />
</template>
