import request from '@/config/axios'

// 发展历程 响应 VO
export interface MilestoneRespVO {
  id: number
  year: number
  title: string
  description: string
  sort: number
  status: number
  createTime: string
  updateTime: string
}

// 发展历程 保存/更新 Request VO
export interface MilestoneSaveReqVO {
  id?: number
  year: number
  title: string
  description?: string
  sort: number
  status: number
}

// 发展历程 分页查询 Request VO
export interface MilestonePageReqVO {
  pageNo: number
  pageSize: number
  year?: number
  status?: number
  createTime?: string[]
}

// 创建发展历程事件
export const createMilestone = (data: MilestoneSaveReqVO) => {
  return request.post({ url: '/site/company-milestone/create', data })
}

// 更新发展历程
export const updateMilestone = (data: MilestoneSaveReqVO) => {
  return request.put({ url: '/site/company-milestone/update', data })
}

// 删除发展历程
export const deleteMilestone = (id: number) => {
  return request.delete({ url: '/site/company-milestone/delete?id=' + id })
}

// 获得发展历程
export const getMilestone = (id: number) => {
  return request.get<MilestoneRespVO>({ url: '/site/company-milestone/get', params: { id } })
}

// 获得发展历程分页
export const getMilestonePage = (params: MilestonePageReqVO) => {
  return request.get({ url: '/site/company-milestone/page', params })
}
