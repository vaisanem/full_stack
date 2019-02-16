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
    likes: copy[0].likes
  }
}

const likesDescending = (a, b) => b.likes - a.likes

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}