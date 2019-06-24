import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'user/list',
    method: 'post',
    params
  })
}

export function add(params) {
  return request({
    url: 'user/add',
    method: 'post',
    params
  })
}

export function update(params) {
  return request({
    url: 'user/update',
    method: 'post',
    params
  })
}

export function remove(params) {
  return request({
    url: 'user/remove',
    method: 'post',
    params
  })
}

