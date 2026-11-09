import request from '@/config/axios'

// Banner 响应 VO
export interface BannerRespVO {
  id: number
  image: string
  title: string
  subtitle: string
  sort: number
  status: number
  createTime: string
  updateTime: string
}

// Banner 保存/更新 Request VO
export interface BannerSaveReqVO {
  id?: number
  image: string
  title: string
  subtitle: string
  sort: number
  status: number
}

// Banner 分页查询 Request VO
export interface BannerPageReqVO {
  pageNo: number
  pageSize: number
  title?: string
  status?: number
  createTime?: string[]
}

// 创建 Banner
export const createBanner = (data: BannerSaveReqVO) => {
  return request.post({ url: '/site/banner/create', data })
}

// 更新 Banner
export const updateBanner = (data: BannerSaveReqVO) => {
  return request.put({ url: '/site/banner/update', data })
}

// 删除 Banner
export const deleteBanner = (id: number) => {
  return request.delete({ url: '/site/banner/delete?id=' + id })
}

// 获得 Banner
export const getBanner = (id: number) => {
  return request.get<BannerRespVO>({ url: '/site/banner/get', params: { id } })
}

// 获得 Banner 分页
export const getBannerPage = (params: BannerPageReqVO) => {
  return request.get({ url: '/site/banner/page', params })
}

// 获得启用的 Banner 列表（用于前端展示）
export const getBannerListEnabled = () => {
  return request.get<BannerRespVO[]>({ url: '/site/banner/simple-list' })
}
