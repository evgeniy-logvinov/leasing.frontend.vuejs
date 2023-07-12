import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Companies } from '~/interfaces/Companies'
import CompanyService from '~/services/CompanyService'

export const useCompanyStore = defineStore('company', () => {
  const companies: { all: Companies[] } = reactive({
    all: []
  })

  const fetchCompanies = async () => {
    const { data } = await CompanyService.getCompanies()
    console.log('data', data)
    companies.all = data
  }

  return {
    companies,
    fetchCompanies
  }
})
