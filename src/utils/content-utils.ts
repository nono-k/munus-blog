import { getCollection } from 'astro:content';
import type { BlogPostData } from '@/types/config';

export async function getUpdateBlogs(): Promise<
  { body: string; data: BlogPostData; slug: string }[]
> {
  const allBlogPosts = await getCollection('blog');
  const nonDraftBlogs = allBlogPosts.filter(
    blog => !blog.data.draft,
  ) as unknown as { body: string; data: BlogPostData; slug: string }[];

  const updateSorted = nonDraftBlogs.sort((a, b) => {
    const aPin = a.data.pin === true;
    const bPin = b.data.pin === true;
    if (aPin && !bPin) return -1;
    if (!aPin && bPin) return 1;

    const aTime = (a.data.updateDate ?? a.data.pubDate).getTime();
    const bTime = (b.data.updateDate ?? b.data.pubDate).getTime();

    return bTime - aTime;
  });

  return updateSorted;
}

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

export async function getMonthlyReportList(): Promise<
  { body: string; data: BlogPostData; slug: string }[]
> {
  const sortedBlogs = await getSortedBlogs();
  const filteredPosts = sortedBlogs.filter(blog =>
    blog.data.tags.some(tag => tag === '月報'),
  );
  return filteredPosts;
}

export async function getBlogsByTags(
  tags: string[],
): Promise<{ body: string; data: BlogPostData; slug: string }[]> {
  const sortedBlogs = await getSortedBlogs();
  const filteredPosts = sortedBlogs.filter(blog =>
    blog.data.tags.some(tag => tags.includes(tag)),
  );
  return filteredPosts;
}

export async function getTagList(
  tagName: string,
): Promise<{ body: string; data: BlogPostData; slug: string }[]> {
  const sortedBlogs = await getUpdateBlogs();
  const filteredPosts = sortedBlogs.filter(blog =>
    blog.data.tags.some(tag => tag === tagName),
  );
  return filteredPosts;
}
