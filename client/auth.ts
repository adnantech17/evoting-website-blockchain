/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from './apiClient'

export const login: any = async (data) => {
  const endpoint = `login/`
  const resp = await apiClient({
    method: 'POST',
    endpoint: endpoint,
    data: data,
    headers: { Authorization: undefined },
  })
  return resp
}
