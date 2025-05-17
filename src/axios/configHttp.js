import axios from 'axios'

export default {

  get({ path = '', params = {}, headers }) {
    axios.defaults.withCredentials = true
    return axios.get(path, { headers: headers, params })
  },

  put({ path = '', payload, headers }) {
    return axios({
      data: payload,
      method: 'PUT',
      url: path,
      headers: headers
    })
  },

  post({ path = '', payload, headers }) {
    return axios({
      withCredentials: true,
      data: payload,
      method: 'POST',
      url: path,
      headers: headers
    })
  }
}