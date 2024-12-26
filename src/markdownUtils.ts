// src/markdownUtils.ts

import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

/**
 * parseMarkdown
 * -------------
 * Takes a raw markdown string, extracts its frontmatter, and converts
 * the markdown body into HTML using remark.
 *
 * @param rawContent - The raw string content of a .md file (including frontmatter)
 * @returns An object containing { frontmatter, html }.
 *          - frontmatter is the YAML metadata as a JS object
 *          - html is the rendered HTML from the markdown content
 */
export async function parseMarkdown(rawContent: string) {
  // 1. Extract the frontmatter from the content
  const { data: frontmatter, content } = matter(rawContent);

  // 2. Parse markdown and convert to HTML
  const processedContent = await remark()
    .use(remarkHtml)
    .process(content);

  // 3. Extract the resulting HTML as a string
  const html = processedContent.toString();

  // Return both frontmatter and the final HTML
  return { frontmatter, html };
}