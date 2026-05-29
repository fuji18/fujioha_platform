export interface Theme {
  readonly jp: string;
  readonly en: string;
  readonly k: string;
}

export const HOK_THEMES: readonly Theme[] = [
  { jp: '朝市・市場', en: 'Morning markets', k: 'market' },
  { jp: 'ラーメンと汁物', en: 'Ramen & soup', k: 'ramen' },
  { jp: '自然と歩き', en: 'Nature & trails', k: 'nature' },
  { jp: '温泉', en: 'Hot springs', k: 'onsen' },
  { jp: '冬の歩き方', en: 'Winter walking', k: 'winter' },
  { jp: '始発と終電', en: 'First & last trains', k: 'transit' },
];
