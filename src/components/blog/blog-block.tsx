import { Avatar } from '../ui/avatar'
import {
  Box,
  Card,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react'
import { posts } from './data-blog'

export const BlogBlock = () => {
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack gap="6">
        <Heading size="4xl">All Articles</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '12', lg: '8' }}>
          {posts.map((post) => (
            <Card.Root as="article" size="lg" rounded="xl" key={post.id}>
              <Card.Body gap="3">
                <Span color="fg.muted" textStyle="sm" textTransform="uppercase">
                  {post.publishedAt}
                </Span>
                <Heading as="h3" size="2xl">
                  {post.title}
                </Heading>
                <Text>{post.excerpt}</Text>
              </Card.Body>
              <Card.Footer>
                <HStack gap="4">
                  <Avatar shape="rounded" src={post.author.avatarUrl} name={post.author.name} />
                  <Stack gap="0">
                    <Box fontWeight="medium">{post.author.name}</Box>
                    <Box textStyle="sm" color="fg.muted">
                      {post.readTime} read
                    </Box>
                  </Stack>
                </HStack>
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
