import { apiClient } from '~/http'
import { Infrastructure } from '~/interfaces/Infrastructure'

export default {
  url: 'infrastructure',
  getAll() {
    return apiClient.get<Infrastructure[]>(this.url)
  },
  getByUser() {
    return apiClient.get<Infrastructure>(this.url)
  },
  save(infrastracture: Infrastructure) {
    return apiClient.put<Infrastructure>(this.url, infrastracture)
  }
}
