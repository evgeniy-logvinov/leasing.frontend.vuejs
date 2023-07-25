<script lang="ts" setup>
import { Application } from '../interfaces/Application'
const props = defineProps<{
  applications: Application[]
}>()
const emit = defineEmits(['details'])

const showDetails = (row: Application) => {
  emit('details', row)
}
</script>

<template>
  <el-row class="w-full p-4"
    ><el-col :span="24">
      <el-table :data="props.applications" style="width: 100%" @row-click="showDetails">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="brand" label="Brand" />
        <el-table-column prop="country" label="Country" />
        <el-table-column prop="isNew" label="Is new" />
        <el-table-column prop="model" label="Model" />
        <el-table-column label="Returnable">
          <template #default="{ row }">
            <el-checkbox v-model="row.returnable" disabled></el-checkbox> </template
        ></el-table-column>
        <el-table-column label="Nds Payer">
          <template #default="{ row }">
            <el-checkbox v-model="row.ndsPayer" disabled></el-checkbox> </template
        ></el-table-column>
        <el-table-column prop="releaseDate" label="Release Date" />
        <el-table-column prop="subjectOfLeasing" label="Subject Of Leasing" />
        <el-table-column prop="typeOfSupplier" label="Type Of Supplier" />
      </el-table> </el-col
  ></el-row>
</template>
