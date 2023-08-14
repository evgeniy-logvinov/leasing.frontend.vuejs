export interface Legal {
  id: string
  hasLegalEntity: boolean
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
  hasRestrictions: boolean
  minAdvance: number
  maxPeriodOfFinancing: number
  forTaxi: boolean
}
