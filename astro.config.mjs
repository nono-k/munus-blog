// @ts-check
import { defineConfig } from 'astro/config';

import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGemoji from 'remark-gemoji';
import remarkLinkCard from 'remark-link-card';
import { siteConfig } from './src/config';

const { siteUrl } = siteConfig;

const codeOptions = {
  theme: 'catppuccin-frappe',
  defaultLang: 'plaintext',
  // @ts-ignore
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: 'text',
          value: ' ',
        },
      ];
    }
  },
  // @ts-ignore
  onVisitHighlightedLine(node) {
    if (!node.properties) {
      node.properties = {}; // propertiesが定義されていない場合は初期化する
    }
    if (!node.properties.className) {
      node.properties.className = []; // classNameが定義されていない場合は初期化する
    }
    node.properties.className.push('highlighted');
  },
};

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "src/styles/mixin.scss";',
        },
      },
    },
  },
  integrations: [mdx(), icon()],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkBreaks,
      remarkGemoji,
      [
        remarkLinkCard,
        {
          cache: true,
          shortenUrl: true,
        },
      ],
    ],
    rehypePlugins: [
      rehypeRaw,
      [rehypeExternalLinks, { target: '_blank' }],
      [rehypePrettyCode, codeOptions],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: {
            type: 'element',
            tagName: 'span',
            properties: {
              className: ['anchor-icon'],
              'data-pagefind-ignore': true,
            },
            children: [
              {
                type: 'text',
                value: '#',
              },
            ],
          },
        },
      ],
    ],
  },
});
