import { apiClient } from '~/http'
import { PreferenceFilter } from '~/interfaces/PreferenceFilter'

export default {
  url: 'preference-filter',
  get() {
    return apiClient.get<PreferenceFilter>(this.url)
  }
}
