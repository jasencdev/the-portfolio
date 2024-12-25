import {
    ContentPlaceholder,
    Label,
    type ContentPlaceholderProps,
  } from '../ui/content-placeholder'
  import { Container } from '@chakra-ui/react'
  
  export const IndexContent = (props: ContentPlaceholderProps) => {
    return (
      <ContentPlaceholder minH="2xl" borderYWidth="1px" {...props}>
        <Container>
          <Label>Index Content</Label>
        </Container>
      </ContentPlaceholder>
    )
  }
  