import axios from 'axios'
const baseUrl = '/api/login'

const login = async (account) => {
  const response = await axios.post(baseUrl, account)
  return response.data
}

export default { login }