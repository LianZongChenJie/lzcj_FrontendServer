import request from '@/config/axios'

// 产品 响应 VO
export interface ProductRespVO {
  id: number
  name: string
  image: string
  type: string
  summary: string
  description: string
  features: string[]
  scenarios: string[]
  sort: number
  status: number
  createTime: string
  updateTime: string
}

// 产品 保存/更新 Request VO（单图组件使用 image）
export interface ProductSaveReqVO {
  id?: number
  name: string
  image?: string
  type: string
  summary?: string
  description?: string
  features?: string[]
  scenarios?: string[]
  sort: number
  status: number
}

// 产品 分页查询 Request VO
export interface ProductPageReqVO {
  pageNo: number
  pageSize: number
  name?: string
  type?: string
  status?: number
  createTime?: string[]
}

// 创建产品
export const createProduct = (data: ProductSaveReqVO) => {
  return request.post({ url: '/site/product/create', data })
}

// 更新产品
export const updateProduct = (data: ProductSaveReqVO) => {
  return request.put({ url: '/site/product/update', data })
}

// 删除产品
export const deleteProduct = (id: number) => {
  return request.delete({ url: '/site/product/delete?id=' + id })
}

// 获得产品
export const getProduct = (id: number) => {
  return request.get<ProductRespVO>({ url: '/site/product/get', params: { id } })
}

// 获得产品分页
export const getProductPage = (params: ProductPageReqVO) => {
  return request.get({ url: '/site/product/page', params })
}
