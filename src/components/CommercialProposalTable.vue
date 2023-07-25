<script lang="ts" setup>
import { CompanyProposalResult } from '../interfaces/CompanyProposalResult'
const props = defineProps<{
  companyProposals: CompanyProposalResult[]
}>()
</script>
<template>
  <el-row class="w-full p-4"
    ><el-col :span="24">
      <el-table :data="props.companyProposals">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="leasingCompany.companyProfile.fullName" label="LC Name" />
        <el-table-column prop="result" label="Result" />
        <el-table-column prop="topFive" label="Top Five" />
        <el-table-column prop="analitic.firstName" label="Analitic" />
        <el-table-column prop="created" label="Date" />
        <el-table-column prop="manager.firstName" label="Manager" />
      </el-table> </el-col
  ></el-row>
</template>
