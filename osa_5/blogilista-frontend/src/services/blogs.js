import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => token = newToken

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (attributes) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const response = await axios.post(baseUrl, attributes, { headers: headers })
  return response.data
}

const update = async (attributes) => {
  const response = await axios.put(baseUrl.concat('/', attributes.id), attributes)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(baseUrl.concat('/', id))
  return response.data
}

export default { getAll, create, update, remove, setToken }