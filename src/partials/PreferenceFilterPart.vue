<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { usePreferenceFilterStore } from '../stores/preference-filter'
import { getErrorMessage, showError } from '../utils/handler'

const { getPreferenceFilter } = usePreferenceFilterStore()
const { preferenceFilter } = storeToRefs(usePreferenceFilterStore())
const loading = ref(true)

onMounted(async () => {
  try {
    await getPreferenceFilter()
  } catch (err) {
    showError(getErrorMessage(err))
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <el-skeleton :rows="5" :loading="loading" animated>
    <template #default>
      {{ preferenceFilter }}
    </template>
  </el-skeleton>
</template>
