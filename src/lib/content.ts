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
    const allPhotos: Photo[] = [];
    
    // First pass: collect all photos with their preferred language
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
            
            const slug = file.replace(/\.(mdx|md)$/, '');
            const photo = {
              ...data,
              slug,
              content: marked(body),
            } as Photo;
            
            allPhotos.push(photo);
          }
        }
      }
    }
    
    // Second pass: filter by language with fallback to English
    const photoMap = new Map<string, Photo>();
    
    // First, add all photos for the requested language
    allPhotos.forEach(photo => {
      if (photo.lang === lang) {
        photoMap.set(photo.slug, photo);
      }
    });
    
    // Then, add English photos for any missing entries (fallback)
    allPhotos.forEach(photo => {
      if (!photo.lang || photo.lang === 'en') {
        if (!photoMap.has(photo.slug)) {
          photoMap.set(photo.slug, photo);
        }
      }
    });
    
    photos.push(...photoMap.values());
    
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
    const allAlbums: Album[] = [];
    
    // First pass: collect all albums
    for (const file of files) {
      if (file.endsWith('.md')) {
        const content = await readFile(join(albumsDir, file), 'utf-8');
        const { data } = matter(content);
        allAlbums.push(data as Album);
      }
    }
    
    // Filter by language with fallback to English
    const albumMap = new Map<string, Album>();
    
    // First, add albums for the requested language
    allAlbums.forEach(album => {
      if (album.lang === lang) {
        albumMap.set(album.slug, album);
      }
    });
    
    // Then, add English albums for any missing entries (fallback)
    allAlbums.forEach(album => {
      if (!album.lang || album.lang === 'en') {
        if (!albumMap.has(album.slug)) {
          albumMap.set(album.slug, album);
        }
      }
    });
    
    albums.push(...albumMap.values());
    
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
    const allPosts: JournalPost[] = [];
    
    // First pass: collect all posts
    for (const file of files) {
      if (file.endsWith('.mdx') || file.endsWith('.md')) {
        const content = await readFile(join(journalDir, file), 'utf-8');
        const { data, content: body } = matter(content);
        
        const slug = file.replace(/\.(mdx|md)$/, '');
        const htmlContent = marked(body);
        const post = {
          ...data,
          slug,
          content: htmlContent,
          readTime: calculateReadTime(body),
        } as JournalPost;
        
        allPosts.push(post);
      }
    }
    
    // Filter by language with fallback to English
    const postMap = new Map<string, JournalPost>();
    
    // First, add posts for the requested language
    allPosts.forEach(post => {
      if (post.lang === lang) {
        postMap.set(post.slug, post);
      }
    });
    
    // Then, add English posts for any missing entries (fallback)
    allPosts.forEach(post => {
      if (!post.lang || post.lang === 'en') {
        if (!postMap.has(post.slug)) {
          postMap.set(post.slug, post);
        }
      }
    });
    
    posts.push(...postMap.values());
    
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