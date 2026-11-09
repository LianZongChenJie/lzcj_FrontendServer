import request from '@/config/axios'

// 公司介绍 响应 VO
export interface CompanyIntroRespVO {
  id: number
  description: string
  images: string[]
  version: number
  status: number
  createTime: string
  updateTime: string
}

// 公司介绍 保存/更新 Request VO
export interface CompanyIntroSaveReqVO {
  id?: number
  description: string
  images?: string[]
  version: number
  status: number
}

// 公司介绍 分页查询 Request VO
export interface CompanyIntroPageReqVO {
  pageNo: number
  pageSize: number
  version?: number
  status?: number
  createTime?: string[]
}

// 创建公司介绍版本
export const createCompanyIntro = (data: CompanyIntroSaveReqVO) => {
  return request.post({ url: '/site/company-intro/create', data })
}

// 更新公司介绍
export const updateCompanyIntro = (data: CompanyIntroSaveReqVO) => {
  return request.put({ url: '/site/company-intro/update', data })
}

// 删除公司介绍版本
export const deleteCompanyIntro = (id: number) => {
  return request.delete({ url: '/site/company-intro/delete?id=' + id })
}

// 获得公司介绍
export const getCompanyIntro = (id: number) => {
  return request.get<CompanyIntroRespVO>({ url: '/site/company-intro/get', params: { id } })
}

// 获得公司介绍分页
export const getCompanyIntroPage = (params: CompanyIntroPageReqVO) => {
  return request.get({ url: '/site/company-intro/page', params })
}
