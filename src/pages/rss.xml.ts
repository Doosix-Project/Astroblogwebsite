import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '../utils/blog';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();

  return rss({
    title: 'DevPulse // Modern Tech Engineering Blog',
    description: 'High-performance engineering publication covering Agentic AI, Kubernetes GitOps, self-hosted cloud infrastructure with Coolify, and open-source tooling.',
    site: context.site || 'https://example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
      author: post.data.author,
    })),
    customData: `<language>en-us</language>`,
  });
}
