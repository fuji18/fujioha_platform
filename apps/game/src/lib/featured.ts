export interface FeaturedGame {
  readonly jp: string;
  readonly sub: string;
  readonly en: string;
  readonly desc: string;
  readonly descEn: string;
  readonly genre: string;
  readonly time: string;
  readonly controls: string;
  readonly hue: string;
  /** 公開状態。draft の間は「準備中 / Coming soon」として表示し、プレイ不可。 */
  readonly status: 'published' | 'draft';
}

export const GAME_FEATURED: FeaturedGame = {
  jp: 'ガチャ漢字',
  sub: 'ガチャで部首を引いて組む',
  en: 'Draw radicals from a gacha, build real kanji',
  desc: 'ガチャで引いた部首・つくりを、ひらめきで組み合わせて漢字を作り出す、運と発見の快感を組み合わせた1〜2分のスナック型ゲーム。',
  descEn:
    'Draw radicals and components from a gacha and combine them by inspiration into real kanji — a one-to-two-minute snack-sized game of luck and discovery.',
  genre: 'Puzzle · パズル',
  time: '1〜2 min',
  controls: 'クリックのみ / click only',
  hue: '#f6d472',
  status: 'draft',
};
