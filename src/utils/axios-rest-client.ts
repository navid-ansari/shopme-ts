import axios, { AxiosError } from 'axios'

import { throwError } from './throw-error'

export const axiosGet = async (url: string) => {
  try {
    const response = await axios.get<any>(url)
    return response
  } catch (error: any) {
    const err: any = error as AxiosError
    throwError({ status: err?.response?.status })
  }
}

export const axiosPost = async (url: string, body: any) => {
  try {
    const response = await axios.post<any>(url, body)
    return response
  } catch (error: any) {
    const err: any = error as AxiosError
    throwError({ status: err?.response?.status })
  }
}
