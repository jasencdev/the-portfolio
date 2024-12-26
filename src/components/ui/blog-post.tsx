import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPostLoader from './blogPostLoader';

const BlogPost: React.FC = () => {
  // useParams returns a generic Record<string, string | undefined>
  const { postId } = useParams<Record<string, string>>();

  // Handle cases where `postId` is undefined
  if (!postId) {
    return <div>Error: No post ID provided.</div>;
  }

  return (
    <div>
      <BlogPostLoader filePath={postId} />
    </div>
  );
};

export default BlogPost;