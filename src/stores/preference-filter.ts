import { ref } from 'vue'
import { defineStore } from 'pinia'
import { PreferenceFilter } from '~/interfaces/PreferenceFilter'
import PreferenceFilterService from '~/services/PreferenceFilterService'

export const usePreferenceFilterStore = defineStore('preference-filter', () => {
  const preferenceFilter = ref<PreferenceFilter>()

  async function getPreferenceFilter() {
    const { data } = await PreferenceFilterService.get()
    preferenceFilter.value = data
  }

  return { getPreferenceFilter, preferenceFilter }
})
