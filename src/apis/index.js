import axios from 'axios'
import { env } from '~/utils/constants'
import { getHeader, getHeaderJson } from './apiFunctions'
import { toast } from 'react-toastify'
const API_ROOT = env.API_ROOT

export const filterQuestions = async (testId, limit) => {
  try {
    const data = { id: testId, limit: limit }
    const res = await axios.post(`${API_ROOT}/questions/filterQuestions`, data, getHeaderJson)
    // lay data qua property data cua axios
    // console.log('🚀 ~ filterQuestions ~ res:', res)
    return res.data
  } catch (error) {
    // console.log(error)
    return
  }
}

export const saveExam = async (data) => {
  try {
    const res = await axios.post(`${API_ROOT}/exam/saveExam`, data, getHeaderJson)
    return res.data
  } catch (error) {
    // console.log(error)
    toast.error(error.response.data)
    return null
  }
}

export const saveExam2 = async (data) => {
  try {
    const res = await axios.post(`${API_ROOT}/exam/saveExam2`, data, getHeaderJson)
    return res.data
  } catch (error) {
    toast.error(error.response.data.message)
    // console.log(error)
    return
  }
}

export const filterTests = async () => {
  try {
    const res = await axios.get(`${API_ROOT}/test/filterTests`)
    // lay data qua property data cua axios
    // console.log('🚀 ~ filterQuestions ~ res:', res)
    return res.data
  } catch (error) {
    // console.log(error)
    return
  }
}