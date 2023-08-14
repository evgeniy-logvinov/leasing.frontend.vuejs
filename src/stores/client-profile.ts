import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ClientProfile } from '~/interfaces/ClientProfile'
import ClientProfileService from '~/services/ClientProfileService'

export const useClientProfileStore = defineStore('client-profile', () => {
  const client = ref<ClientProfile>()

  async function getProfile() {
    const { data: clientProfile } = await ClientProfileService.getByUser()
    client.value = clientProfile
  }

  function saveProfile(profile: ClientProfile) {
    ClientProfileService.save(profile)
  }

  return { getProfile, saveProfile, client }
})
