<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { getErrorMessage, showError } from '../utils/handler'
import { useCompanyProfileStore } from '~/stores/company-profile'
import { CompanyProfile } from '~/interfaces/CompanyProfile'
import CompanyProfileForm from '~/components/CompanyProfileForm.vue'

const { getProfile, saveProfile } = useCompanyProfileStore()
const { company } = storeToRefs(useCompanyProfileStore())
const loading = ref(true)

onMounted(() => {
  try {
    getProfile()
  } catch (err) {
    showError(getErrorMessage(err))
  } finally {
    loading.value = false
  }
})

const onSave = async (profile: CompanyProfile) => {
  loading.value = true
  try {
    await saveProfile(profile)
  } catch (err) {
    showError(getErrorMessage(err))
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <el-skeleton :rows="5" :loading="loading" animated>
    <template #default>
      <CompanyProfileForm :company="company" @save="onSave" />
    </template>
  </el-skeleton>
</template>
