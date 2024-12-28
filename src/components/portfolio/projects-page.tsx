import { Stack } from '@chakra-ui/react'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'
import ProjectPost from './project-post'

export const Projects = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <ProjectPost />
      <Footer />
    </Stack>
  )
}

export default Projects