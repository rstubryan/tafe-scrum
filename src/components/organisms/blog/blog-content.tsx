"use client";

import { useGetBlogPost } from "@/api/blog/queries";

export default function BlogContent() {
  const { data: post, isLoading: isPostLoading } = useGetBlogPost();

  return (
    <div className="w-full overflow-x-auto">
      <pre className="max-w-full whitespace-pre-wrap break-words">
        {isPostLoading ? (
          <p>Loading...</p>
        ) : (
          <code className="block max-w-full overflow-x-auto">
            {JSON.stringify(post, null, 2)}
          </code>
        )}
      </pre>
    </div>
  );
}
