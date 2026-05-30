import { describe, expect, it } from 'vitest';
import { GAMES, GENRES } from '../games';
import { GAME_FEATURED } from '../featured';

describe('game catalog', () => {
  it('exposes four games with consistent fields', () => {
    expect(GAMES).toHaveLength(4);
    const validIcons = new Set(['kanji', 'clock', 'map', 'rhythm']);
    for (const g of GAMES) {
      expect(g.jp.length).toBeGreaterThan(0);
      expect(g.en.length).toBeGreaterThan(0);
      expect(validIcons.has(g.icon)).toBe(true);
      expect(g.hue).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  it('marks exactly one game as the new release', () => {
    const news = GAMES.filter((g) => g.tag === 'new');
    expect(news).toHaveLength(1);
  });

  it('lists "すべて" as the first genre filter', () => {
    expect(GENRES[0]).toBe('すべて / All');
  });

  it('exposes a featured game with hue color', () => {
    expect(GAME_FEATURED.jp).toBe('Kanji Drop');
    expect(GAME_FEATURED.hue).toMatch(/^#[0-9a-fA-F]{6}$/);
  });
});
