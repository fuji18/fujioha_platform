export interface FeaturedArticle {
  readonly jp: string;
  readonly en: string;
  readonly lead: string;
  readonly leadEn: string;
  readonly city: string;
  readonly read: string;
  readonly date: string;
}

export const HOK_FEATURED: FeaturedArticle = {
  jp: '函館の朝市、地元の人の歩き方',
  en: "How a local actually does Hakodate's morning market",
  lead: '観光客がまず案内される店ではなく、地元の人が朝に立ち寄る三軒を、回る順番ごと案内します。いちばん混む時間と、その前に着くための始発も。',
  leadEn:
    'Not the stall everyone is sent to first — the three I actually stop at, in the order I walk them, with the train that gets you there before the crowd.',
  city: '函館 · Hakodate',
  read: '6 min',
  date: '2026.05.27',
};
