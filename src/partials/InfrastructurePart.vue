<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { getErrorMessage, showError } from '../utils/handler'
import { useInfrastructureStore } from '~/stores/infrastructure'
import { Infrastructure } from '~/interfaces/Infrastructure'

const { getInfrastructure, saveInfrastructure } = useInfrastructureStore()
const { infrastructure } = storeToRefs(useInfrastructureStore())
const loading = ref(true)

onMounted(() => {
  try {
    getInfrastructure()
  } catch (err) {
    showError(getErrorMessage(err))
  } finally {
    loading.value = false
  }
})

const onSave = async (infrastructure: Infrastructure) => {
  loading.value = true
  try {
    await saveInfrastructure(infrastructure)
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
      {{ infrastructure }}
    </template>
  </el-skeleton>
</template>
