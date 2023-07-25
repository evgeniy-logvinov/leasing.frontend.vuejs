<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useClientStore } from '../stores/clients'
import { ClientNew } from '../interfaces/ClientNew'
import { getErrorMessage, showError } from '../utils/handler'

const { getClients, addClient, setDescription, invite, block, unblock } = useClientStore()
const { clients } = storeToRefs(useClientStore())
const loading = ref(true)

onMounted(async () => {
  try {
    await getClients()
  } catch (err) {
    showError(getErrorMessage(err))
  } finally {
    loading.value = false
  }
})

const add = ref(false)

const onAddNew = () => {
  add.value = true
}

const onCancel = () => {
  add.value = false
}

const onCreate = async (form: ClientNew) => {
  await addClient(form)
  add.value = false
  await getClients()
}

const onDescription = ({ id, description }: { id: number; description: string }) => {
  setDescription(id, description)
}

const onInvite = ({ id }: { id: number }) => {
  invite(id)
}

const onBlock = ({ id }: { id: number }) => {
  block(id)
}

const onUnblock = ({ id }: { id: number }) => {
  unblock(id)
}
</script>
<template>
  <el-skeleton v-if="!add" :rows="5" :loading="loading" animated>
    <template #default>
      <ClientsTable
        :clients="clients"
        @addNew="onAddNew"
        @description="onDescription"
        @invite="onInvite"
        @block="onBlock"
        @unblock="onUnblock"
      ></ClientsTable>
    </template>
  </el-skeleton>
  <CreateClientForm v-else @create="onCreate" @cancel="onCancel" />
</template>
