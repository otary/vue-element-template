import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-template/user/logout',
    method: 'post'
  })
}
