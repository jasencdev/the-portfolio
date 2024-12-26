import React, { useEffect, useState } from "react";
import grayMatter from "gray-matter";
import { Box, Card, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { Avatar } from './ui/avatar';

// Import remark packages
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

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
  "1": () => import("/public/posts/example1.mdx?raw"),
  "2": () => import("/public/projects/example2.mdx?raw"),
  "3": () => import("/public/posts/example3.mdx?raw"),
  "4": () => import("/public/posts/example4.mdx?raw"),
  "5": () => import("/public/posts/example5.mdx?raw"),
  // Add more posts as needed, for example:
  // "2": () => import("../../../public/posts/2.mdx?raw"),
};

const ProjectPostLoader: React.FC<BlogPostLoaderProps> = ({ filePath }) => {
  const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    // Function to dynamically load the MDX file, parse its frontmatter, and convert to HTML
    async function fetchAndParseMarkdown() {
      try {
        // 1. Get the correct import function based on the filePath
        const loadFn = posts[filePath];
        if (!loadFn) {
          throw new Error(`Post with filePath '${filePath}' not found`);
        }

        // 2. Dynamically import the raw MDX content
        const rawMdx = await loadFn(); 
        // rawMdx.default is the raw string content of your .mdx file

        // 3. Extract frontmatter (YAML) and the raw Markdown body using gray-matter
        const { data, content: mdContent } = grayMatter(rawMdx.default);

        // 4. Convert the Markdown body to HTML using remark
        const processed = await remark()
          .use(remarkGfm)
          .use(remarkHtml)
          .process(mdContent);
        const html = processed.toString();

        // 5. Update the component state with the results
        setFrontmatter(data as Frontmatter);
        setContent(html);
      } catch (err) {
        console.error('Error fetching or parsing Markdown:', err);
      }
    }

    fetchAndParseMarkdown();
  }, [filePath]);

  // If either the frontmatter or content isn't loaded yet, we show a fallback
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
          {/* 
            Insert the parsed HTML. 
            Using dangerouslySetInnerHTML so it renders HTML 
            instead of displaying the markup literally.
          */}
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
            {/* Show your frontmatter date or any custom formatting */}
            <Text color="fg.muted">{frontmatter.publishedAt}</Text>
          </Box>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProjectPostLoader;