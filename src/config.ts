import type { HeaderLink, SiteConfig } from '@/types/config';

export const siteConfig: SiteConfig = {
  siteTitle: 'munus',
  siteDesc: '',
  siteUrl: 'https://munus.dev',
  siteType: 'website',
  siteLocale: 'ja_JP',
  siteIcon: '/favicon.svg',
  siteImg: '/ogp.png',
  background: {
    src: 'https://placehold.jp/1300x300.png',
  },
};

export const headerLinks: HeaderLink[] = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'About', url: '/about' },
  { name: 'Contact', url: '/contact' },
];
