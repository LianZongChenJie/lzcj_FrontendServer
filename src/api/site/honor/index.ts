import request from '@/config/axios'

// 资质荣誉 响应 VO
export interface HonorRespVO {
  id: number
  name: string
  image: string
  images: string[]
  type: string
  date: string
  sort: number
  status: number
  createTime: string
  updateTime: string
}

// 资质荣誉 保存/更新 Request VO（单图）
export interface HonorSaveReqVO {
  id?: number
  name: string
  image: string
  type: string
  date: string
  sort: number
  status: number
}

// 资质荣誉 分页查询 Request VO
export interface HonorPageReqVO {
  pageNo: number
  pageSize: number
  name?: string
  type?: string
  status?: number
  sort?: number
  createTime?: string[]
}

// 创建资质荣誉
export const createHonor = (data: HonorSaveReqVO) => {
  return request.post({ url: '/site/honor/create', data })
}

// 更新资质荣誉
export const updateHonor = (data: HonorSaveReqVO) => {
  return request.put({ url: '/site/honor/update', data })
}

// 删除资质荣誉
export const deleteHonor = (id: number) => {
  return request.delete({ url: '/site/honor/delete?id=' + id })
}

// 获得资质荣誉
export const getHonor = (id: number) => {
  return request.get<HonorRespVO>({ url: '/site/honor/get', params: { id } })
}

// 获得资质荣誉分页
export const getHonorPage = (params: HonorPageReqVO) => {
  return request.get({ url: '/site/honor/page', params })
}
