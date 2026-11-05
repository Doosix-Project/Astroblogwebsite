import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.data.featured);
}

export async function getCategoriesWithCount(): Promise<{ name: string; count: number; slug: string }[]> {
  const posts = await getAllPosts();
  const counts: Record<string, number> = {};

  posts.forEach(post => {
    const category = post.data.category;
    counts[category] = (counts[category] || 0) + 1;
  });

  return Object.entries(counts).map(([name, count]) => ({
    name,
    count,
    slug: slugify(name),
  })).sort((a, b) => b.count - a.count);
}

export async function getTagsWithCount(): Promise<{ name: string; count: number; slug: string }[]> {
  const posts = await getAllPosts();
  const counts: Record<string, number> = {};

  posts.forEach(post => {
    post.data.tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });

  return Object.entries(counts).map(([name, count]) => ({
    name,
    count,
    slug: slugify(name),
  })).sort((a, b) => b.count - a.count);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
