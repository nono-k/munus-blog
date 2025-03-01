import type { ImageMetadata } from 'astro';

export type SiteConfig = {
  siteTitle: string;
  siteDesc: string;
  siteUrl: string;
  siteType: string;
  siteLocale: string;
  siteIcon: string;
  siteImg: string;

  background: {
    src: string;
  };
};

export type HeaderLink = {
  name: string;
  url: string;
  popover?: {
    name: string;
    url: string;
  }[];
};

export type ProfileConfig = {
  avatar: ImageMetadata;
  name: string;
  bio: string;
  links: {
    name: string;
    icon: string;
    url: string;
  }[];
};

export type Category = {
  name: string;
  slug: string;
};

export type Tags = {
  name: string;
  slug: string;
};

export type BlogPostData = {
  body: string;
  title: string;
  pubDate: Date;
  image?: string;
  ogp?: string;
  category: string;
  tags: string[];
  description: string;
  draft: boolean;
  prevTitle?: string;
  prevSlug?: string;
  nextTitle?: string;
  nextSlug?: string;
};
