import { isAxiosError } from 'axios'
import { ElNotification } from 'element-plus'

export const showError = (err: unknown): void => {
  console.log(err)
  ElNotification({
    title: 'Error',
    message: err instanceof Error ? err.message : (err as string),
    type: 'error'
  })
}

export const getErrorMessage = (err: unknown): string => {
  if (isAxiosError(err) && err.response && err.response.data.message) {
    return err.response.data.message
  } else {
    return (err as Error).message
  }
}
