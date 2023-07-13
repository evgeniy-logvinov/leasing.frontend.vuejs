<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '../../stores/user'
import router from '../../router'
import type { FormRules } from 'element-plus'
import { type LocationQuery, useRoute } from 'vue-router'

const error = ref<string | null>(null)
const verify = ref<boolean>(false)
const agree = ref<boolean>(false)
const form: {
  email: string
  password: string
  confirmPassword: string
} = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const onSignUp = async () => {
  try {
    const { signUp } = useUserStore()
    await signUp({ ...form })
    verify.value = true
  } catch (err) {
    error.value = (err as Error).message
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input email address'))
  } else {
    callback()
  }
}

const validateConfirmPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else if (value !== form.password) {
    callback(new Error('The password confirmation doesn’t match'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  // email: [
  //   { validator: validateEmail, trigger: 'blur' },
  //   {
  //     type: 'email',
  //     message: 'Please input correct email address',
  //     trigger: ['blur']
  //   }
  // ],
  // password: [{ validator: validatePass, trigger: 'blur' }],
  // confirmPassword: [{ validator: validateConfirmPass, trigger: 'blur' }]
})

const goToSignIn = () => {
  verify.value = false
    router.push({ name: 'LogIn' })
}
</script>

<template>
  <!-- <el-container class="justify-center"> -->
    <el-row class="content m-4">
      <el-col v-if="!verify" class="flex justify-center mt-12">
        <el-form
          :model="form"
          :rules="rules"
          class="w-full sm:w-2/3 lg:w-1/3"
          label-width="120px"
          label-position="top"
          @submit.prevent
        >
          <el-form-item prop="email" label="E-mail">
            <el-input v-model="form.email" size="large" />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="form.password"
              size="large"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="Confirm password" prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              size="large"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="agree" class="p-0 m-0 w-full">
              <div class="truncate">
                <span class="align-middle">I agree to the</span>

                <el-link underline href="https://fluenta.ai/offer" target="_blank"
                  >Terms and Conditions</el-link
                >
                <span class="align-middle">and</span>
                <el-link
                  underline
                  href="https://fluenta.ai/privacy"
                  target="_blank"
                  >Privacy Policy</el-link
                >
              </div>
            </el-checkbox>
          </el-form-item>
          <el-form-item v-if="error">
            <span class="text-orange-500">{{ error }}</span>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="
                !agree || !form.email || !form.password || !form.confirmPassword
              "
              class="w-full"
              round
              size="large"
              @click="onSignUp"
              >Sign up</el-button
            >
            <el-col class="text-center">
              <span class="align-middle">Already have an account?</span>
              <el-button link type="primary" @click="goToSignIn"
                >Log in</el-button
              >
            </el-col>
          </el-form-item>
        </el-form></el-col
      ><el-col v-else class="flex justify-center mt-12 flex-col items-center">
        <div>
          Link send on your email. Please verify your email and log in to the
          system
        </div>
        <div class="mt-4">
          <el-button round type="primary" @click="goToSignIn"
            >To Log in</el-button
          >
        </div>
      </el-col>
    </el-row>
  <!-- </el-container> -->
</template>
<style scoped lang="scss">
// .content:after {
//   content: '';
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: -1;
//   -webkit-overflow-scrolling: touch;
//   background-image: url('https://static.tildacdn.com/tild3330-3161-4465-b264-396461383031/shutterstock_2131199.jpg');
//   background-repeat: no-repeat;
//   background-position: center;
//   -webkit-background-size: cover;
//   background-size: cover;
//   min-height: 100%;
//   height: 100vh;
//   background-attachment: initial;
//   -webkit-transform: translate3d(0, 0, 0);
//   transform: translate3d(0, 0, 0);
//   transition: all 0.2s linear;
// }

.el-link {
  margin-left: 4px;
  margin-right: 4px;
}
:deep(.el-checkbox__label) {
  width: 100%;
}
.el-checkbox__label {
  width: 100%;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>
