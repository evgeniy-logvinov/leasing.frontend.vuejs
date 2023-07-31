<script lang="ts" setup>
import { FormRules } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { emailRules, innRules, nameRules } from '../utils/rules'

interface UsersClientsNew {
  name: string
  inn: number | null
  email: string
}
const form: UsersClientsNew = reactive({
  name: '',
  inn: null,
  email: ''
})

const rules = reactive<FormRules>({
  email: emailRules,
  inn: innRules,
  name: nameRules
})

const formValidity = ref<{
  email: boolean
  inn: boolean
  name: boolean
}>({
  email: false,
  inn: false,
  name: false
})

const formValid = computed(() => {
  return formValidity.value.email && formValidity.value.inn && formValidity.value.name
})

const validateForm = (propName: string, isValid: boolean) => {
  ;(formValidity.value as any)[propName] = isValid
}

const emit = defineEmits(['create', 'cancel'])

const onCreate = () => {
  emit('create', form)
}

const onCancel = () => {
  form.email = ''
  form.inn = null
  form.name = ''
  emit('cancel')
}
</script>

<template>
  <el-form
    :model="form"
    label-width="120px"
    :rules="rules"
    label-position="top"
    @submit.prevent
    @validate="validateForm"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Inn" prop="inn">
      <el-input v-model="form.inn" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :disabled="!form.email || !form.inn || !form.name || !formValid"
        @click="onCreate"
        >Create</el-button
      >
      <el-button @click="onCancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
