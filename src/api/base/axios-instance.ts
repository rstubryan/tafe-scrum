import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_URL || "https://api-tascrum.zeabur.app/api/v1",
});

export const AxiosInstanceBlog = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_URL_BLOG ||
    "https://blog.sineasmov.com/wp-json/wp/v2",
});
