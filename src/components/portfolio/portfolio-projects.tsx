'use client'
import { ArticlePreview } from '../ui/article-preview'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
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

export const PortfolioProjects = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function loadPosts() {
      try {
        const mdxFiles = import.meta.glob<string>('/public/projects/*.mdx', {
          query: '?raw',
          import: 'default'
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
                Portfolio
              </Text>
              <Heading as="h1" textStyle={{ base: '4xl', md: '5xl' }} color="colorPalette.contrast">
                Coming Soon
              </Heading>
            </Stack>
            <Text color="colorPalette.contrast/90" textStyle={{ base: 'lg', md: 'xl' }} maxW="3xl">
              This is where I'll be posting Portfolio projects as they relate to jasenc.dev. This is also modular enough to turn into Service Offerings instead. 
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
    <Container pb={{ base: '16', md: '24' }} mt={{ base: '-16', md: '-24' }}>
      <Stack gap={{ base: '16', md: '24' }}>
        <Stack gap={{ base: '12', md: '16' }}>
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
}
