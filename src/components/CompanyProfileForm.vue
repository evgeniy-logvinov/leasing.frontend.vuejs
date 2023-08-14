<script lang="ts" setup>
import { FormRules } from 'element-plus'
import { computed, reactive, ref, watchEffect } from 'vue'
import { CompanyProfile } from '~/interfaces/CompanyProfile'
import { emailRules, innRules, nameRules } from '../utils/rules'

const props = defineProps<{
  company?: CompanyProfile
}>()

const form = ref<CompanyProfile>({
  id: '',
  fullName: '',
  inn: '',
  shortName: '',
  state: null,
  accreditation: false,
  agreement: ''
})

watchEffect(() => {
  console.log('new field', props.company)
  if (props.company) {
    form.value = props.company
  }
})

const rules = reactive<FormRules>({
  // email: emailRules,
  // inn: innRules,
  // name: nameRules
})

const formValidity = ref<{
  // email: boolean
  // inn: boolean
  // name: boolean
}>({
  // email: false,
  // inn: false,
  // name: false
})

const formValid = computed(() => {
  return true
  // return formValidity.value.email && formValidity.value.inn && formValidity.value.name
})

const validateForm = (propName: string, isValid: boolean) => {
  ;(formValidity.value as any)[propName] = isValid
}

const emit = defineEmits(['save'])

const onSave = () => {
  emit('save', form.value)
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
    <el-form-item label="Full name" prop="fullName">
      <el-input v-model="form.fullName" />
    </el-form-item>
    <el-form-item label="Short name" prop="shortName">
      <el-input v-model="form.shortName" />
    </el-form-item>
    <el-form-item label="Inn" prop="inn">
      <el-input v-model="form.inn" />
    </el-form-item>
    <el-form-item label="State" prop="state">
      <el-input v-model="form.state" />
    </el-form-item>
    <el-form-item label="State" prop="state">
      <el-input v-model="form.accreditation" />
    </el-form-item>
    <el-form-item label="State" prop="state">
      <el-input v-model="form.agreement" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :disabled="!form.fullName || !form.inn || !form.state || !form.shortName || !formValid"
        @click="onSave"
        >Save</el-button
      >
    </el-form-item>
  </el-form>
</template>
