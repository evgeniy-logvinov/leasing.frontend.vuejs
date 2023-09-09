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
        <el-table-column prop="brand" label="Time and date of income from LC" />
        <el-table-column prop="country" label="Should approve before date" />
        <el-table-column prop="isNew" label="Request №" />
        <el-table-column prop="model" label="Request type" />
        <el-table-column prop="model" label="Analitic" />
        <el-table-column prop="releaseDate" label="Expired at" />
        <el-table-column prop="subjectOfLeasing" label="Reject" />
        <el-table-column prop="typeOfSupplier" label="Make CP" />
        <el-table-column prop="typeOfSupplier" label="Save resolution" />
      </el-table> </el-col
  ></el-row>
</template>
