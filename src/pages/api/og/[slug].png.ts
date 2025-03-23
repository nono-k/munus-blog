import { getCollection, getEntry } from 'astro:content';
import { getOgImage } from '@/components/ogImage';

export async function getStaticPaths() {
  const allBlogPosts = await getCollection('blog');
  return allBlogPosts.map(blog => ({
    params: { slug: blog.slug },
  }));
}

export async function GET({ params }: { params: { slug: string } }) {
  const post = await getEntry('blog', params.slug);
  const body = await getOgImage(post?.data.title ?? 'No title');

  return new Response(body);
}
