import request from '@/config/axios'

// 公告 响应 VO
export interface AnnouncementRespVO {
  id: number
  title: string
  summary: string
  content: string
  important: number
  publishDate: string
  status: number
  createTime: string
  updateTime: string
}

// 公告 保存/更新 Request VO
export interface AnnouncementSaveReqVO {
  id?: number
  title: string
  summary: string
  content: string
  important: number
  publishDate: string
  status: number
}

// 公告 分页查询 Request VO
export interface AnnouncementPageReqVO {
  pageNo: number
  pageSize: number
  title?: string
  important?: number
  status?: number
  createTime?: string[]
}

// 创建公告
export const createAnnouncement = (data: AnnouncementSaveReqVO) => {
  return request.post({ url: '/site/announcement/create', data })
}

// 更新公告
export const updateAnnouncement = (data: AnnouncementSaveReqVO) => {
  return request.put({ url: '/site/announcement/update', data })
}

// 删除公告
export const deleteAnnouncement = (id: number) => {
  return request.delete({ url: '/site/announcement/delete?id=' + id })
}

// 获得公告
export const getAnnouncement = (id: number) => {
  return request.get<AnnouncementRespVO>({ url: '/site/announcement/get', params: { id } })
}

// 获得公告分页
export const getAnnouncementPage = (params: AnnouncementPageReqVO) => {
  return request.get({ url: '/site/announcement/page', params })
}
