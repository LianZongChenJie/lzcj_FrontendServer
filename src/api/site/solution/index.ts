import request from '@/config/axios'

// 解决方案 响应 VO
export interface SolutionRespVO {
  id: number
  name: string
  image: string
  industry: string
  summary: string
  description: string
  demandAnalysis: string
  sort: number
  status: number
  createTime: string
  updateTime: string
}

// 解决方案 保存/更新 Request VO（单图组件使用 image）
export interface SolutionSaveReqVO {
  id?: number
  name: string
  image: string
  industry: string
  summary?: string
  description?: string
  demandAnalysis?: string
  sort: number
  status: number
}

// 解决方案 分页查询 Request VO
export interface SolutionPageReqVO {
  pageNo: number
  pageSize: number
  name?: string
  industry?: string
  status?: number
  createTime?: string[]
}

// 创建解决方案
export const createSolution = (data: SolutionSaveReqVO) => {
  return request.post({ url: '/site/solution/create', data })
}

// 更新解决方案
export const updateSolution = (data: SolutionSaveReqVO) => {
  return request.put({ url: '/site/solution/update', data })
}

// 删除解决方案
export const deleteSolution = (id: number) => {
  return request.delete({ url: '/site/solution/delete?id=' + id })
}

// 获得解决方案
export const getSolution = (id: number) => {
  return request.get<SolutionRespVO>({ url: '/site/solution/get', params: { id } })
}

// 获得解决方案分页
export const getSolutionPage = (params: SolutionPageReqVO) => {
  return request.get({ url: '/site/solution/page', params })
}
