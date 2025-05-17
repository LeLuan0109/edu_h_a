import axios from 'axios'

export const api=axios.create({
})

export const getHeader=() => {
  const token=localStorage.getItem('token')
  return {
    'Content-Type':'multipart/form-data'
  }
}

export const getHeaderJson=() => {
  const token=localStorage.getItem('token')
  return {
    'Content-Type': 'application/json'
  }
}
