import { Stack } from '@chakra-ui/react'
import { BlogBlock } from './blog-block'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'

export const Blog = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <BlogBlock />
      <Footer />
    </Stack>
  )
}

export default Blog