<script lang="ts" setup>
import { FormRules } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { ApplicationNew } from '../interfaces/ApplicationNew'
import { emailRules, innRules, nameRules } from '../utils/rules'

const form: ApplicationNew = reactive({
  isNew: false,
  brand: '',
  country: '',
  returnable: false,
  model: '',
  ndsPayer: false,
  releaseDate: '',
  subjectOfLeasing: null,
  typeOfSupplier: null
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
  form.isNew = false
  form.brand = ''
  form.country = ''
  form.returnable = false
  form.model = ''
  form.ndsPayer = false
  form.releaseDate = ''
  form.subjectOfLeasing = null
  form.typeOfSupplier = null
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
    <el-form-item label="Returnable" prop="returnable">
      <el-checkbox v-model="form.returnable" />
    </el-form-item>
    <el-form-item label="Subject of Leasing" prop="subjectOfLeasing">
      <el-input v-model="form.subjectOfLeasing" />
    </el-form-item>
    <el-form-item label="Brand" prop="brand">
      <el-input v-model="form.brand" />
    </el-form-item>
    <el-form-item label="Model" prop="model">
      <el-input v-model="form.model" />
    </el-form-item>
    <el-form-item label="Country" prop="country">
      <el-input v-model="form.country" />
    </el-form-item>
    <el-form-item label="Is new" prop="isNew">
      <el-checkbox v-model="form.isNew" />
    </el-form-item>
    <el-form-item label="Release date" prop="releaseDate">
      <el-input v-model="form.releaseDate" />
    </el-form-item>
    <el-form-item label="Type of supplier" prop="typeOfSupplier">
      <el-input v-model="form.typeOfSupplier" />
    </el-form-item>
    <el-form-item label="Is nds payer" prop="ndsPayer">
      <el-checkbox v-model="form.ndsPayer" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onCreate">Create</el-button>
      <!-- <el-button
        type="primary"
        :disabled="!form.email || !form.inn || !form.name || !formValid"
        @click="onCreate"
        >Create</el-button
      > -->
      <el-button @click="onCancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
