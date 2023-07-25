<script lang="ts" setup>
import { Client } from '../interfaces/Client'
const props = defineProps<{
  clients: Client[]
}>()
const emit = defineEmits(['addNew', 'invite', 'block', 'unblock', 'description'])

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
</script>

<template>
  <el-row class="w-full p-4"
    ><el-col :span="24">
      <el-button @click="addNew">Add new client</el-button>
      <el-table :data="props.clients" style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="clientProfile.fullName" label="Full name" />
        <el-table-column prop="clientProfile.inn" label="Number" />
        <el-table-column prop="user.email" label="Email" />
        <el-table-column prop="clientProfile.state" label="State" />
        <el-table-column label="Description">
          <template #default="{ row }">
            <el-popover title="Fill description" :width="400">
              <template #reference>
                <span>
                  <el-icon><EditPen /></el-icon>
                  {{ row.description }}
                </span>
              </template>
              <el-input v-model="row.description"></el-input>
              <el-button @click="onSaveDescription(row.id, row.description)">Save</el-button>
            </el-popover></template
          >
        </el-table-column>
        <el-table-column label="Actions">
          <template
            #default="{
              row: {
                clientProfile: { id, state }
              }
            }"
          >
            {{ id }}
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
