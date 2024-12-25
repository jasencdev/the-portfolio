import {
    ContentPlaceholder,
    Label,
    type ContentPlaceholderProps,
  } from '../ui/content-placeholder'
  import { Container } from '@chakra-ui/react'
  
  export const PortfolioContent = (props: ContentPlaceholderProps) => {
    return (
      <ContentPlaceholder minH="2xl" borderYWidth="1px" {...props}>
        <Container>
          <Label>Portfolio Content</Label>
        </Container>
      </ContentPlaceholder>
    )
  }
  