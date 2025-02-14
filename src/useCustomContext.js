import { useContext } from 'react'
import { PostContext } from './PostContext'

const useCustomContext = () => {
  return useContext(PostContext)
}
export default useCustomContext
