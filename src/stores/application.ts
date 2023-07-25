import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Application } from '~/interfaces/Application'
import ApplicationService from '~/services/ApplicationService'

export const useApplicationStore = defineStore('application', () => {
  const applications = ref<Application[]>([])

  async function getApplications() {
    const { data: allApplications } = await ApplicationService.getAll()
    applications.value = allApplications
  }

  return { getApplications, applications }
})
