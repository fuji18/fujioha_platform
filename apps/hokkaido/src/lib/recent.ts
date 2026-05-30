export interface RecentArticle {
  readonly jp: string;
  readonly en: string;
  readonly city: string;
  readonly theme: string;
  readonly read: string;
  readonly date: string;
}

export const HOK_RECENT: readonly RecentArticle[] = [
  {
    jp: '雨の札幌で行きたいラーメン10軒',
    en: "10 ramen shops for Sapporo's rainy days",
    city: '札幌',
    theme: 'ラーメン',
    read: '4 min',
    date: '2026.05.20',
  },
  {
    jp: '知床の朝、ヒグマに会わない歩き方',
    en: 'Shiretoko mornings without bumping into a bear',
    city: '知床',
    theme: '自然',
    read: '5 min',
    date: '2026.05.12',
  },
  {
    jp: '小樽、観光客のいない時間帯',
    en: "Otaru's empty hours",
    city: '小樽',
    theme: '歩き',
    read: '3 min',
    date: '2026.05.04',
  },
  {
    jp: '冬の札幌、滑らない靴と歩き方',
    en: "Sapporo in winter: shoes that don't slip",
    city: '札幌',
    theme: '冬',
    read: '4 min',
    date: '2026.04.22',
  },
  {
    jp: '富良野の丘、観光バスが来る前に',
    en: 'Furano hills before the tour buses',
    city: '富良野',
    theme: '自然',
    read: '3 min',
    date: '2026.04.10',
  },
];
