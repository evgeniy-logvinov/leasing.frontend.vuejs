import { apiClient } from '~/http'
import { Application } from '~/interfaces/Application'
import { ApplicationNew } from '~/interfaces/ApplicationNew'

export default {
  url: 'applications',
  getAll() {
    return apiClient.get<Application[]>(this.url)
  },
  add(application: ApplicationNew) {
    return apiClient.post<ApplicationNew>(this.url, application)
  }
}
