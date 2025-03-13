import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      image: image().optional(),
      ogp: z.string().optional(),
      category: z.string(),
      tags: z.array(z.string()),
      description: z.string(),
      draft: z.boolean().optional(),
    }),
});

const work = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      description: z.string(),
      link: z.string(),
    }),
});

export const collections = { blog, work };
