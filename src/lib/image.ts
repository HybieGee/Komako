export const imageFormats = ['webp', 'avif', 'jpg'] as const;
export const imageSizes = [320, 640, 960, 1280, 1920] as const;

export interface ImageOptions {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  class?: string;
}

export function getImageSrcset(src: string): string {
  return imageSizes
    .map(size => `${src}?w=${size} ${size}w`)
    .join(', ');
}

export function getImageSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw';
}

export function getDominantColor(src: string): string {
  const colors = [
    '#f3f4f6',
    '#e5e7eb', 
    '#d1d5db',
    '#fef3c7',
    '#fce7f3',
    '#ede9fe',
    '#dbeafe',
    '#ccfbf1',
  ];
  
  const hash = src.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
}