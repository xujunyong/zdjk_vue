import request from '@/utils/request'

// 查询企业banner图列表
export function listBanner(query) {
  return request({
    url: '/system/banner/list',
    method: 'get',
    params: query
  })
}

// 查询企业banner图详细
export function getBanner(id) {
  return request({
    url: '/system/banner/' + id,
    method: 'get'
  })
}

// 新增企业banner图
export function addBanner(data) {
  return request({
    url: '/system/banner',
    method: 'post',
    data: data
  })
}

// 修改企业banner图
export function updateBanner(data) {
  return request({
    url: '/system/banner',
    method: 'put',
    data: data
  })
}

// 删除企业banner图
export function delBanner(id) {
  return request({
    url: '/system/banner/' + id,
    method: 'delete'
  })
}
