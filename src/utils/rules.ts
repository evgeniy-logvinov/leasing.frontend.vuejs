import { FormItemRule } from 'element-plus'
import { Arrayable } from 'element-plus/es/utils'
import { validateEmail, validatePassword } from './validator'

export const emailRules: Arrayable<FormItemRule> = [
  { validator: validateEmail, trigger: 'blur' },
  {
    type: 'email',
    message: 'Please input correct email address',
    trigger: ['blur']
  }
]

export const passwordRules: Arrayable<FormItemRule> = [
  { validator: validatePassword, trigger: 'blur' }
]
