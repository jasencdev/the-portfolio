import React, { useEffect, useState } from "react";
import { Box, Card, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { loadContent, Frontmatter } from "../../utils/blog-loader";

interface BlogPostLoaderProps {
  filePath: string; // This will be the post ID
  basePath: string; // This determines the folder to look in (e.g., 'posts' or 'projects')
}

const BlogPostLoader: React.FC<BlogPostLoaderProps> = ({ filePath }) => {
  const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const { frontmatter, content } = await loadContent(filePath);
        setFrontmatter(frontmatter);
        setContent(content);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    }

    fetchContent();
  }, [filePath]);

  if (!frontmatter || !content) {
    return <div>Loading...</div>;
  }

  return (
    <Card.Root overflow="hidden" variant="elevated" boxShadow="lg">
      <Card.Body gap={{ base: "5", md: "6" }}>
        <Stack gap="3" flex="1">
          <Stack>
            <Text textStyle="md" fontWeight="medium" color="colorPalette.fg">
              {frontmatter.category}
            </Text>
            <Heading as="h1">{frontmatter.title}</Heading>
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

export default BlogPostLoader;
