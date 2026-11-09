import request from '@/config/axios'

// 企业文化 响应 VO
export interface CultureRespVO {
  id: number
  mission: string
  vision: string
  values: string
  version: number
  status: number
  createTime: string
  updateTime: string
}

// 企业文化 保存/更新 Request VO
export interface CultureSaveReqVO {
  id?: number
  mission: string
  vision: string
  values: string
  version: number
  status: number
}

// 企业文化 分页查询 Request VO
export interface CulturePageReqVO {
  pageNo: number
  pageSize: number
  version?: number
  status?: number
  createTime?: string[]
}

// 创建企业文化版本
export const createCulture = (data: CultureSaveReqVO) => {
  return request.post({ url: '/site/company-culture/create', data })
}

// 更新企业文化
export const updateCulture = (data: CultureSaveReqVO) => {
  return request.put({ url: '/site/company-culture/update', data })
}

// 删除企业文化
export const deleteCulture = (id: number) => {
  return request.delete({ url: '/site/company-culture/delete?id=' + id })
}

// 获得企业文化
export const getCulture = (id: number) => {
  return request.get<CultureRespVO>({ url: '/site/company-culture/get', params: { id } })
}

// 获得企业文化分页
export const getCulturePage = (params: CulturePageReqVO) => {
  return request.get({ url: '/site/company-culture/page', params })
}
