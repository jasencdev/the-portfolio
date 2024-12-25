import { Stack } from '@chakra-ui/react'
import { PortfolioContent } from '../content/portfolio-content'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'

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