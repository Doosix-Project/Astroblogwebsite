import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Alex Rivera'),
    authorRole: z.string().default('Staff Platform & AI Engineer'),
    authorAvatar: z.string().default('/avatar.svg'),
    category: z.enum(['AI & LLMs', 'DevOps & Cloud', 'Open Source', 'Architecture']),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    heroBadge: z.string().optional(),
    readingTime: z.string().default('5 min read'),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
