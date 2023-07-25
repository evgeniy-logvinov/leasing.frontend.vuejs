export const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

export const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input email address'))
  } else {
    callback()
  }
}

export const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input name'))
  } else {
    callback()
  }
}

export const validateInn = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input inn'))
  } else if (isNaN(value)) {
    callback(new Error('Should be a number'))
  } else if (value.length !== 12) {
    callback(new Error(`Length should be 12. Current length ${value.length}`))
  } else {
    callback()
  }
}
