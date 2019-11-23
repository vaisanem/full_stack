import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const add = async (anecdote) => {
    const response = await axios.post(baseUrl, { content: anecdote, votes: 0 })
    return response.data
}

const vote = (anecdote) => {
    axios.put(baseUrl + anecdote.id, anecdote)
}
  
export default { getAll, add, vote }