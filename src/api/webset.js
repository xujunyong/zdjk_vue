import request from '@/utils/request'

// 查询官网信息管理页面列表
export function listWebset(query) {
  return request({
    url: '/system/webset/list',
    method: 'get',
    params: query
  })
}

// 查询官网信息管理页面详细
export function getWebset(id) {
  return request({
    url: '/system/webset/' + id,
    method: 'get'
  })
}
