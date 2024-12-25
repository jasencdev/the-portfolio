import { Box, Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { ArticlePreview } from '../ui/article-preview'
import { posts } from './data-portfolio'

export const PortfolioProjects = () => (
  <>
    <Box bg="colorPalette.solid">
      <Container pt={{ base: '16', md: '24' }} pb={{ base: '32', md: '48' }}>
        <Stack gap={{ base: '6', md: '8' }}>
          <Stack gap={{ base: '5', md: '6' }}>
            <Stack gap={{ base: '3', md: '4' }}>
              <Text
                textStyle={{ base: 'sm', md: 'md' }}
                fontWeight="medium"
                color="colorPalette.contrast/90"
              >
                Blog
              </Text>
              <Heading as="h1" textStyle={{ base: '4xl', md: '5xl' }} color="colorPalette.contrast">
                Latest Insights
              </Heading>
            </Stack>
            <Text color="colorPalette.contrast/90" textStyle={{ base: 'lg', md: 'xl' }} maxW="3xl">
              Stay updated with the latest trends and insights from our experts. Read our articles
              on various topics and enhance your knowledge.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
    <Container pb={{ base: '16', md: '24' }} mt={{ base: '-16', md: '-24' }}>
      <Stack gap={{ base: '16', md: '24' }}>
        <Stack gap={{ base: '12', md: '16' }}>
          <ArticlePreview post={posts[0]} hero />
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '12', lg: '8' }}>
            {posts.map((post) => (
              <ArticlePreview key={post.id} post={post} />
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Container>
  </>
)
