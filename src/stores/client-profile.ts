import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ClientProfile } from '~/interfaces/ClientProfile'
import ClientProfileService from '~/services/ClientProfileService'

export const useClientProfileStore = defineStore('client-profile', () => {
  const client = ref<ClientProfile>()

  async function getClientProfile() {
    const { data: clientProfile } = await ClientProfileService.getAllByUser()
    client.value = clientProfile
  }

  function saveClientProfile(profile: ClientProfile) {
    ClientProfileService.save(profile)
  }

  return { getClientProfile, saveClientProfile, client }
})
