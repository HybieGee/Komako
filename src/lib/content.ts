import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface Photo {
  title: string;
  date: string;
  tags?: string[];
  album?: string;
  image: string;
  alt: string;
  location?: string;
  lang?: 'en' | 'ja';
  slug: string;
  content?: string;
}

export interface Album {
  title: string;
  slug: string;
  cover: string;
  summary: string;
  lang?: 'en' | 'ja';
  date?: string;
}

export interface JournalPost {
  title: string;
  date: string;
  excerpt: string;
  lang?: 'en' | 'ja';
  slug: string;
  content: string;
  readTime?: string;
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function getPhotos(lang: 'en' | 'ja' = 'en'): Promise<Photo[]> {
  try {
    const photosDir = join(process.cwd(), 'content', 'photos');
    const years = await readdir(photosDir).catch(() => []);
    const photos: Photo[] = [];
    
    for (const year of years) {
      const yearDir = join(photosDir, year);
      const months = await readdir(yearDir).catch(() => []);
      
      for (const month of months) {
        const monthDir = join(yearDir, month);
        const files = await readdir(monthDir).catch(() => []);
        
        for (const file of files) {
          if (file.endsWith('.mdx') || file.endsWith('.md')) {
            const content = await readFile(join(monthDir, file), 'utf-8');
            const { data, content: body } = matter(content);
            
            if (!data.lang || data.lang === lang) {
              const slug = file.replace(/\.(mdx|md)$/, '');
              photos.push({
                ...data,
                slug,
                content: marked(body),
              } as Photo);
            }
          }
        }
      }
    }
    
    return photos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export async function getAlbums(lang: 'en' | 'ja' = 'en'): Promise<Album[]> {
  try {
    const albumsDir = join(process.cwd(), 'content', 'albums');
    const files = await readdir(albumsDir).catch(() => []);
    const albums: Album[] = [];
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const content = await readFile(join(albumsDir, file), 'utf-8');
        const { data } = matter(content);
        
        if (!data.lang || data.lang === lang) {
          albums.push(data as Album);
        }
      }
    }
    
    return albums;
  } catch {
    return [];
  }
}

export async function getJournalPosts(lang: 'en' | 'ja' = 'en'): Promise<JournalPost[]> {
  try {
    const journalDir = join(process.cwd(), 'content', 'journal');
    const files = await readdir(journalDir).catch(() => []);
    const posts: JournalPost[] = [];
    
    for (const file of files) {
      if (file.endsWith('.mdx') || file.endsWith('.md')) {
        const content = await readFile(join(journalDir, file), 'utf-8');
        const { data, content: body } = matter(content);
        
        if (!data.lang || data.lang === lang) {
          const slug = file.replace(/\.(mdx|md)$/, '');
          const htmlContent = marked(body);
          posts.push({
            ...data,
            slug,
            content: htmlContent,
            readTime: calculateReadTime(body),
          } as JournalPost);
        }
      }
    }
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  const photos = await getPhotos();
  const tags = new Set<string>();
  
  photos.forEach(photo => {
    photo.tags?.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}