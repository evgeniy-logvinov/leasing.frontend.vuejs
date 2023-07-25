<template>
  <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
    <el-tab-pane label="Cliens" name="clients" lazy><ClientsPart></ClientsPart></el-tab-pane>
    <el-tab-pane label="Leasing companies" name="companies" lazy
      ><CompaniesPart></CompaniesPart
    ></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import ClientsPart from '../../partials/ClientsPart.vue'
import CompaniesPart from '../../partials/CompaniesPart.vue'

const activeName = ref<string | number | undefined>('clients')
</script>
