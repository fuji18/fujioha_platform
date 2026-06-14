import { escapeXml } from './feed';

/** sitemap の 1 エントリ。 */
export interface SitemapEntry {
  /** サイト相対パス（例: '/about'）。 */
  path: string;
  /** 最終更新日（W3C 日付、例: '2026-06-07'）。任意。捏造せず実在の日付のみ。 */
  lastmod?: string;
}

/** string を SitemapEntry に正規化する。 */
function toEntry(entry: string | SitemapEntry): SitemapEntry {
  return typeof entry === 'string' ? { path: entry } : entry;
}

/**
 * sitemap.xml を生成する。
 * @param entries サイト相対パス、または `{ path, lastmod? }`（混在可）
 * @param site    サイトの絶対 URL（例: 'https://fujioha.com'）
 */
export function buildSitemapXml(
  entries: ReadonlyArray<string | SitemapEntry>,
  site: string,
): string {
  const urls = entries
    .map(toEntry)
    .map(({ path, lastmod }) => {
      const loc = escapeXml(new URL(path, site).href);
      const lastmodTag = lastmod
        ? `<lastmod>${escapeXml(lastmod)}</lastmod>`
        : '';
      return `  <url><loc>${loc}</loc>${lastmodTag}</url>`;
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

/**
 * `import.meta.glob('./**\/*.astro')` のキー群から、sitemap に載せる静的ルートを
 * 導出する純関数。手書きのパス配列を廃し、ページ追加時の追記漏れを防ぐ。
 *
 * - 先頭 `./`（または `/`）と末尾 `.astro` を除去
 * - basename が `404` のページは除外
 * - `[param]` を含む動的ルートは静的 sitemap から除外
 * - `index` はディレクトリのルートに畳む（`index`→`/`、`blog/index`→`/blog`）
 * - `/` を先頭に安定ソートして返す
 *
 * @param keys glob のキー（例: ['./index.astro', './about.astro']）
 */
export function routesFromPages(keys: readonly string[]): string[] {
  const routes = new Set<string>();

  for (const key of keys) {
    const rel = key.replace(/^\.?\//, '').replace(/\.astro$/, '');
    if (rel.includes('[')) continue; // 動的ルート

    const segments = rel.split('/');
    if (segments[segments.length - 1] === '404') continue;
    if (segments[segments.length - 1] === 'index') segments.pop();

    const route = '/' + segments.join('/');
    routes.add(route === '/' ? '/' : route.replace(/\/+$/, ''));
  }

  return [...routes].sort((a, b) =>
    a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b),
  );
}
