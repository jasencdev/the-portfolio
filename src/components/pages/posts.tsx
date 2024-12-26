import { Stack } from '@chakra-ui/react'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'
import BlogPost from '../ui/blog-post'
import { BlogHeaderBlock } from '../ui/blog-header-block'

export const Posts = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <BlogHeaderBlock />
      <BlogPost />
      <Footer />
    </Stack>
  )
}

export default Posts