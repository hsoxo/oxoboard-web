export interface UserInfo {
  email: string
  username: string
  nickname: string
}

export interface GlobalState {
  userInfo: UserInfo | null
}
