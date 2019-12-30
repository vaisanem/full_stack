import axios from 'axios'
const server = 'http://localhost:3003'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => token = newToken

const getAll = () => {
  const request = axios.get(server + baseUrl)
  return request.then(response => response.data)
}

const create = async (attributes) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const response = await axios.post(server + baseUrl, attributes, { headers: headers })
  return response.data
}

const update = async (attributes) => {
  const response = await axios.put(server + baseUrl.concat('/', attributes.id), attributes)
  return response.data
}

const comment = async (id, comment) => {
  const response = await axios.post(server + baseUrl.concat('/', id, '/comments'), {comment: comment})
  return response.data
}

const remove = async (id) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const response = await axios.delete(server + baseUrl.concat('/', id), { headers: headers })
  return response.data
}

export default { getAll, create, update, comment, remove, setToken }
