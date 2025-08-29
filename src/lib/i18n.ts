export type Language = 'en' | 'ja';

export const defaultLang: Language = 'en';

export const languages = {
  en: 'English',
  ja: '日本語',
} as const;

export const ui = {
  en: {
    'nav.gallery': 'Gallery',
    'nav.timeline': 'Timeline',
    'nav.albums': 'Albums',
    'nav.journal': 'Journal',
    'nav.about': 'About',
    'nav.search': 'Search',
    'home.title': "Komako's Gallery",
    'home.subtitle': 'Capturing moments with my Scottish Fold companion',
    'home.viewAll': 'View all photos in timeline',
    'timeline.title': 'Timeline',
    'timeline.subtitle': "A chronological journey through Komako's adventures",
    'timeline.loadMore': 'Load more',
    'albums.title': 'Photo Albums',
    'albums.subtitle': "Curated collections of Komako's best moments",
    'journal.title': 'Journal',
    'journal.subtitle': 'Stories and notes from life with Komako',
    'journal.empty': 'No journal entries yet. Check back soon!',
    'about.title': 'About Komako',
    'about.age': 'years and',
    'about.months': 'months of pure joy',
    'search.title': 'Search',
    'search.subtitle': 'Find specific photos, albums, or journal entries',
    'search.placeholder': 'Search photos, albums, journal...',
    'search.popularTags': 'Popular Tags',
    'search.noResults': 'No results found',
    'search.clearFilter': 'Clear filter',
    'photo.back': '← Back to gallery',
    'photo.share': 'Share this photo',
    'photo.shareTwitter': 'Share on Twitter',
    'photo.copyLink': 'Copy link',
    'album.back': '← Back to albums',
    'album.photos': 'photos',
    'post.back': '← Back to journal',
    'post.share': 'Share this post',
  },
  ja: {
    'nav.gallery': 'ギャラリー',
    'nav.timeline': 'タイムライン',
    'nav.albums': 'アルバム',
    'nav.journal': 'ジャーナル',
    'nav.about': 'こまこについて',
    'nav.search': '検索',
    'home.title': 'こまこのギャラリー',
    'home.subtitle': 'スコティッシュフォールドの相棒との瞬間を記録',
    'home.viewAll': 'すべての写真をタイムラインで見る',
    'timeline.title': 'タイムライン',
    'timeline.subtitle': 'こまこの冒険を時系列で',
    'timeline.loadMore': 'もっと見る',
    'albums.title': 'フォトアルバム',
    'albums.subtitle': 'こまこの最高の瞬間を集めたコレクション',
    'journal.title': 'ジャーナル',
    'journal.subtitle': 'こまこと過ごす日々の物語とメモ',
    'journal.empty': 'まだ記事がありません。また後でチェックしてください！',
    'about.title': 'こまこについて',
    'about.age': '歳',
    'about.months': 'ヶ月の純粋な喜び',
    'search.title': '検索',
    'search.subtitle': '特定の写真、アルバム、記事を探す',
    'search.placeholder': '写真、アルバム、記事を検索...',
    'search.popularTags': '人気のタグ',
    'search.noResults': '結果が見つかりませんでした',
    'search.clearFilter': 'フィルターをクリア',
    'photo.back': '← ギャラリーに戻る',
    'photo.share': 'この写真をシェア',
    'photo.shareTwitter': 'Twitterでシェア',
    'photo.copyLink': 'リンクをコピー',
    'album.back': '← アルバムに戻る',
    'album.photos': '枚の写真',
    'post.back': '← ジャーナルに戻る',
    'post.share': 'この記事をシェア',
  },
} as const;

export function useTranslations(lang: Language) {
  return function t(key: keyof typeof ui.en): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}