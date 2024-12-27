import { Stack } from '@chakra-ui/react'
import { Profile } from '../about/profile'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'

export const About = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <Profile />
      <Footer />
    </Stack>
  )
}

export default About