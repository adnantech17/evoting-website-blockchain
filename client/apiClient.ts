/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios'

const getToken = () => null

export interface Response<T = any> {
  code: number
  isSucceed: boolean
  data?: T
  error?: string
  message?: any
  meta?: any
  stats?: any
}

export const axiosApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

export const apiClient = async <T = any>(
  requestConfig: AxiosRequestConfig & { endpoint: string }
): Promise<Response<T>> => {
  const { endpoint, ...configs } = requestConfig
  const token = getToken()
  try {
    const response = await axiosApiInstance.request({
      url: `/${requestConfig.endpoint}`,
      ...configs,
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...configs.headers },
    })

    return {
      code: response.status,
      isSucceed: true,
      data: (response.data.data ? response.data.data : response.data) as T,
      error: response.statusText,
      message: response.data.message,
      meta: response.data?.meta_data,
      stats: response.data?.stats,
    }
  } catch (e) {
    const error = e as any
    throw {
      code: error.response?.status || 503,
      isSucceed: false,
      data: undefined,
      error:
        typeof error.response?.data === 'string'
          ? 'Something went wrong'
          : error.response?.data?.message instanceof Array
            ? error?.response.data.message.toString()
            : error?.response.data.message,
    } as T
  }
}
