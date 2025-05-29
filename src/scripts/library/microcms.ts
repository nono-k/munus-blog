import type { MicroCMSListContent, MicroCMSQueries } from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: import.meta.env.PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.PUBLIC_MICROCMS_API_KEY,
});

export type Books = {
  title: string;
  review: string;
  url: string;
  cover: string;
  author: string;
  category: BooksCategory;
  publishedDate: Date;
  postlink: string;
} & MicroCMSListContent;

export type BooksCategory = {
  name: string;
  slug: string;
} & MicroCMSListContent;

export const getBooks = async (queries?: MicroCMSQueries) => {
  return await client.getAllContents<Books>({ endpoint: 'books', queries });
};

export const getBooksCategory = async (queries?: MicroCMSQueries) => {
  return await client.getList<BooksCategory>({ endpoint: 'category', queries });
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
