import {
    ContentPlaceholder,
    Label,
    type ContentPlaceholderProps,
  } from './content-placeholder'
  import { Container } from '@chakra-ui/react'
  
  export const Footer = (props: ContentPlaceholderProps) => {
    return (
      <ContentPlaceholder minH="40" borderTopWidth="1px" {...props}>
        <Container>
          <Label>Footer</Label>
        </Container>
      </ContentPlaceholder>
    )
  }
  