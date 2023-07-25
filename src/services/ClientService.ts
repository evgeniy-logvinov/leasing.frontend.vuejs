import { apiClient } from '~/http'
import { Client } from '~/interfaces/Client'
import { ClientNew } from '~/interfaces/ClientNew'

export default {
  url: 'leasing-client',
  add(user: ClientNew) {
    return apiClient.post<ClientNew>(this.url, user)
  },
  getAll() {
    return apiClient.get<Client[]>(this.url)
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
  }
}
