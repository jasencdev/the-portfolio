import { Container } from '@chakra-ui/react'
import { PageHeader } from './blog-header'

export const BlogHeaderBlock = () => {
  return (
    <Container>
      <PageHeader
        tagline="Blog"
        headline="Adventures in Development"
        alignItems="center"
        textAlign="center"
      />
    </Container>
  )
}
