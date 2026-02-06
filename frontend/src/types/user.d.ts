export interface User {
  id: string
  username: string
  email: string
  phone?: string
  avatar?: string
  status: string
  roles: string[]
  createdAt: string
}

export interface LoginForm {
  username: string
  password: string
  captcha?: string
}

export interface UserInfo extends User {
  permissions: string[]
}
