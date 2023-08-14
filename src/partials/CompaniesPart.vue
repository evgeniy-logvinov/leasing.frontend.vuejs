<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { CompanyNew } from '../interfaces/CompanyNew'
import { useCompanyStore } from '../stores/company'
import { getErrorMessage, showError } from '../utils/handler'

const { getCompanies, addCompany, setDescription, invite, block, unblock, setAccreditation } =
  useCompanyStore()
const { companies } = storeToRefs(useCompanyStore())
const loading = ref(true)

onMounted(async () => {
  try {
    await getCompanies()
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

const onCreate = async (form: CompanyNew) => {
  await addCompany(form)
  add.value = false
  await getCompanies()
}

const onDescription = ({ id, description }: { id: string; description: string }) => {
  setDescription(id, description)
}

const onAccreditation = ({ id, accreditation }: { id: string; accreditation: boolean }) => {
  setAccreditation(id, accreditation)
}

const onInvite = ({ id }: { id: string }) => {
  invite(id)
}

const onBlock = ({ id }: { id: string }) => {
  block(id)
}

const onUnblock = ({ id }: { id: string }) => {
  unblock(id)
}
</script>
<template>
  <el-skeleton v-if="!add" :rows="5" :loading="loading" animated>
    <template #default>
      <CompaniesTable
        :companies="companies"
        @addNew="onAddNew"
        @description="onDescription"
        @invite="onInvite"
        @block="onBlock"
        @unblock="onUnblock"
        @accreditation="onAccreditation"
      ></CompaniesTable>
    </template>
  </el-skeleton>
  <CreateCompanyForm v-else @create="onCreate" @cancel="onCancel" />
</template>
