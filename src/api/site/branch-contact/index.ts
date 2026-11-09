import request from '@/config/axios'

// 分公司联系方式 响应 VO
export interface BranchContactRespVO {
  id: number
  city: string
  address: string
  phone: string
  postalCode: string
  email: string
  themeColor: string
  sort: number
  status: number
  createTime: string
  updateTime: string
}

// 分公司联系方式 保存/更新 Request VO
export interface BranchContactSaveReqVO {
  id?: number
  city: string
  address: string
  phone?: string
  postalCode?: string
  email?: string
  themeColor?: string
  sort: number
  status: number
}

// 分公司联系方式 分页查询 Request VO
export interface BranchContactPageReqVO {
  pageNo: number
  pageSize: number
  city?: string
  status?: number
  createTime?: string[]
}

// 创建分公司联系方式
export const createBranchContact = (data: BranchContactSaveReqVO) => {
  return request.post({ url: '/site/branch-contact/create', data })
}

// 更新分公司联系方式
export const updateBranchContact = (data: BranchContactSaveReqVO) => {
  return request.put({ url: '/site/branch-contact/update', data })
}

// 删除分公司联系方式
export const deleteBranchContact = (id: number) => {
  return request.delete({ url: '/site/branch-contact/delete?id=' + id })
}

// 获得分公司联系方式
export const getBranchContact = (id: number) => {
  return request.get<BranchContactRespVO>({ url: '/site/branch-contact/get', params: { id } })
}

// 获得分公司联系方式分页
export const getBranchContactPage = (params: BranchContactPageReqVO) => {
  return request.get({ url: '/site/branch-contact/page', params })
}
