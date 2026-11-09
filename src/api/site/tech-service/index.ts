import request from '@/config/axios'

// 技术服务 响应 VO
export interface TechServiceRespVO {
  id: number
  industry: string
  icon: string
  description: string
  sort: number
  status: number
  createTime: string
  updateTime: string
}

// 技术服务 保存/更新 Request VO
export interface TechServiceSaveReqVO {
  id?: number
  industry: string
  icon?: string
  description?: string
  sort: number
  status: number
}

// 技术服务 分页查询 Request VO
export interface TechServicePageReqVO {
  pageNo: number
  pageSize: number
  industry?: string
  status?: number
  createTime?: string[]
}

// 创建技术服务
export const createTechService = (data: TechServiceSaveReqVO) => {
  return request.post({ url: '/site/tech-service/create', data })
}

// 更新技术服务
export const updateTechService = (data: TechServiceSaveReqVO) => {
  return request.put({ url: '/site/tech-service/update', data })
}

// 删除技术服务
export const deleteTechService = (id: number) => {
  return request.delete({ url: '/site/tech-service/delete?id=' + id })
}

// 获得技术服务
export const getTechService = (id: number) => {
  return request.get<TechServiceRespVO>({ url: '/site/tech-service/get', params: { id } })
}

// 获得技术服务分页
export const getTechServicePage = (params: TechServicePageReqVO) => {
  return request.get({ url: '/site/tech-service/page', params })
}
