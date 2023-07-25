import axios, { AxiosRequestHeaders } from 'axios'
import { useAuthStore } from '~/stores/auth'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      config.headers = (await authHeader()) as AxiosRequestHeaders
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

const authHeader = async (): Promise<{ Authorization: string }> => {
  const { accessToken } = useAuthStore()

  if (accessToken) {
    return { Authorization: 'Bearer ' + accessToken }
  } else {
    return { Authorization: '' }
  }
}

export { apiClient }
