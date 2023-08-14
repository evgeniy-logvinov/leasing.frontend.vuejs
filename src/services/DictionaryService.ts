import { apiClient } from '~/http'
import { City } from '~/interfaces/City'

export default {
  url: 'dictionary',
  getCities() {
    return apiClient.get<City[]>(`${this.url}/cities`)
  }
}
