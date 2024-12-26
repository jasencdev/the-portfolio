import React, { useEffect, useState } from "react";
import grayMatter from "gray-matter";
import { Box, Card, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Avatar } from '../ui/avatar'


interface BlogPostLoaderProps {
  filePath: string; // Path to the MDX file (based on `filePath`)
}

interface Frontmatter {
  id: string;
  title: string;
  readTime: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: string;
  author: {
    name: string;
    avatarUrl: string;
  };
}

// Static map of MDX imports
const posts: Record<string, () => Promise<{ default: string }>> = {
  "1": () => import("../../posts/1.mdx?raw"),
  // Add more posts as needed
};

const BlogPostLoader: React.FC<BlogPostLoaderProps> = ({ filePath }) => {
  const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      const loadFn = posts[filePath];
      if (!loadFn) {
        console.error(`Post with filePath '${filePath}' not found`);
        return;
      }

      try {
        // Load the raw MDX content
        const rawMdx = await loadFn();

        // Parse the frontmatter and content using gray-matter
        const { data, content } = grayMatter(rawMdx.default);

        setFrontmatter(data as Frontmatter);
        setContent(content);
      } catch (error) {
        console.error(`Failed to load post "${filePath}":`, error);
      }
    };

    loadPost();
  }, [filePath]);

  if (!frontmatter || !content) {
    return <div>Loading...</div>;
  }

  return (
    <Card.Root overflow="hidden" variant="elevated" boxShadow="lg">
      <Card.Body gap={{ base: '5', md: '6' }}>
        <Stack gap="3" flex="1">
          <Stack>
            <Text textStyle="sm" fontWeight="medium" color="colorPalette.fg">
              {frontmatter?.category}
            </Text>
            <Heading textStyle="2xl">
              {frontmatter.title}
            </Heading>
          </Stack>
          <Text color="fg.muted">
            Discover the latest trends in SaaS that are shaping the future of digital solutions and
            how your business can benefit.
          </Text>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <HStack gap="3">
          <Avatar src="https://avatars.githubusercontent.com/u/108644550?v=4" />
          <Box textStyle="sm">
            <Text fontWeight="medium">{frontmatter.author.name}</Text>
            <Text color="fg.muted">January 15, {new Date().getFullYear()}</Text>
          </Box>
        </HStack>
      </Card.Footer>
    </Card.Root> 
  );
};

export default BlogPostLoader;