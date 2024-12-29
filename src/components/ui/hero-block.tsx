import { AspectRatio, Badge, Container, Icon, SimpleGrid, Stack, Link } from '@chakra-ui/react'
import { LuRocket } from 'react-icons/lu'
import { HeroHeader } from './hero-header'
import { ImagePlaceholder } from './image-placeholder'
import { Button } from './button'
import { GetStartedBlock } from './get-started'

export const HeroBlock = () => (
  <Container py={{ base: '16', md: '24' }}>
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: '12', md: '16' }}>
      <HeroHeader
        tagline={
          <Badge size="lg" colorPalette="gray">
            <Icon size="sm">
              <LuRocket />
            </Icon>
            Now Available
          </Badge>
        }
        headline="Full Stack Solutions. Built."
        description="Have your ideas turned into reality with cutting-edge tools and custom features. Create seamless business processes that drive results."
        justifyContent="center"
      >
        <Stack direction={{ base: 'column', md: 'row' }} gap="3">
          <GetStartedBlock />
          <Link href="/portfolio/" >
            <Button variant="outline" size={{ base: 'lg', md: '2xl' }} colorPalette="gray">
              Learn more
            </Button>
          </Link>
        </Stack>
      </HeroHeader>
      <AspectRatio ratio={1}>
        <ImagePlaceholder />
      </AspectRatio>
    </SimpleGrid>
  </Container>
)
