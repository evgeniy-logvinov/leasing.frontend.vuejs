import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ClientNew } from '~/interfaces/ClientNew'
import { Client } from '~/interfaces/Client'
import ClientService from '~/services/ClientService'

export const useClientStore = defineStore('client', () => {
  const clients = ref<Client[]>([])

  async function addClient(user: ClientNew) {
    await ClientService.add(user)
  }

  async function getClients() {
    const { data: allClients } = await ClientService.getAll()
    clients.value = allClients
  }

  async function setDescription(id: string, description: string) {
    await ClientService.setDescription(id, description)
  }

  async function invite(id: string) {
    const { data: updatedClientProfile } = await ClientService.invite(id)

    const client = clients.value?.find((client) => client.clientProfile.id === id)
    if (!client) {
      throw new Error(`Can't find client`)
    }
    client.clientProfile = { ...updatedClientProfile }
  }

  async function block(id: string) {
    const { data: updatedClientProfile } = await ClientService.block(id)

    const client = clients.value?.find((client) => client.clientProfile.id === id)
    if (!client) {
      throw new Error(`Can't find client`)
    }

    client.clientProfile = { ...updatedClientProfile }
  }

  async function unblock(id: string) {
    const { data: updatedClientProfile } = await ClientService.unblock(id)

    const client = clients.value?.find((client) => client.clientProfile.id === id)
    if (!client) {
      throw new Error(`Can't find client`)
    }

    client.clientProfile = { ...updatedClientProfile }
  }

  return {
    addClient,
    getClients,
    setDescription,
    invite,
    block,
    unblock,
    clients
  }
})
