import { useQuery } from "@tanstack/react-query";
import { blogApi } from "@/api/blog/api";

export const useGetBlogPost = () => {
  return useQuery({
    queryKey: ["blog-post"],
    queryFn: () => blogApi.getBlogPost(),
  });
};

export const useGetBlogAuthor = (id: string) => {
  return useQuery({
    queryKey: ["blog-author", id],
    queryFn: () => blogApi.getBlogAuthor({ urlParams: { id } }),
    enabled: !!id,
  });
};
