import request from '@/utils/request'

// 查询专家列表
export function listExpert(query) {
  return request({
    url: '/system/expert/list',
    method: 'get',
    params: query
  })
}

// 查询专家详细
export function getExpert(id) {
  return request({
    url: '/system/expert/' + id,
    method: 'get'
  })
}

