import request from '@/config/axios'

// 员工风采 响应 VO
export interface TeamGalleryRespVO {
  id: number
  image: string
  images: string[]
  description: string
  sort: number
  status: number
  createTime: string
  updateTime: string
}

// 员工风采 保存/更新 Request VO（单图）
export interface TeamGallerySaveReqVO {
  id?: number
  image: string
  description: string
  sort: number
  status: number
}

// 员工风采 分页查询 Request VO
export interface TeamGalleryPageReqVO {
  pageNo: number
  pageSize: number
  sort?: number
  status?: number
  createTime?: string[]
}

// 创建员工风采
export const createTeamGallery = (data: TeamGallerySaveReqVO) => {
  return request.post({ url: '/site/team-gallery/create', data })
}

// 更新员工风采
export const updateTeamGallery = (data: TeamGallerySaveReqVO) => {
  return request.put({ url: '/site/team-gallery/update', data })
}

// 删除员工风采
export const deleteTeamGallery = (id: number) => {
  return request.delete({ url: '/site/team-gallery/delete?id=' + id })
}

// 获得员工风采
export const getTeamGallery = (id: number) => {
  return request.get<TeamGalleryRespVO>({ url: '/site/team-gallery/get', params: { id } })
}

// 获得员工风采分页
export const getTeamGalleryPage = (params: TeamGalleryPageReqVO) => {
  return request.get({ url: '/site/team-gallery/page', params })
}
