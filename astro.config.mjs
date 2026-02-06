// @ts-check
import { defineConfig } from 'astro/config';

import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import remarkCallout from '@r4ai/remark-callout';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import icon from 'astro-icon';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGemoji from 'remark-gemoji';
import remarkLinkCard from 'remark-link-card';
import remarkMath from 'remark-math';
import { siteConfig } from './src/config';

const { siteUrl } = siteConfig;

const codeOptions = {
  theme: 'min-light',
  defaultLang: 'plaintext',
  transformers: [
    transformerCopyButton({
      visibility: 'hover',
      feedbackDuration: 2_500,
    }),
    {
      span(node) {
        if (node.properties?.style?.includes('#C2C3C5')) {
          // コメントの色を変更
          node.properties.style = 'color:#6a9955';
        }
      },
    },
  ],
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
  integrations: [
    mdx(),
    icon(),
    react(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    sitemap(),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkBreaks,
      remarkGemoji,
      remarkMath,
      remarkCallout,
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
      rehypeKatex,
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
