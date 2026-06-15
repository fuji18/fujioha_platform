import type { APIRoute } from 'astro';
import {
  buildSitemapXml,
  routesFromPages,
  type SitemapEntry,
} from '@fujioha/ui/sitemap';
import { loadUpdates } from '../lib/updates-source';
import { LEGAL_UPDATED_ISO } from '../lib/site-meta';

export const prerender = true;

const SITE = 'https://fujioha.com';

// 静的ページを自動検出する（手書き配列を廃し追記漏れを防ぐ）。
// sitemap.xml.ts 自身は .ts のため対象に含まれない。
const pageModules = import.meta.glob('./**/*.astro');

export const GET: APIRoute = async () => {
  const routes = routesFromPages(Object.keys(pageModules));

  // 更新情報が反映されるページ（トップと journal）の lastmod に最新の更新日を使う。
  const updates = await loadUpdates(); // publishedAt 降順
  const newestUpdate = updates[0]?.publishedAt;

  // 実在する日付だけを lastmod に割り当てる（捏造しない）。
  const lastmodByRoute: Record<string, string | undefined> = {
    '/': newestUpdate,
    '/journal': newestUpdate,
    '/privacy': LEGAL_UPDATED_ISO,
    '/terms': LEGAL_UPDATED_ISO,
    '/disclaimer': LEGAL_UPDATED_ISO,
  };

  const entries: SitemapEntry[] = routes.map((path) => ({
    path,
    lastmod: lastmodByRoute[path],
  }));

  return new Response(buildSitemapXml(entries, SITE), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
