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
      <div>Please choose city and coverage territory</div>
      <div
        :key="cityOfPresenceCustomerCoverageArea.id"
        v-for="cityOfPresenceCustomerCoverageArea in preferenceFilter?.cityOfPresenceCustomerCoverageArea"
      >
        <el-select v-model="cityOfPresenceCustomerCoverageArea.city">
          <el-option label="Chelyabinks" value="6630f55a-d66b-4b75-bbb0-b74823440ebb"></el-option>
        </el-select>
      </div>
      {{ preferenceFilter }}
    </template>
  </el-skeleton>
</template>
