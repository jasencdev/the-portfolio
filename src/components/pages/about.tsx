import { Stack } from '@chakra-ui/react'
import { AboutContent } from '../content-loaders/about-content'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'

export const About = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <AboutContent />
      <Footer />
    </Stack>
  )
}

export default About