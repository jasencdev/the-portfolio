import {
    ContentPlaceholder,
    Label,
    type ContentPlaceholderProps,
  } from './content-placeholder'
  import { Container } from '@chakra-ui/react'
  
  export const Content = (props: ContentPlaceholderProps) => {
    return (
      <ContentPlaceholder minH="2xl" borderYWidth="1px" {...props}>
        <Container>
          <Label>Content</Label>
        </Container>
      </ContentPlaceholder>
    )
  }
  