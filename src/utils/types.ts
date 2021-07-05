export type UserActionTypes =
  | 'login'
  | 'input'
  | 'success'
  | 'error'
  | 'validation'

export type UserAction = {
  type: UserActionTypes
  value?: string
  name: string
  error?: any
  errorCode?: number
  isEmpty?: boolean
}
export type UserState = {
  username: string
  password: string
  confirmPassword?: string
  done?: boolean
  error?: boolean
  errorCode?: number
  isEmpty?: boolean
}

export type IUser = {
  username: string
  password: string
  confirmPassword?: string
}
