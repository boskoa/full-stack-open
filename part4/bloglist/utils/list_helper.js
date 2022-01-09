const dummy = (blogs) => {
  return blogs.length - blogs.length + 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return (!blogs.length)
    ? 0
    : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, next) => {
    return prev > next
      ? prev
      : next
  }

  return (!blogs.length)
    ? {}
    : blogs.filter(blog => {
      return blog.likes === blogs.map(blog => blog.likes).reduce(reducer, 0)
    })[0]
}

module.exports = { dummy, totalLikes, favoriteBlog }