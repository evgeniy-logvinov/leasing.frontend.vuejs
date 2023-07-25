<script setup lang="ts">
import { CompanyStateEnum } from '../enums/CompanyStateEnum'
import { Application } from '../interfaces/Application'
import { CompanyProposalResult } from '../interfaces/CompanyProposalResult'

const props = defineProps<{
  application: Application
}>()

const emits = defineEmits(['back'])
const onBack = () => {
  emits('back')
}
const companyProposals: CompanyProposalResult[] = [
  {
    id: 1,
    leasingCompany: {
      id: 1,
      description: '',
      companyProfile: {
        id: 1,
        fullName: 'string',
        shortName: 'string',
        state: CompanyStateEnum.REG,
        inn: 12343243,
        agreement: 'ssadasd',
        accreditation: false
      },
      user: { email: 'aa' }
    },
    analitic: { id: 1, firstName: 'Ivanov' },
    result: 'APPROVED',
    topFive: 'YES',
    created: '28-12-2017',
    manager: { id: 1, firstName: 'Petrov' }
  }
]
</script>
<template>
  <el-button @click="onBack">Back</el-button>

  <el-form :model="props.application" label-width="120px" label-position="top">
    <el-form-item prop="isNew">
      <el-checkbox label="Is new" :model-value="props.application.isNew" />
    </el-form-item>
    <el-form-item label="Brand" prop="brand">
      <el-input :model-value="props.application.brand" />
    </el-form-item>
    <el-form-item label="Country" prop="country">
      <el-input :model-value="props.application.country" />
    </el-form-item>
    <el-form-item prop="returnable">
      <el-checkbox label="Returnable" :model-value="props.application.returnable" />
    </el-form-item>
    <el-form-item label="Model" prop="model">
      <el-input :model-value="props.application.model" />
    </el-form-item>
    <el-form-item prop="ndsPayer">
      <el-checkbox label="Nds payer" :model-value="props.application.ndsPayer" />
    </el-form-item>
    <el-form-item label="Release date" prop="releaseDate">
      <el-input :model-value="props.application.releaseDate" />
    </el-form-item>
    <el-form-item label="Subject of leasing" prop="subjectOfLeasing">
      <el-input :model-value="props.application.subjectOfLeasing" />
    </el-form-item>
    <el-form-item label="Type of supplier" prop="typeOfSupplier">
      <el-input :model-value="props.application.typeOfSupplier" />
    </el-form-item>
  </el-form>
  <CommercialProposalTable :companyProposals="companyProposals"></CommercialProposalTable>
</template>
