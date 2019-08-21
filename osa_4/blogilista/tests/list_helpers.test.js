const listHelpers = require('../utils/list_helpers')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelpers.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 0
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
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 8
    }

    expect(listHelpers.favouriteBlog(blogs)).toMatchObject(blogs[2])
  })

  test('is given correctly when many possible solutions', () => {
    blogs[1].likes = 8
    const correct = blogs.slice(1, 3)

    expect(correct).toContainEqual(listHelpers.favouriteBlog(blogs))
  })
})

describe('most blogs', () => {
  const correct = {
    author: 'Michael Chan',
    blogs: 2
  }

  test('empty list does not define such', () => {
    expect(listHelpers.mostBlogs([])).toBeNull()
  })

  test('is unambiguous when one has more blogs than others', () => {

    expect(listHelpers.mostBlogs(blogs)).toEqual(correct)
  })

  test('is given correctly when many possible solutions', () => {
    blogs[3] = blogs[2]
    const corrects = [correct, {
      author: 'Robert C. Martin',
      blogs: 2
    }]

    expect(corrects).toContainEqual(listHelpers.mostBlogs(blogs))
  })
})

describe('most likes', () => {
  const correct = {
    author: 'Robert C. Martin',
    likes: 24
  }

  test('empty list does not define such', () => {

    expect(listHelpers.mostLikes([])).toBeNull()
  })

  test('is unambiguous when one has more blogs than others', () => {
    blogs[4] = blogs[3]

    expect(listHelpers.mostLikes(blogs)).toEqual(correct)
  })

  test('is given correctly when many possible solutions', () => {
    blogs[5] = blogs[0]
    const corrects = [correct, {
      author: 'Michael Chan',
      likes: 24
    }]

    expect(corrects).toContainEqual(listHelpers.mostLikes(blogs))
  })
})