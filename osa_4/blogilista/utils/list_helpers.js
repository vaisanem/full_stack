const dummy = (blogs) => {
  let result = blogs.length
  result = 1
  return result
}

const totalLikes = (blogs) => {
  return blogs.reduce((all, one) => all + one.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}