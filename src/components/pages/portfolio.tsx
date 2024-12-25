import { Stack } from '@chakra-ui/react'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'
import { PortfolioContent } from '../content-loaders/portfolio-content'

export const Portfolio = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <PortfolioContent />
      <Footer />
    </Stack>
  )
}

export default Portfolio