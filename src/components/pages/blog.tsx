import { Stack } from '@chakra-ui/react'
import { BlogContent } from '../content/blog-content'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'

export const Blog = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <BlogContent flex="1" />
      <Footer />
    </Stack>
  )
}

export default Blog