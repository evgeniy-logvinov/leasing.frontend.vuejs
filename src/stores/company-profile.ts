import { ref } from 'vue'
import { defineStore } from 'pinia'
import { CompanyProfile } from '~/interfaces/CompanyProfile'
import CompanyProfileService from '~/services/CompanyProfileService'

export const useCompanyProfileStore = defineStore('company-profile', () => {
  const company = ref<CompanyProfile>()

  async function getProfile() {
    const { data: clientProfile } = await CompanyProfileService.getByUser()
    company.value = clientProfile
  }

  function saveProfile(profile: CompanyProfile) {
    CompanyProfileService.save(profile)
  }

  return { getProfile, saveProfile, company }
})
