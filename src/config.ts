import type { HeaderLink, SiteConfig } from '@/types/config';

export const siteConfig: SiteConfig = {
  siteTitle: 'munus',
  siteDesc: '日常のつぶやき置き場',
  siteUrl: 'https://munus.dev',
  siteType: 'website',
  siteLocale: 'ja_JP',
  siteIcon: '/favicon.svg',
  siteImg: '/ogp.png',
};

export const headerLinks: HeaderLink[] = [
  { name: 'Home', url: '/' },
  {
    name: 'Blog',
    url: '',
    popover: [
      { name: 'Archive', url: '/archive' },
      { name: 'Category', url: '/blog/category' },
      { name: 'Tag', url: '/blog/tag' },
    ],
  },
  { name: 'Work', url: '/work' },
  { name: 'About', url: '/about' },
  { name: 'Contact', url: '/contact' },
];

export const COUNT_PER_PAGE: number = 10;
