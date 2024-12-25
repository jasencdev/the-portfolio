import { Stack } from '@chakra-ui/react'
import { Content } from './content'
import { Footer } from './footer'
import { Navbar } from './navbar'

export const Layout = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <Content flex="1" />
      <Footer />
    </Stack>
  )
}
