import { ElNotification } from 'element-plus'

export const showError = (err: Error | string): void => {
  console.log(err)
  ElNotification({
    title: 'Error',
    message: err instanceof Error ? err.message : err,
    type: 'error'
  })
}
