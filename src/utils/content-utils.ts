import { getCollection } from 'astro:content';
import type { BlogPostData } from '@/types/config';

export async function getSortedBlogs(): Promise<
  { body: string; data: BlogPostData; slug: string }[]
> {
  const allBlogPosts = await getCollection('blog');
  const nonDraftBlogs = allBlogPosts.filter(
    blog => !blog.data.draft,
  ) as unknown as { body: string; data: BlogPostData; slug: string }[];

  const sorted = nonDraftBlogs.sort(
    (a: { data: BlogPostData }, b: { data: BlogPostData }) => {
      const dateA = new Date(a.data.pubDate);
      const dateB = new Date(b.data.pubDate);
      return dateA > dateB ? -1 : 1;
    },
  );

  for (let i = 1; i < sorted.length; i++) {
    sorted[i].data.nextSlug = sorted[i - 1].slug;
    sorted[i].data.nextTitle = sorted[i - 1].data.title;
  }
  for (let i = 0; i < sorted.length; i++) {
    sorted[i].data.prevSlug = sorted[i + 1]?.slug;
    sorted[i].data.prevTitle = sorted[i + 1]?.data.title;
  }

  return sorted;
}

export async function getCategoryList(
  categoryName: string,
): Promise<{ body: string; data: BlogPostData; slug: string }[]> {
  const sortedBlogs = await getSortedBlogs();
  const filteredPosts = sortedBlogs.filter(
    blog => blog.data.category === categoryName,
  );
  return filteredPosts;
}

export async function getTagList(
  tagName: string,
): Promise<{ body: string; data: BlogPostData; slug: string }[]> {
  const sortedBlogs = await getSortedBlogs();
  const filteredPosts = sortedBlogs.filter(blog =>
    blog.data.tags.some(tag => tag === tagName),
  );
  return filteredPosts;
}

export const countCategory = async (category: string): Promise<number> => {
  const allBlogs = await getCollection('blog');
  const nonDraftBlogs = allBlogs.filter(blog => !blog.data.draft);
  const filteredBlogs = nonDraftBlogs.filter(
    blog => blog.data.category === category,
  );
  return filteredBlogs.length;
};
