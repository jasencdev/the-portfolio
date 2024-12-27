import React, { useEffect, useState } from "react";
import grayMatter from "gray-matter";
import { Box, Card, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { Avatar } from './ui/avatar';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

interface ProjectPostLoaderProps {
  filePath: string; // This will be the post ID
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

const ProjectPostLoader: React.FC<ProjectPostLoaderProps> = ({ filePath }) => {
  const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        // Remove 'example' from the filePath if it's already there
        console.log('Looking for file with ID:', filePath);

        const mdxFiles = import.meta.glob<string>('/public/projects/*.mdx', { 
          query: '?raw',
          import: 'default',
          eager: false 
        });

        // Log available files
        console.log('Available MDX files:', Object.keys(mdxFiles));

        // Construct the correct path
        const expectedPath = `/public/projects/${filePath}.mdx`;
        console.log('Expected path:', expectedPath);

        // Check if the file exists in our glob
        if (!mdxFiles[expectedPath]) {
          throw new Error(`Project file not found at path: ${expectedPath}`);
        }

        // Load the content
        const rawContent = await mdxFiles[expectedPath]();
        
        // Log successful content load
        console.log('Content loaded successfully');

        // Parse frontmatter and content
        const { data, content: mdContent } = grayMatter(rawContent);

        // Process markdown content
        const processed = await remark()
          .use(remarkGfm)
          .use(remarkHtml)
          .process(mdContent);

        setFrontmatter(data as Frontmatter);
        setContent(processed.toString());

      } catch (error) {
        console.error("Error loading project:", error);
        // Log more details about the error
        if (error instanceof Error) {
          console.error("Error details:", error.message);
          console.error("Error stack:", error.stack);
        }
      }
    }

    loadContent();
  }, [filePath]);

  if (!frontmatter || !content) {
    return <div>Loading...</div>;
  }

  return (
    <Card.Root overflow="hidden" variant="elevated" boxShadow="lg">
      <Card.Body gap={{ base: '5', md: '6' }}>
        <Stack gap="3" flex="1">
          <Stack>
            <Text textStyle="md" fontWeight="medium" color="colorPalette.fg">
              {frontmatter.category}
            </Text>
            <Heading as="h1">
              {frontmatter.title}
            </Heading>
          </Stack>
          <Box
            color="fg.muted"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Stack>
      </Card.Body>
      <Card.Footer>
        <HStack gap="3">
          <Avatar src={frontmatter.author.avatarUrl} />
          <Box textStyle="sm">
            <Text fontWeight="medium">{frontmatter.author.name}</Text>
            <Text color="fg.muted">{frontmatter.publishedAt}</Text>
          </Box>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProjectPostLoader;