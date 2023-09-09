<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { getErrorMessage, showError } from '../utils/handler'
import { useInfrastructureStore } from '~/stores/infrastructure'
import { Infrastructure } from '~/interfaces/Infrastructure'
import EmployeeForm from '~/components/EmployeeForm.vue'

const { getInfrastructure, saveInfrastructure } = useInfrastructureStore()
const { infrastructure } = storeToRefs(useInfrastructureStore())
const loading = ref(true)
const activeDepartments = ref([])

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

const fullNameHeadOfAnalitics = computed(() => {
  const head = infrastructure.value?.analiticsDepartment?.head
  return `${head?.firstName} ${head?.lastName} ${head?.patronymic}`
})
</script>
<template>
  <el-skeleton :rows="5" :loading="loading" animated>
    <template #default>
      <el-collapse v-model="activeDepartments">
        <el-collapse-item title="Analitics department" name="analitics">
          <div class="flex flex-col">
            <span>Head</span>
            <div class="flex flex-col">
              <EmployeeForm :employee="infrastructure?.analiticsDepartment?.head" />
              <el-button type="primary" icon="Edit" />
            </div>
          </div>
          <div>
            <span>Analitics</span>
            <div
              class="flex flex-col"
              :key="analitic.id"
              v-for="analitic in infrastructure?.analiticsDepartment?.analitics"
            >
              <EmployeeForm :employee="analitic" />
              <el-button type="primary" icon="Edit" />
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Sales department" name="sales">
          <div class="flex flex-col">
            <span>Head</span>
            <div class="flex flex-col">
              <EmployeeForm :employee="infrastructure?.salesDepartment?.head" />
              <el-button type="primary" icon="Edit" />
            </div>
          </div>
          <div>
            <span>City manager</span>
            <div
              class="flex flex-col"
              :key="cityManager.id"
              v-for="cityManager in infrastructure?.salesDepartment?.cityManager"
            >
              <span>Head</span>
              <div class="flex flex-col">
                <EmployeeForm :employee="cityManager?.head" />
                <el-button type="primary" icon="Edit" />
              </div>
              <div>
                <span>Managers</span>
                <div
                  class="flex flex-col"
                  :key="manager.id"
                  v-for="manager in cityManager?.manager"
                >
                  <EmployeeForm :employee="manager" />
                  <el-button type="primary" icon="Edit" />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </template>
  </el-skeleton>
</template>
