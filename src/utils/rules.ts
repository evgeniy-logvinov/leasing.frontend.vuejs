import { FormItemRule } from 'element-plus'
import { Arrayable } from 'element-plus/es/utils'
import { validateEmail, validateInn, validateName, validatePassword } from './validator'

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

export const innRules: Arrayable<FormItemRule> = [
  { validator: validateInn, trigger: 'blur' },
  { min: 11, max: 13, message: 'Length should be 12', trigger: 'blur' }
]

export const nameRules: Arrayable<FormItemRule> = [{ validator: validateName, trigger: 'blur' }]
