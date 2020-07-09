import requests from '@/utils/request'

export function createChatRoom(userCode: string) {
  return requests({
    url: '/api/chatroom',
    method: "POST",
    data: {
      userCode
    }
  })
}

export function fetchChatroomInfo(roomId: string) {
  return requests({
    url: `/api/chatroom/${roomId}`,
    method: "GET",
    data: {
      userCode: 'demo'
    }
  })
}