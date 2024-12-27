import { Stack } from '@chakra-ui/react'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'
import ProjectPost from '../portfolio/project-post'
import { BlogHeaderBlock } from '../blog/blog-header-block'

export const Projects = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <BlogHeaderBlock />
      <ProjectPost />
      <Footer />
    </Stack>
  )
}

export default Projects