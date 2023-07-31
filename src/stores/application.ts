import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Application } from '~/interfaces/Application'
import ApplicationService from '~/services/ApplicationService'
import { ApplicationNew } from '~/interfaces/ApplicationNew'

export const useApplicationStore = defineStore('application', () => {
  const applications = ref<Application[]>([])

  async function getApplications() {
    const { data: allApplications } = await ApplicationService.getAll()
    applications.value = allApplications
  }

  async function addApplication(application: ApplicationNew) {
    await ApplicationService.add(application)
  }

  return { getApplications, addApplication, applications }
})
