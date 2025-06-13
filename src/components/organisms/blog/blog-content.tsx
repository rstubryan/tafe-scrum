"use client";

import { useState } from "react";
import { useGetBlogPost } from "@/api/blog/queries";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { PaginationLayout } from "@/components/templates/layout/pagination-layout";
// import Image from "next/image";

export default function BlogContent() {
  const { data: posts, isLoading, isError } = useGetBlogPost();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  if (isLoading) {
    return (
      <div className="space-y-6 w-full mx-auto p-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-64 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (isError || !posts || !Array.isArray(posts) || posts.length === 0) {
    return (
      <Card className="w-full mx-auto">
        <CardContent className="p-6">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">No blog posts found</h3>
            <p className="text-muted-foreground mt-2">
              Check back later for new content
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-10 w-full mx-auto py-4">
        {paginatedPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            {/*{post.featured_media && (*/}
            {/*  <div className="relative w-full h-64">*/}
            {/*    <Image*/}
            {/*      src={`https://blog.sineasmov.com/wp-content/uploads/${post.featured_media}`}*/}
            {/*      alt={post.title?.rendered || "Blog post"}*/}
            {/*      layout="fill"*/}
            {/*      objectFit="cover"*/}
            {/*      className="w-full"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*)}*/}
            <CardHeader className="pb-2">
              <div className="space-y-2">
                <h1
                  className="text-2xl font-bold leading-tight"
                  dangerouslySetInnerHTML={{
                    __html: post.title?.rendered || "Untitled Post",
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  {post.date && format(new Date(post.date), "MMMM d, yyyy")}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm sm:prose lg:prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: post.content?.rendered || "",
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div>
          <PaginationLayout
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
