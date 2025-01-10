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

    const mdxFiles = import.meta.glob<string>("/public/posts/*.mdx", {
      query: '?raw',
      import: 'default'
    });

    // Log available files
    console.log("Available MDX files:", Object.keys(mdxFiles));

    const expectedPath = `/public/posts/${filePath}.mdx`;
    console.log("Expected path:", expectedPath);

    if (!mdxFiles[expectedPath]) {
      throw new Error(`Blog post file not found at path: ${expectedPath}`);
    }

    const rawContent = await mdxFiles[expectedPath]();

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
