import type { APIRoute } from 'astro';
import {
  buildSitemapXml,
  routesFromPages,
  type SitemapEntry,
} from '@fujioha/ui/sitemap';
import { loadGameFeedItems } from '../lib/feed-source';

export const prerender = true;

const SITE = 'https://game.fujioha.com';

// 静的ページを自動検出する（手書き配列を廃し追記漏れを防ぐ）。
const pageModules = import.meta.glob('./**/*.astro');

export const GET: APIRoute = async () => {
  const routes = routesFromPages(Object.keys(pageModules));

  // トップは公開済みゲームの棚。最新公開ゲームの日付を lastmod にする。
  const items = await loadGameFeedItems();
  const newestGame = items.reduce<string>(
    (max, item) => (item.pubDate > max ? item.pubDate : max),
    '',
  );

  const lastmodByRoute: Record<string, string | undefined> = {
    '/': newestGame || undefined,
  };

  const entries: SitemapEntry[] = routes.map((path) => ({
    path,
    lastmod: lastmodByRoute[path],
  }));

  return new Response(buildSitemapXml(entries, SITE), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
