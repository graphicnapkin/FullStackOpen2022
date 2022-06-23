import { BlogInterface } from '../controllers/blog'

export const dummy = (blogs: BlogInterface[]) => {
  return 1
}

export const totalLikes = (blogs: BlogInterface[]) => {
  let totalLikes = 0
  blogs.forEach((blog) => (totalLikes += blog.likes || 0))
  return totalLikes
}

export const favoriteBlog = (blogs: BlogInterface[]) => {
  let favorite = blogs[0]

  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) favorite = blog
  })
  return favorite
}

export const mostBlogs = (blogs: BlogInterface[]) => {
  const bookCount: { [author: string]: number } = {}
  let top = { author: '', blogs: 0 }

  blogs.forEach(({ author }) => {
    if (!bookCount[author]) bookCount[author] = 0
    bookCount[author]++
    if (bookCount[author] > top.blogs)
      top = { author, blogs: bookCount[author] }
  })

  return top
}

export const mostLikes = (blogs: BlogInterface[]) => {
  const likeCount: { [author: string]: number } = {}
  let top = { author: '', likes: 0 }

  blogs.forEach(({ author, likes }) => {
    if (!likeCount[author]) likeCount[author] = 0
    likeCount[author] += likes
    if (likeCount[author] > top.likes)
      top = { author, likes: likeCount[author] }
  })

  return top
}
