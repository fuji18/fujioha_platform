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
