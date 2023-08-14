import request from '@/utils/request'

// 查询公司简介列表
export function listProfile(query) {
  return request({
    url: '/system/profile/list',
    method: 'get',
    params: query
  })
}

// 查询公司简介列表
export function listNoFirst(query) {
  return request({
    url: '/system/profile/listNoFirst',
    method: 'get',
    params: query
  })
}

// 查询公司简介详细
export function getProfile(id) {
  return request({
    url: '/system/profile/' + id,
    method: 'get'
  })
}

// 新增公司简介
export function addProfile(data) {
  return request({
    url: '/system/profile',
    method: 'post',
    data: data
  })
}

// 修改公司简介
export function updateProfile(data) {
  return request({
    url: '/system/profile',
    method: 'put',
    data: data
  })
}

// 删除公司简介
export function delProfile(id) {
  return request({
    url: '/system/profile/' + id,
    method: 'delete'
  })
}
