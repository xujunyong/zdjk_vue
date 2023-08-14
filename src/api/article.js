import request from '@/utils/request'

// 查询论坛文章列列表
export function listArticle(query) {
  return request({
    url: '/system/article/list',
    method: 'get',
    params: query
  })
}

// 查询论坛文章详情页时给文章观看值加一
export function setLooked(query) {
  return request({
    url: '/system/article/setLooked',
    method: 'get',
    params: query
  })
}

// 查询论坛文章列详细
export function getArticle(articleId) {
  return request({
    url: '/system/article/' + articleId,
    method: 'get'
  })
}

// 新增论坛文章列
export function addArticle(data) {
  return request({
    url: '/system/article',
    method: 'post',
    data: data
  })
}

// 修改论坛文章列
export function updateArticle(data) {
  return request({
    url: '/system/article',
    method: 'put',
    data: data
  })
}

// 删除论坛文章列
export function delArticle(articleId) {
  return request({
    url: '/system/article/' + articleId,
    method: 'delete'
  })
}
