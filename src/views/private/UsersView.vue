<template>
  <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
    <el-tab-pane label="Cliens" name="clients" lazy
      ><UsersClientsPart></UsersClientsPart
    ></el-tab-pane>
    <el-tab-pane label="Leasing companies" name="companies" lazy
      ><UsersCompaniesPart></UsersCompaniesPart
    ></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import UsersClientsPart from '../../partials/UsersClientsPart.vue'
import UsersCompaniesPart from '../../partials/UsersCompaniesPart.vue'

const activeName = ref<string | number | undefined>('clients')
</script>
