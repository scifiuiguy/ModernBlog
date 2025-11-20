import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional().default(true),
    description: z.string().optional(),
    canonical_url: z.string().url().optional(),
  }),
});

export const collections = { blog };

