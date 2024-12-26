'use client'
import { Avatar } from '../ui/avatar'
import {
  Box,
  Card,
  Container,
  Heading,
  Link,
  HStack,
  SimpleGrid,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import grayMatter from 'gray-matter'

interface Post {
  id: string
  title: string
  readTime: string
  excerpt: string
  image: string
  category: string
  publishedAt: string
  author: {
    name: string
    avatarUrl: string
  }
}

export const BlogBlock = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function loadPosts() {
      try {
        const mdxFiles = import.meta.glob<string>('/public/posts/*.mdx', {
          as: 'raw',
          eager: false
        })

        const loadedPosts = await Promise.all(
          Object.entries(mdxFiles).map(async ([path, loader]) => {
            const content = await loader()
            const { data } = grayMatter(content)
            const id = path.split('/').pop()?.replace('.mdx', '') || ''
            return { ...data, id } as Post
          })
        )

        // Sort posts by date, newest first
        const sortedPosts = loadedPosts.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )

        setPosts(sortedPosts)
      } catch (error) {
        console.error('Error loading blog posts:', error)
      }
    }

    loadPosts()
  }, [])

  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack gap="6">
        <Heading size="4xl">All Articles</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '12', lg: '8' }}>
          {posts.map((post) => (
            <Card.Root as="article" size="lg" rounded="xl" key={post.id}>
              <Card.Body gap="3">
                <Span color="fg.muted" textStyle="sm" textTransform="uppercase">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Span>
                <Heading as="h3" size="2xl">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
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
