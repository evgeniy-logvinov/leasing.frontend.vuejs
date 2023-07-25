import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Company } from '~/interfaces/Company'
import { CompanyNew } from '~/interfaces/CompanyNew'
import CompanyService from '~/services/CompanyService'

export const useCompanyStore = defineStore('company', () => {
  const companies = ref<Company[]>()

  async function addCompany(user: CompanyNew) {
    await CompanyService.add(user)
  }

  async function getCompanies() {
    const { data: allCompanies } = await CompanyService.getAll()
    companies.value = allCompanies
  }

  async function setDescription(id: number, description: string) {
    await CompanyService.setDescription(id, description)
  }

  async function invite(id: number) {
    const { data: updatedCompanyProfile } = await CompanyService.invite(id)

    const company = companies.value?.find((company) => company.companyProfile.id === id)
    if (!company) {
      throw new Error(`Can't find company`)
    }

    company.companyProfile = { ...updatedCompanyProfile }
  }

  async function block(id: number) {
    const { data: updatedCompanyProfile } = await CompanyService.block(id)

    const company = companies.value?.find((company) => company.companyProfile.id === id)
    if (!company) {
      throw new Error(`Can't find company`)
    }

    company.companyProfile = { ...updatedCompanyProfile }
  }

  async function unblock(id: number) {
    const { data: updatedCompanyProfile } = await CompanyService.unblock(id)

    const company = companies.value?.find((company) => company.companyProfile.id === id)
    if (!company) {
      throw new Error(`Can't find company`)
    }

    company.companyProfile = { ...updatedCompanyProfile }
  }

  return {
    addCompany,
    getCompanies,
    setDescription,
    invite,
    block,
    unblock,
    companies
  }
})
