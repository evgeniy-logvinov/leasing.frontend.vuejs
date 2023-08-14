import { apiClient } from '~/http'
import { CompanyProfile } from '~/interfaces/CompanyProfile'

export default {
  url: 'company-profile',
  getAll() {
    return apiClient.get<CompanyProfile[]>(this.url)
  },
  getByUser() {
    return apiClient.get<CompanyProfile>(this.url)
  },
  save(profile: CompanyProfile) {
    return apiClient.put<CompanyProfile>(this.url, profile)
  }
}
