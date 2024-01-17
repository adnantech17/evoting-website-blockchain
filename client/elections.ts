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

export const performVote: any = async (id: number | string, data: any) => {
  const endpoint = `elections/perform-vote/${id}/`
  const resp = await apiClient({
    method: 'POST',
    endpoint: endpoint,
    data: data,
  })
  return resp
}

export const submitKey: any = async (id: number | string, data: any) => {
  const endpoint = `elections/submit-key/${id}/`
  const resp = await apiClient({
    method: 'POST',
    endpoint: endpoint,
    data: data,
  })
  return resp
}
