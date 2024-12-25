import { Stack } from '@chakra-ui/react'
import { BlogContent } from '../content-loaders/blog-content'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'

export const Blog = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <BlogContent />
      <Footer />
    </Stack>
  )
}

export default Blog