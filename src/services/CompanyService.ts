import { apiClient } from '~/http'
import { Company } from '~/interfaces/Company'
import { CompanyNew } from '~/interfaces/CompanyNew'

export default {
  url: 'leasing-company',
  add(user: CompanyNew) {
    return apiClient.post<CompanyNew>(this.url, user)
  },
  getAll() {
    return apiClient.get<Company[]>(this.url)
  },
  setDescription(id: number, description: string) {
    return apiClient.post<{ id: string; description: string }>(`${this.url}/description`, {
      id,
      description
    })
  },
  invite(id: number) {
    return apiClient.post(`${this.url}/invite/${id}`)
  },
  block(id: number) {
    return apiClient.post(`${this.url}/block/${id}`)
  },
  unblock(id: number) {
    return apiClient.post(`${this.url}/unblock/${id}`)
  },
  setAccreditation(id: number, accreditation: boolean) {
    return apiClient.post(`${this.url}/accreditation/${id}`, { accreditation })
  }
}
