import { Stack } from '@chakra-ui/react'
import { Footer } from '../ui/footer'
import { Navbar } from '../ui/navbar'
import { PortfolioProjects } from '../portfolio/portfolio-projects'

export const Portfolio = () => {
  return (
    <Stack flex="1" gap="12">
      <Navbar  />
      <PortfolioProjects />
      <Footer />
    </Stack>
  )
}

export default Portfolio