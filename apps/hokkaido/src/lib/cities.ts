export interface City {
  readonly jp: string;
  readonly en: string;
  readonly n: number;
  readonly note: string;
}

export const HOK_CITIES: readonly City[] = [
  { jp: '札幌', en: 'Sapporo', n: 5, note: '街と山が15分で行き来できる街' },
  { jp: '函館', en: 'Hakodate', n: 3, note: '朝市と坂と、海のにおい' },
  { jp: '小樽', en: 'Otaru', n: 2, note: '運河は早朝がいちばん静か' },
  { jp: '知床', en: 'Shiretoko', n: 2, note: '人より熊の数が多い半島' },
  { jp: '富良野', en: 'Furano', n: 1, note: '夏の丘、冬の粉雪' },
  { jp: '釧路', en: 'Kushiro', n: 1, note: '湿原と霧と、炉端' },
];
