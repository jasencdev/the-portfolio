import React, { useEffect, useState } from "react";
import grayMatter from "gray-matter";

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
    <div>
      <header>
        <h1><strong>{frontmatter.title}</strong></h1>
        <p>{frontmatter.excerpt}</p>
        <p>
          <strong>Category:</strong> {frontmatter.category}
        </p>
        <p>
          <strong>Published:</strong> {frontmatter.publishedAt}
        </p>
        <p>
          <strong>Author:</strong> {frontmatter.author.name}
        </p>
        <img src={frontmatter.image} alt={frontmatter.title} />
      </header>
      <article>
        <p>{content}</p>
      </article>
    </div>
  );
};

export default BlogPostLoader;