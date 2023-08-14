export interface Ip {
  id: string
  hasIp: boolean
  hasPsn: boolean
  psnRegistrationPeriod: number
  hasOsn: boolean
  osnRegistrationPeriod: number
  hasUsn: boolean
  usnRegistrationPeriod: number
  hasEnvd: boolean
  envdRegistrationPeriod: number
  hasEchn: boolean
  echnRegistrationPeriod: number
  coastFromAtOne: number
  coastToAtOne: number
  maxAllSum: number
  hasRestrictions: number
  minAdvance: number
  maxPeriodOfFinancing: number
  forTaxi: boolean
}
