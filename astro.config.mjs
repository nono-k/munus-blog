// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkBreaks from 'remark-breaks';
import remarkGemoji from 'remark-gemoji';
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
    remarkPlugins: [remarkBreaks, remarkGemoji],
    rehypePlugins: [[rehypePrettyCode, codeOptions]],
  },
});
