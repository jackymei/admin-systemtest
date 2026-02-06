import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, logout, getUserInfo } from '@/api/auth'
import { setToken, removeToken } from '@/utils/auth'
import type { LoginForm, UserInfo } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('admin_token') || '')
  const userInfo = ref<UserInfo | null>(null)
  const roles = ref<string[]>([])

  async function loginAction(data: LoginForm) {
    const res = await login(data)
    token.value = res.accessToken
    setToken(res.accessToken)
    await getUserInfoAction()
  }

  async function getUserInfoAction() {
    const res = await getUserInfo()
    userInfo.value = res
    roles.value = res.roles || []
    localStorage.setItem('user_roles', JSON.stringify(res.roles))
  }

  async function logoutAction() {
    await logout()
    token.value = ''
    userInfo.value = null
    roles.value = []
    removeToken()
  }

  return {
    token,
    userInfo,
    roles,
    loginAction,
    getUserInfoAction,
    logoutAction,
  }
})
