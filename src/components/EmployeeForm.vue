<script lang="ts" setup>
import { reactive } from 'vue'
import { EmployeeUser } from '~/interfaces/EmployeeUser'

// const form: EmployeeUser = reactive({
//   id: '',
//   firstName: '',
//   lastName: '',
//   patronymic: '',
//   phone: '',
//   mobilePhone: '',
//   isOnline: false,
//   user: { email: '' }
// })
const props = defineProps<{
  employee?: EmployeeUser
}>()
</script>

<template>
  <el-form :model="props.employee" label-width="120px" label-position="top" @submit.prevent>
    <el-form-item label="First name" prop="firstName">
      <el-input :model-value="props.employee?.firstName" />
    </el-form-item>
    <el-form-item label="Last name" prop="lastName">
      <el-input :model-value="props.employee?.lastName" />
    </el-form-item>
    <el-form-item label="Patronymic" prop="patronymic">
      <el-input :model-value="props.employee?.patronymic" />
    </el-form-item>
    <el-form-item label="Phone" prop="phone">
      <el-input :model-value="props.employee?.phone" />
    </el-form-item>
    <el-form-item label="Mobile Phone" prop="mobilePhone">
      <el-input :model-value="props.employee?.mobilePhone" />
    </el-form-item>
    <el-form-item label="Is online" prop="isOnline">
      <el-input :model-value="props.employee?.isOnline" />
    </el-form-item>
    <el-form-item label="Email" prop="user.email">
      <el-input :model-value="props.employee?.user.email" />
    </el-form-item>
  </el-form>
</template>
