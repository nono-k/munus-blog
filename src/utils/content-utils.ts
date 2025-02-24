import { getCollection } from 'astro:content';

export const countCategory = async (category: string): Promise<number> => {
  const allBlogs = await getCollection('blog');
  const nonDraftBlogs = allBlogs.filter(blog => !blog.data.draft);
  const filteredBlogs = nonDraftBlogs.filter(
    blog => blog.data.category === category,
  );
  return filteredBlogs.length;
};
