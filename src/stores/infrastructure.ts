import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Infrastructure } from '~/interfaces/Infrastructure'
import InfrastructureService from '~/services/InfrastructureService'

export const useInfrastructureStore = defineStore('infrastructure', () => {
  const infrastructure = ref<Infrastructure>()

  async function getInfrastructure() {
    const { data } = await InfrastructureService.getByUser()
    infrastructure.value = data
  }

  function saveInfrastructure(infrastracture: Infrastructure) {
    InfrastructureService.save(infrastracture)
  }

  return { getInfrastructure, saveInfrastructure, infrastructure }
})
