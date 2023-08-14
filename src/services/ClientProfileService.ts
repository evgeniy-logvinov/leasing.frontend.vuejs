import { apiClient } from '~/http'
import { ClientProfile } from '~/interfaces/ClientProfile'
// import { ClientProfileNew } from '~/interfaces/ClientProfileNew'

export default {
  url: 'client-profile',
  getAll() {
    return apiClient.get<ClientProfile[]>(this.url)
  },
  getByUser() {
    return apiClient.get<ClientProfile>(this.url)
  },
  save(profile: ClientProfile) {
    return apiClient.put<ClientProfile>(this.url, profile)
  }
}
