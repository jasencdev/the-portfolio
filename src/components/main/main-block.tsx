import {
    ContentPlaceholder,
    type ContentPlaceholderProps,
  } from '../ui/content-placeholder'
  import { Container } from '@chakra-ui/react'
import { HeroBlock } from '../ui/hero-block'

  
  export const MainBlock = (props: ContentPlaceholderProps) => {
    return (
      <ContentPlaceholder minH="2xl" borderYWidth="1px" {...props}>
        <Container>
          <HeroBlock />
        </Container>
      </ContentPlaceholder>
    )
  }
  