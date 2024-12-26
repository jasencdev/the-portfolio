import { AspectRatio, Box, Heading, HStack, Stack, Text, Link } from '@chakra-ui/react'
import { ImagePlaceholder } from './image-placeholder'
import { Avatar } from '../ui/avatar'
import type { Post } from '../portfolio/data-portfolio'

interface Props {
  post: Post
  hero?: boolean
}

export const ArticlePreview = (props: Props) => {
  const { post, hero } = props
  return (
    <Stack gap={{ base: '5', md: '6' }} align="start">
      <AspectRatio ratio={16 / 9} w="full" maxH="md">
        <ImagePlaceholder />
      </AspectRatio>
      <Stack gap="3" flex="1">
        <Stack>
          <Text textStyle="sm" fontWeight="medium" color="colorPalette.fg">
            {post.category}
          </Text>
          <Link href={`/Portfolio/${post.id}`}>
            <Heading textStyle={{ base: '2xl', md: hero ? '4xl' : '2xl' }}>
              {post.title}
            </Heading>
            </Link>
        </Stack>
        <Text color="fg.muted" textStyle={{ base: 'md', md: hero ? 'lg' : 'md' }}>
          {post.excerpt}
        </Text>
      </Stack>
      <HStack gap="3">
        <Avatar src={post.author.avatarUrl} boxSize="10" />
        <Box textStyle="sm">
          <Text fontWeight="medium">{post.author.name}</Text>
          <Text color="fg.muted">{post.publishedAt}</Text>
        </Box>
      </HStack>
    </Stack>
  )
}
