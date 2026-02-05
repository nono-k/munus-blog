import type { Info } from '@/types/config';

export const infoList: Info[] = [
  {
    title: 'About',
    slug: '/about/',
    body: '<h2>Profile</h2><p>kamenono / かめのの<br/>音楽・読書・数学・プログラミングが好き。</p><h2>Social</h2><p>SNS 関係は下記です。フォローはお気軽にどうぞ。</p><ul><li>X / Twitter</li><li>GitHub</li><li>Filmarks</li><li>読書メーター</li></ul><h2>My Favorite</h2><p>私を構成する 42 枚は下記です。<br>趣味が合う人がいたら仲良くしてください。</p><h3>音楽</h3><div><img src="/images/about/favorite-music.png" alt="" /></div>',
  },
  {
    title: 'Work',
    slug: '/work/',
    body: '<div class="work"><div class="work__grid"><div class="work__img"><img src="/images/work/hypb-blog.png" alt=""></div><div class="work__body"><div class="work__title">нуль</div><div class="work__desc">技術ブログです。<br>主にフロントエンド周辺について書いています。<br>サイト名の由来はロシア語で零を意味することからつけました。</div></div></div><div class="work__grid"><div class="work__img"><img src="/images/work/feylo.png" alt=""></div><div class="work__body"><div class="work__title">Feylo</div><div class="work__desc">初学者向けの Web 制作についての<br>メディアサイトになります。<br>主にWeb制作におけるアニメーションの実装方法について解説しています。</div></div></div></div>',
  },
];

export const infoListSub: Info[] = [
  {
    title: 'Archive',
    slug: '/archive/',
  },
  {
    title: 'Contact',
    slug: '/contact/',
  },
  {
    title: 'Site Policy',
    slug: '/site-policy/',
  },
  {
    title: 'Privacy Policy',
    slug: '/privacy-policy/',
  },
];
