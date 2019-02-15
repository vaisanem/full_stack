const listHelpers = require('../utils/list_helpers')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelpers.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('empty list has 0', () => {

    expect(listHelpers.totalLikes([])).toBe(0)
  })

  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 0,
      __v: 0
    }
  ]

  test('list of unlikeable blogs has 0', () => {

    expect(listHelpers.totalLikes(blogs)).toBe(0)
  })

  test('list of one blog has as many as the blog', () => {
    blogs[0].likes = 7

    expect(listHelpers.totalLikes(blogs)).toBe(7)
  })

  test('list of many blogs has the sum of all likes', () => {
    blogs[0].likes = 7
    blogs[1] = blogs[0]

    expect(listHelpers.totalLikes(blogs)).toBe(14)
  })
})