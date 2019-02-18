const lodash = require('lodash')

const dummy = (blogs) => {
  let result = blogs.length
  result = 1
  return result
}

const totalLikes = (blogs) => {
  return blogs.reduce((all, one) => all + one.likes, 0)
}

const favouriteBlog = (blogs) =>  {
  const copy = blogs.map(one => one)
  copy.sort(likesDescending)

  if (!copy[0]) return null
  return {
    title: copy[0].title,
    author: copy[0].author,
    url: copy[0].url,
    likes: copy[0].likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const counts = lodash.countBy(blogs, one => one.author)
  const rank = []
  lodash.keys(counts).forEach(one => rank[counts[one]] = one)

  return {
    author: rank[rank.length - 1],
    blogs: rank.length - 1
  }
}

const likesDescending = (a, b) => b.likes - a.likes

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}