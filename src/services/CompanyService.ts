import { apiClient } from '@/http'
import type { Companies } from '../interfaces/Companies'

export default {
  getCompanies() {
    return apiClient.get<Companies[]>('/dictionaries/city')
  }
}
