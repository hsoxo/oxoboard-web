export interface UserInfo {
  email: string
  password: string
  uid: number
  username: string
}

export interface GlobalState {
  userInfo: UserInfo | null
}
