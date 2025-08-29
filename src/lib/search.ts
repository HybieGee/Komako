import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getPhotos, getAlbums, getJournalPosts } from './content';

export interface SearchItem {
  title: string;
  url: string;
  type: 'photo' | 'album' | 'journal';
  excerpt?: string;
  tags?: string[];
  date?: string;
}

export async function buildSearchIndex(): Promise<void> {
  const photos = await getPhotos();
  const albums = await getAlbums();
  const posts = await getJournalPosts();
  
  const searchItems: SearchItem[] = [
    ...photos.map(photo => ({
      title: photo.title,
      url: `/photo/${photo.slug}`,
      type: 'photo' as const,
      tags: photo.tags,
      date: photo.date,
    })),
    ...albums.map(album => ({
      title: album.title,
      url: `/albums/${album.slug}`,
      type: 'album' as const,
      excerpt: album.summary,
    })),
    ...posts.map(post => ({
      title: post.title,
      url: `/journal/${post.slug}`,
      type: 'journal' as const,
      excerpt: post.excerpt,
      date: post.date,
    })),
  ];
  
  const indexPath = join(process.cwd(), 'public', 'search-index.json');
  await writeFile(indexPath, JSON.stringify(searchItems, null, 2));
}