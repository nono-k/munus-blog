import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
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

export const collections = { blog };
