/**
 * Schema.org 構造化データ（JSON-LD）の生成ヘルパー。
 * SeoHead に渡す `structuredData` を組み立てるために各アプリの BaseLayout で使う。
 * 文字列ではなくプレーンオブジェクトを返し、出力側（SeoHead）で JSON.stringify する。
 */

/** 運営者（Person）情報。 */
export interface SchemaAuthor {
  name: string;
  /** プロフィール等の URL。任意。 */
  url?: string;
}

export interface WebSiteSchemaInput {
  /** サイト表示名（例: 'ふじおは'）。 */
  name: string;
  /** サイトのルート絶対 URL（例: 'https://fujioha.com'。末尾スラッシュ有無は問わない）。 */
  url: string;
  /** サイト説明。 */
  description: string;
  /** 言語タグ。既定 'ja'。 */
  inLanguage?: string;
  /** 運営者。既定 `{ name: '@fuji18' }`。 */
  author?: SchemaAuthor;
}

/** 末尾スラッシュを除いた origin+path を返す（@id の安定化用）。 */
function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

/**
 * `WebSite` スキーマ（publisher として運営者 `Person` を埋め込む）を生成する。
 * サイト全体を表すため各サイトのトップ／全ページの <head> で出力してよい。
 */
export function buildWebSiteSchema(
  input: WebSiteSchemaInput,
): Record<string, unknown> {
  const { name, description } = input;
  const inLanguage = input.inLanguage ?? 'ja';
  const author = input.author ?? { name: '@fuji18' };
  const base = normalizeUrl(input.url);

  const person: Record<string, unknown> = {
    '@type': 'Person',
    '@id': `${base}/#person`,
    name: author.name,
  };
  if (author.url) {
    person.url = author.url;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    name,
    url: base,
    description,
    inLanguage,
    publisher: person,
  };
}

/** ItemList の 1 要素。 */
export interface ListItemInput {
  /** 表示名。 */
  name: string;
  /** リンク先 URL（外部可）。 */
  url: string;
  /** ListItem.item に入れる詳細ノード（例: VideoGame）。任意。 */
  item?: Record<string, unknown>;
}

/**
 * `ItemList` スキーマを生成する。カタログ的な一覧ページ（公開ゲーム一覧、
 * 更新一覧など）の構造を検索エンジンに伝える。要素が 0 のときは呼び出し側で
 * 出力可否を判断する想定（空リストは出さない）。
 */
export function buildItemListSchema(input: {
  items: readonly ListItemInput[];
  /** リストの名前。任意。 */
  name?: string;
  /** 安定参照用 @id。任意。 */
  id?: string;
}): Record<string, unknown> {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: input.items.map((it, index) => {
      const li: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: it.name,
        url: it.url,
      };
      if (it.item) li.item = it.item;
      return li;
    }),
  };
  if (input.id) node['@id'] = input.id;
  if (input.name) node.name = input.name;
  return node;
}

/** BreadcrumbList の 1 要素。 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * `BreadcrumbList` スキーマを生成する。パンくず（例: ホーム > About）を
 * 検索結果に伝える。フラットなサイトでは 2 階層（Home > Page）になる。
 */
export function buildBreadcrumbSchema(
  items: readonly BreadcrumbItem[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
