/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from './apiClient'

export const getElections: any = async () => {
  const endpoint = `elections/get-elections/`
  const resp = await apiClient({
    method: 'GET',
    endpoint: endpoint,
    headers: { Authorization: undefined },
  })
  return resp
}

export const getElectionDetails: any = async (id: number | string) => {
  const endpoint = `elections/get-elections/${id}/`
  const resp = await apiClient({
    method: 'GET',
    endpoint: endpoint,
  })
  return resp
}
