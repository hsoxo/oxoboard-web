import requests from '@/utils/request'

export function login(username: string, password: string) {
  return requests({
    url: '/api/user',
    method: "POST",
    data: {
      username,
      password
    }
  })
}

export function getUserInfo() {
  return requests({
    url: '/api/user',
    method: "GET",
  })
}
