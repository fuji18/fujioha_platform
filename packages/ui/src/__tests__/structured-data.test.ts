import { describe, expect, it } from 'vitest';
import { buildWebSiteSchema } from '../structured-data';

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
