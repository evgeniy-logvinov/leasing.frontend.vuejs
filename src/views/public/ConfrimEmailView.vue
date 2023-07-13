<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from 'vue-router'
import { useUserStore } from "../../stores/user"
const {params} = useRoute()
const { confirmEmail } = useUserStore()

const id = ref<string>('')
onMounted(() => {
  id.value = params.id as string
})

const onConfirm = async () => {
    await confirmEmail(id.value)
}
</script>
<template>
    Confirm email
    {{ id }}
    <el-button @click="onConfirm">Confirm email</el-button>
</template>