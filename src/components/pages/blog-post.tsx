import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPostLoader from '../ui/blogPostLoader';

const BlogPost: React.FC = () => {
  // useParams returns a generic Record<string, string | undefined>
  const { postId } = useParams<Record<string, string>>();

  // Handle cases where `postId` is undefined
  if (!postId) {
    return <div>Error: No post ID provided.</div>;
  }

  return (
    <div>
      <h1>Blog Post</h1>
      {/* Dynamically load and render the blog post */}
      <BlogPostLoader filePath={postId} />
    </div>
  );
};

export default BlogPost;