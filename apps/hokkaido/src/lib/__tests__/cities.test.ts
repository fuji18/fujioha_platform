import { describe, expect, it } from 'vitest';
import { HOK_CITIES } from '../cities';
import { HOK_THEMES } from '../themes';
import { HOK_RECENT } from '../recent';
import { HOK_FEATURED } from '../featured';

describe('hokkaido catalog', () => {
  it('lists six cities with consistent fields', () => {
    expect(HOK_CITIES).toHaveLength(6);
    for (const c of HOK_CITIES) {
      expect(c.jp.length).toBeGreaterThan(0);
      expect(c.en.length).toBeGreaterThan(0);
      expect(c.n).toBeGreaterThan(0);
    }
  });

  it('lists six themes', () => {
    expect(HOK_THEMES).toHaveLength(6);
    for (const t of HOK_THEMES) {
      expect(t.k).toMatch(/^[a-z]+$/);
    }
  });

  it('lists five recent articles in descending date order', () => {
    expect(HOK_RECENT).toHaveLength(5);
    const dates = HOK_RECENT.map((a) => a.date);
    const sorted = [...dates].sort().reverse();
    expect(dates).toEqual(sorted);
  });

  it('has a non-empty featured article', () => {
    expect(HOK_FEATURED.jp.length).toBeGreaterThan(0);
    expect(HOK_FEATURED.en.length).toBeGreaterThan(0);
  });
});
