import grayMatter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

export interface Frontmatter {
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

export async function loadContent(filePath: string): Promise<{
  frontmatter: Frontmatter;
  content: string;
}> {
  try {
    // Log the file path being looked up
    console.log("Looking for file with ID:", filePath);

    // Support both .md and .mdx files
    const mdFiles = import.meta.glob<string>("/public/posts/*.md", {
      query: '?raw',
      import: 'default'
    });

    // Log available files
    console.log("Available markdown files:", Object.keys(mdFiles));

    // Try .mdx extension first, then .md
    let expectedPath = `/public/posts/${filePath}.md`;

    if (!mdFiles[expectedPath]) {
      throw new Error(`Blog post file not found at path: ${expectedPath}`);
    }

    const rawContent = await mdFiles[expectedPath]();

    console.log("Content loaded successfully");

    const { data, content: mdContent } = grayMatter(rawContent);

    const processed = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(mdContent);

    return {
      frontmatter: data as Frontmatter,
      content: processed.toString(),
    };
  } catch (error) {
    console.error("Error loading blog post:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
}
