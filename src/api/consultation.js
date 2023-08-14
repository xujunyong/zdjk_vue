import request from '@/utils/request'

// 查询全过程咨询列表
export function listConsultation(query) {
  return request({
    url: '/system/consultation/list',
    method: 'get',
    params: query
  })
}

// 查询全过程咨询详细
export function getConsultation(id) {
  return request({
    url: '/system/consultation/' + id,
    method: 'get'
  })
}

// 新增全过程咨询
export function addConsultation(data) {
  return request({
    url: '/system/consultation',
    method: 'post',
    data: data
  })
}

// 修改全过程咨询
export function updateConsultation(data) {
  return request({
    url: '/system/consultation',
    method: 'put',
    data: data
  })
}

// 删除全过程咨询
export function delConsultation(id) {
  return request({
    url: '/system/consultation/' + id,
    method: 'delete'
  })
}
