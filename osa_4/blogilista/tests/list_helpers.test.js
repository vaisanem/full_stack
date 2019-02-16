const listHelpers = require('../utils/list_helpers')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelpers.dummy(blogs)
  expect(result).toBe(1)
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

describe('total likes', () => {
  test('empty list has 0', () => {

    expect(listHelpers.totalLikes([])).toBe(0)
  })

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

describe('favourite blog', () => {
  test('empty list does not define such', () => {
    expect(listHelpers.favouriteBlog([])).toBeNull()
  })

  test('is unambiguous when one has more likes than others', () => {
    blogs[2] = {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 8,
      __v: 0
    }

    expect(blogs[2]).toMatchObject(listHelpers.favouriteBlog(blogs))
  })
})