<script lang="ts" setup>
import { Company } from '../interfaces/Company'

const props = defineProps<{
  companies: Company[]
}>()
const emit = defineEmits(['addNew', 'invite', 'block', 'unblock', 'description', 'accreditation'])

const addNew = () => {
  emit('addNew')
}

const onInvite = (id: string) => {
  emit('invite', { id })
}

const onBlock = (id: string) => {
  emit('block', { id })
}

const onUnblock = (id: string) => {
  emit('unblock', { id })
}

const onSaveDescription = (id: string, description: string) => {
  emit('description', { id, description })
}

const onChangeAccreditation = (id: string, accreditation: boolean) => {
  console.log('accreditation', accreditation)
  emit('accreditation', { id, accreditation })
}
</script>

<template>
  <el-row class="w-full p-4"
    ><el-col :span="24">
      <el-button @click="addNew">Add new company</el-button>
      <el-table :data="props.companies" style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="companyProfile.fullName" label="Full name" />
        <el-table-column prop="companyProfile.inn" label="Number" />
        <el-table-column prop="user.email" label="Email" />
        <el-table-column prop="companyProfile.state" label="State" />
        <el-table-column prop="companyProfile.agreement" label="Agreement" />
        <el-table-column label="Accreditation">
          <template #default="{ row }">
            <el-checkbox
              v-model="row.companyProfile.accreditation"
              @change="
                onChangeAccreditation(row.companyProfile.id, row.companyProfile.accreditation)
              "
            ></el-checkbox> </template
        ></el-table-column>
        <el-table-column label="Description">
          <template #default="{ row }">
            <el-input
              v-model="row.description"
              @change="onSaveDescription(row.id, row.description)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="Actions">
          <template
            #default="{
              row: {
                companyProfile: { id, state }
              }
            }"
          >
            <el-button v-if="state === 'UNREG'" size="small" class="mr-2" @click="onInvite(id)"
              >Invite</el-button
            >
            <el-button v-else-if="state === 'REG'" size="small" class="mr-2" @click="onBlock(id)"
              >Block</el-button
            >
            <el-button
              v-else-if="state === 'BLOCKED'"
              size="small"
              class="mr-2"
              @click="onUnblock(id)"
              >Unblock</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col></el-row
  >
</template>
