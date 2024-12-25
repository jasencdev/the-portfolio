import { Stack } from '@chakra-ui/react'
import { IndexContent } from '../content-loaders/index-content'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'

export const Index = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <IndexContent flex="1" />
      <Footer />
    </Stack>
  )
}

export default Index