import { Box, Card, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react'
import { Avatar } from './avatar'
import type { Project } from '../utils/content'

interface ArticlePreviewProps {
  post: Project
}

export const ArticlePreview = (props: ArticlePreviewProps) => {
  const { post } = props
  return (
    <Card.Root as="article" size="lg" rounded="xl">
      <Card.Body gap="3">
        <Text textStyle="sm" color="fg.muted" textTransform="uppercase">
          {post.publishedAt}
        </Text>
        <Heading as="h3" size="2xl">
          <Link href={`/portfolio/${post.id}`}>{post.title}</Link>
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
  )
}
