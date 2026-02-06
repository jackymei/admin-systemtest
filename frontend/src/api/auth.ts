import request from '@/utils/request'
import type { LoginForm, UserInfo } from '@/types/user'

export function login(data: LoginForm) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}

export function getUserInfo(): Promise<UserInfo> {
  return request({
    url: '/auth/user',
    method: 'get',
  })
}
