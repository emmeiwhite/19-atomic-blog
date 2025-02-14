import { Children, useState } from 'react'
import { createContext } from 'react'
import { faker } from '@faker-js/faker'

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase()
  }
}

// 1. Let's create the context
export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => Array.from({ length: 30 }, () => createRandomPost()))
  const [searchQuery, setSearchQuery] = useState('') // Defining form field at parent component level

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter(post =>
          `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : posts

  function handleAddPost(post) {
    setPosts(posts => [...posts, post])
  }

  function handleClearPosts() {
    setPosts([])
  }
  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        searchQuery,
        setSearchQuery
      }}>
      {children}
    </PostContext.Provider>
  )
}
export default PostContextProvider
