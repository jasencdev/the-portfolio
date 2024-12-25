import React, { Suspense } from 'react';
import { MDXProvider } from '@mdx-js/react';

interface BlogPostLoaderProps {
  filePath: string; // The file path to the MDX file without the .mdx extension
}

const BlogPostLoader: React.FC<BlogPostLoaderProps> = ({ filePath }) => {
  // Dynamically import the MDX file
  const Post = React.lazy(() => import(`./posts/${filePath}.mdx`));

  return (
    <MDXProvider >
      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    </MDXProvider>
  );
};

export default BlogPostLoader;