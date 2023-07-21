import { ElLoading } from 'element-plus'

export const getLoading = () => {
  return ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.8)'
  })
}
