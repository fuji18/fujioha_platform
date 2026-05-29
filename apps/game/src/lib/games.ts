export type GameIconKind = 'kanji' | 'clock' | 'map' | 'rhythm';
export type GameFlag = 'new' | 'wip' | null;

export interface Game {
  readonly jp: string;
  readonly en: string;
  readonly genre: string;
  readonly genreEn: string;
  readonly time: string;
  readonly tag: GameFlag;
  readonly icon: GameIconKind;
  readonly hue: string;
}

export const GAMES: readonly Game[] = [
  {
    jp: 'Kanji Drop',
    en: 'Falling-kanji puzzle',
    genre: 'パズル',
    genreEn: 'Puzzle',
    time: '~1 min',
    tag: 'new',
    icon: 'kanji',
    hue: '#f6d472',
  },
  {
    jp: '札幌時計台 1分タイマー',
    en: '60-second clock-tower mini',
    genre: '一分',
    genreEn: 'Idle',
    time: '1 min',
    tag: null,
    icon: 'clock',
    hue: '#7fb0d6',
  },
  {
    jp: '47都道府県あて',
    en: 'Guess the prefecture',
    genre: 'クイズ',
    genreEn: 'Quiz',
    time: '~5 min',
    tag: null,
    icon: 'map',
    hue: '#7fc99a',
  },
  {
    jp: 'おはようリズム',
    en: 'Morning rhythm tapper',
    genre: '音ゲー',
    genreEn: 'Rhythm',
    time: '~3 min',
    tag: 'wip',
    icon: 'rhythm',
    hue: '#d68fb0',
  },
];

export const GENRES: readonly string[] = [
  'すべて / All',
  'パズル / Puzzle',
  'クイズ / Quiz',
  '一分 / Idle',
  '音ゲー / Rhythm',
];
