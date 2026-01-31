import type { ImageMetadata } from 'astro';

export type SiteConfig = {
  siteTitle: string;
  siteDesc: string;
  siteUrl: string;
  siteType: string;
  siteLocale: string;
  siteIcon: string;
  siteImg: string;
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

export type Info = {
  title: string;
  slug: string;
  // body: string;
};

export type BlogPostData = {
  body: string;
  title: string;
  pubDate: Date;
  updateDate?: Date;
  image?: ImageMetadata;
  ogp?: string;
  category: string;
  tags: string[];
  description: string;
  pin?: boolean;
  draft?: boolean;
  slug: string;
  prevTitle?: string;
  prevSlug?: string;
  nextTitle?: string;
  nextSlug?: string;
};
