export interface BlogPostProps {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  content: {
    rendered: string;
  };
  author: number;
  modified: string;
}

export interface BlogAuthorProps {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
}
