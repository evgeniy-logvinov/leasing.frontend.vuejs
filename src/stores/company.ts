import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Company } from '~/interfaces/Company'
import { CompanyNew } from '~/interfaces/CompanyNew'
import CompanyService from '~/services/CompanyService'

export const useCompanyStore = defineStore('company', () => {
  const companies = ref<Company[]>([])

  async function addCompany(user: CompanyNew) {
    await CompanyService.add(user)
  }

  async function getCompanies() {
    const { data: allCompanies } = await CompanyService.getAll()
    companies.value = allCompanies
  }

  async function setDescription(id: string, description: string) {
    await CompanyService.setDescription(id, description)
  }

  async function setAccreditation(id: string, accreditation: boolean) {
    await CompanyService.setAccreditation(id, accreditation)

    const company = companies.value?.find((company) => company.companyProfile.id === id)
    if (!company) {
      throw new Error(`Can't find company`)
    }

    company.companyProfile.accreditation = accreditation
  }

  async function invite(id: string) {
    const { data: updatedCompanyProfile } = await CompanyService.invite(id)

    const company = companies.value?.find((company) => company.companyProfile.id === id)
    if (!company) {
      throw new Error(`Can't find company`)
    }

    company.companyProfile = { ...updatedCompanyProfile }
  }

  async function block(id: string) {
    const { data: updatedCompanyProfile } = await CompanyService.block(id)

    const company = companies.value?.find((company) => company.companyProfile.id === id)
    if (!company) {
      throw new Error(`Can't find company`)
    }

    company.companyProfile = { ...updatedCompanyProfile }
  }

  async function unblock(id: string) {
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
    setAccreditation,
    invite,
    block,
    unblock,
    companies
  }
})
