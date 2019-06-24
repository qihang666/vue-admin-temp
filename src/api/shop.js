import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'shop/list',
    method: 'post',
    params
  })
}

export function add(params) {
  return request({
    url: 'shop/add',
    method: 'post',
    params
  })
}

export function update(params) {
  return request({
    url: 'shop/update',
    method: 'post',
    params
  })
}

export function remove(params) {
  return request({
    url: 'shop/remove',
    method: 'post',
    params
  })
}

