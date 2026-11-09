import request from '@/config/axios'

// 招聘职位 响应 VO
export interface JobRespVO {
  id: number
  title: string
  location: string
  department: string
  type: string
  urgent: number
  responsibilities: string[]
  requirements: string[]
  headcount: number
  status: number
  createTime: string
  updateTime: string
}

// 招聘职位 保存/更新 Request VO
export interface JobSaveReqVO {
  id?: number
  title: string
  location: string
  department?: string
  type: string
  urgent?: number
  responsibilities?: string[]
  requirements?: string[]
  headcount: number
  status: number
}

// 招聘职位 分页查询 Request VO
export interface JobPageReqVO {
  pageNo: number
  pageSize: number
  title?: string
  location?: string
  department?: string
  type?: string
  urgent?: number
  status?: number
  createTime?: string[]
}

// 创建招聘职位
export const createJob = (data: JobSaveReqVO) => {
  return request.post({ url: '/site/job/create', data })
}

// 更新招聘职位
export const updateJob = (data: JobSaveReqVO) => {
  return request.put({ url: '/site/job/update', data })
}

// 删除招聘职位
export const deleteJob = (id: number) => {
  return request.delete({ url: '/site/job/delete?id=' + id })
}

// 获得招聘职位
export const getJob = (id: number) => {
  return request.get<JobRespVO>({ url: '/site/job/get', params: { id } })
}

// 获得招聘职位分页
export const getJobPage = (params: JobPageReqVO) => {
  return request.get({ url: '/site/job/page', params })
}
