import { describe, expect, it } from 'vitest';
import { buildSitemapXml, routesFromPages } from '../sitemap';

describe('buildSitemapXml', () => {
  const xml = buildSitemapXml(['/', '/about', '/journal'], 'https://fujioha.com');

  it('is a well-formed urlset', () => {
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  });

  it('emits an absolute loc per path (string input, backward compatible)', () => {
    expect((xml.match(/<url>/g) ?? []).length).toBe(3);
    expect(xml).toContain('<loc>https://fujioha.com/</loc>');
    expect(xml).toContain('<loc>https://fujioha.com/about</loc>');
    expect(xml).toContain('<loc>https://fujioha.com/journal</loc>');
  });

  it('does not emit <lastmod> for plain string entries', () => {
    expect(xml).not.toContain('<lastmod>');
  });

  it('emits <lastmod> only for entries that carry one', () => {
    const out = buildSitemapXml(
      [
        { path: '/', lastmod: '2026-06-10' },
        { path: '/about' },
        '/contact',
      ],
      'https://fujioha.com',
    );
    expect(out).toContain(
      '<loc>https://fujioha.com/</loc><lastmod>2026-06-10</lastmod>',
    );
    // lastmod の無いエントリはタグを出さない
    expect(out).toContain('<loc>https://fujioha.com/about</loc></url>');
    expect(out).toContain('<loc>https://fujioha.com/contact</loc></url>');
    expect((out.match(/<lastmod>/g) ?? []).length).toBe(1);
  });
});

describe('routesFromPages', () => {
  it('maps page-file glob keys to routes', () => {
    const routes = routesFromPages([
      './index.astro',
      './about.astro',
      './journal.astro',
    ]);
    expect(routes).toEqual(['/', '/about', '/journal']);
  });

  it('drops the 404 page', () => {
    expect(routesFromPages(['./index.astro', './404.astro'])).toEqual(['/']);
  });

  it('drops dynamic routes', () => {
    expect(
      routesFromPages(['./index.astro', './blog/[slug].astro']),
    ).toEqual(['/']);
  });

  it('collapses nested index files to their directory root', () => {
    expect(
      routesFromPages(['./index.astro', './blog/index.astro', './blog/post.astro']),
    ).toEqual(['/', '/blog', '/blog/post']);
  });

  it('keeps the homepage first and sorts the rest', () => {
    const routes = routesFromPages([
      './terms.astro',
      './index.astro',
      './about.astro',
    ]);
    expect(routes[0]).toBe('/');
    expect(routes).toEqual(['/', '/about', '/terms']);
  });

  it('is robust to a leading slash instead of dot-slash', () => {
    expect(routesFromPages(['/about.astro'])).toEqual(['/about']);
  });
});
