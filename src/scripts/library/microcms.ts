import type { MicroCMSListContent, MicroCMSQueries } from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: import.meta.env.PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.PUBLIC_MICROCMS_API_KEY,
});

export type Books = {
  publishedAt: Date;
  title: string;
  review: string;
  url: string;
  cover: string;
  author: string;
  category: BooksCategory;
  publishedDate: Date;
  tags: BooksTag[];
  postlink: string;
} & MicroCMSListContent;

export type BooksCategory = {
  name: string;
  slug: string;
} & MicroCMSListContent;

export type BooksTag = {
  name: string;
  slug: string;
  order: number;
} & MicroCMSListContent;

export const getBooks = async (queries?: MicroCMSQueries) => {
  return await client.getAllContents<Books>({ endpoint: 'books', queries });
};

export const getBooksCategory = async (queries?: MicroCMSQueries) => {
  return await client.getList<BooksCategory>({ endpoint: 'category', queries });
};

export const getBooksTags = async (queries?: MicroCMSQueries) => {
  return await client.getList<BooksTag>({
    endpoint: 'tags',
    queries: { limit: 100 },
  });
};

export const getBooksDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return await client.getListDetail<Books>({
    endpoint: 'books',
    contentId,
    queries,
  });
};

export const getBooksByTags = async (tags: { id: string }[]) => {
  return await client.getList<Books>({
    endpoint: 'books',
    queries: {
      filters: `tags[contains]${tags.map(tag => tag.id).join(',')}`,
    },
  });
};
