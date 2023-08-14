import request from '@/utils/request'

// 查询论坛文章评论列列表
export function listComment(query) {
  return request({
    url: '/system/comment/list',
    method: 'get',
    params: query
  })
}

// 查询论坛文章评论列详细
export function getComment(articleId) {
  return request({
    url: '/system/comment/' + articleId,
    method: 'get'
  })
}

// 新增论坛文章评论列
export function addComment(data) {
  return request({
    url: '/system/comment',
    method: 'post',
    data: data
  })
}

// 修改论坛文章评论列
export function updateComment(data) {
  return request({
    url: '/system/comment',
    method: 'put',
    data: data
  })
}

// 删除论坛文章评论列
export function delComment(articleId) {
  return request({
    url: '/system/comment/' + articleId,
    method: 'delete'
  })
}
