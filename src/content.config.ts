import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    ogp: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
