import { apiClient } from '~/http'
import { Application } from '~/interfaces/Application'

export default {
  url: 'applications',
  getAll() {
    return apiClient.get<Application[]>(this.url)
  }
}
