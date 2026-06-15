import { describe, expect, it } from 'vitest';
import {
  buildWebSiteSchema,
  buildItemListSchema,
  buildBreadcrumbSchema,
} from '../structured-data';

describe('buildWebSiteSchema', () => {
  const schema = buildWebSiteSchema({
    name: 'ふじおは',
    url: 'https://fujioha.com',
    description: '個人がつくる小さなサイトの通り。',
  });

  it('is a WebSite node in the schema.org context', () => {
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
  });

  it('carries name / url / description', () => {
    expect(schema.name).toBe('ふじおは');
    expect(schema.url).toBe('https://fujioha.com');
    expect(schema.description).toBe('個人がつくる小さなサイトの通り。');
  });

  it('defaults inLanguage to ja', () => {
    expect(schema.inLanguage).toBe('ja');
  });

  it('embeds the operator as a Person publisher by default', () => {
    const publisher = schema.publisher as Record<string, unknown>;
    expect(publisher['@type']).toBe('Person');
    expect(publisher.name).toBe('@fuji18');
    // 既定の author に url が無ければ Person.url は出さない
    expect(publisher.url).toBeUndefined();
  });

  it('builds stable @id anchors from the normalized url', () => {
    expect(schema['@id']).toBe('https://fujioha.com/#website');
    const publisher = schema.publisher as Record<string, unknown>;
    expect(publisher['@id']).toBe('https://fujioha.com/#person');
  });

  it('normalizes a trailing slash in the url before anchoring', () => {
    const withSlash = buildWebSiteSchema({
      name: 'x',
      url: 'https://game.fujioha.com/',
      description: 'y',
    });
    expect(withSlash.url).toBe('https://game.fujioha.com');
    expect(withSlash['@id']).toBe('https://game.fujioha.com/#website');
  });

  it('honors a custom inLanguage and author', () => {
    const custom = buildWebSiteSchema({
      name: 'x',
      url: 'https://fujioha.com',
      description: 'y',
      inLanguage: 'ja-JP',
      author: { name: 'ふじおは', url: 'https://fujioha.com/about' },
    });
    expect(custom.inLanguage).toBe('ja-JP');
    const publisher = custom.publisher as Record<string, unknown>;
    expect(publisher.name).toBe('ふじおは');
    expect(publisher.url).toBe('https://fujioha.com/about');
  });
});

describe('buildItemListSchema', () => {
  const schema = buildItemListSchema({
    name: '公開中の Web ゲーム',
    items: [
      { name: 'ガチャ漢字', url: 'https://game.fujioha.com/kanji' },
      { name: '絶対色感', url: 'https://example.com/color' },
    ],
  });

  it('is an ItemList in the schema.org context', () => {
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('ItemList');
    expect(schema.name).toBe('公開中の Web ゲーム');
  });

  it('emits 1-based positioned ListItems with name and url', () => {
    const els = schema.itemListElement as Record<string, unknown>[];
    expect(els).toHaveLength(2);
    expect(els[0]).toMatchObject({
      '@type': 'ListItem',
      position: 1,
      name: 'ガチャ漢字',
      url: 'https://game.fujioha.com/kanji',
    });
    expect(els[1].position).toBe(2);
  });

  it('omits @id / name when not provided', () => {
    const bare = buildItemListSchema({ items: [{ name: 'x', url: 'https://x' }] });
    expect(bare['@id']).toBeUndefined();
    expect(bare.name).toBeUndefined();
  });

  it('embeds an item node when provided (e.g. VideoGame)', () => {
    const out = buildItemListSchema({
      items: [
        {
          name: 'ガチャ漢字',
          url: 'https://game.fujioha.com/kanji',
          item: { '@type': 'VideoGame', name: 'ガチャ漢字', genre: 'クイズ' },
        },
      ],
    });
    const el = (out.itemListElement as Record<string, unknown>[])[0];
    expect((el.item as Record<string, unknown>)['@type']).toBe('VideoGame');
  });

  it('produces an empty itemListElement for no items', () => {
    const empty = buildItemListSchema({ items: [] });
    expect(empty.itemListElement).toEqual([]);
  });
});

describe('buildBreadcrumbSchema', () => {
  const schema = buildBreadcrumbSchema([
    { name: 'ホーム', url: 'https://fujioha.com' },
    { name: 'About', url: 'https://fujioha.com/about' },
  ]);

  it('is a BreadcrumbList in the schema.org context', () => {
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
  });

  it('maps each crumb to a positioned ListItem with item=url', () => {
    const els = schema.itemListElement as Record<string, unknown>[];
    expect(els).toHaveLength(2);
    expect(els[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: 'https://fujioha.com',
    });
    expect(els[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: 'https://fujioha.com/about',
    });
  });
});
