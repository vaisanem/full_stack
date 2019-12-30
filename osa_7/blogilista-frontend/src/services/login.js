import axios from 'axios'
const server = 'http://localhost:3003'
const baseUrl = '/api/login'

const login = async (account) => {
  const response = await axios.post(server + baseUrl, account)
  return response.data
}

export default { login }