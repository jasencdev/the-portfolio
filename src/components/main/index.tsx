import { Stack } from '@chakra-ui/react'
import { MainBlock } from '../main/main-block'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'

export const Index = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <MainBlock />
      <Footer />
    </Stack>
  )
}

export default Index