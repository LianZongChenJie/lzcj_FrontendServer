import request from '@/config/axios'

// 新闻 响应 VO
export interface NewsRespVO {
  id: number
  title: string
  cover: string
  summary: string
  content: string
  author: string
  publishDate: string
  status: number
  createTime: string
  updateTime: string
}

// 新闻 保存/更新 Request VO
export interface NewsSaveReqVO {
  id?: number
  title: string
  cover: string
  summary: string
  content: string
  author: string
  publishDate: string
  status: number
}

// 新闻 分页查询 Request VO
export interface NewsPageReqVO {
  pageNo: number
  pageSize: number
  title?: string
  author?: string
  status?: number
  createTime?: string[]
}

// 创建新闻
export const createNews = (data: NewsSaveReqVO) => {
  return request.post({ url: '/site/news/create', data })
}

// 更新新闻
export const updateNews = (data: NewsSaveReqVO) => {
  return request.put({ url: '/site/news/update', data })
}

// 删除新闻
export const deleteNews = (id: number) => {
  return request.delete({ url: '/site/news/delete?id=' + id })
}

// 获得新闻
export const getNews = (id: number) => {
  return request.get<NewsRespVO>({ url: '/site/news/get', params: { id } })
}

// 获得新闻分页
export const getNewsPage = (params: NewsPageReqVO) => {
  return request.get({ url: '/site/news/page', params })
}
