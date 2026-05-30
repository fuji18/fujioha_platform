// game.jsx — content for game.fujioha.com
// 思いつきの Web ゲーム — a shelf of small browser games. Dark, arcade, playful.

const GAME_FEATURED = {
  jp: 'Kanji Drop',
  sub: '落ちてくる漢字を組む',
  en: 'Stack falling radicals into real kanji',
  desc: 'テトリスと漢字の偏旁を掛け合わせたパズル。落ちてくる部首を組み合わせて文字を完成させる。1プレイおよそ1分、語彙が増えるほど強くなる。',
  descEn: 'Half tetromino, half kanji radical. Slot the falling parts together to complete characters. About a minute a round — and the more kanji you know, the better you do.',
  genre: 'Puzzle · パズル',
  time: '~1 min',
  controls: '← → ↓ / tap',
  hue: '#f6d472',
};

const GAMES = [
  { jp: 'Kanji Drop', en: 'Falling-kanji puzzle', genre: 'パズル', genreEn: 'Puzzle',
    time: '~1 min', tag: 'new', icon: 'kanji', hue: '#f6d472' },
  { jp: '札幌時計台 1分タイマー', en: '60-second clock-tower mini', genre: '一分', genreEn: 'Idle',
    time: '1 min', tag: null, icon: 'clock', hue: '#7fb0d6' },
  { jp: '47都道府県あて', en: 'Guess the prefecture', genre: 'クイズ', genreEn: 'Quiz',
    time: '~5 min', tag: null, icon: 'map', hue: '#7fc99a' },
  { jp: 'おはようリズム', en: 'Morning rhythm tapper', genre: '音ゲー', genreEn: 'Rhythm',
    time: '~3 min', tag: 'wip', icon: 'rhythm', hue: '#d68fb0' },
];

const GENRES = ['すべて / All', 'パズル / Puzzle', 'クイズ / Quiz', '一分 / Idle', '音ゲー / Rhythm'];

function GamePage() {
  return (
    <div className="gm">
      <PortalTop sub="game" subJp="Web ゲーム" accent="var(--accent)" />
      <GmHero />
      <GmFeatured />
      <GmShelf />
      <GmNote />
      <PortalFooter
        sub="game"
        subJp="思いつきの Web ゲーム"
        siblingSub="hokkaido"
        siblingJp="北海道の歩き方"
        siblingEn="Hokkaido, by a local"
        siblingHref="hokkaido.html"
      />
    </div>
  );
}

function GmHero() {
  return (
    <section className="gm-hero">
      <div className="gm-hero-grid" aria-hidden="true"><FallingField /></div>
      <div className="gm-hero-inner">
        <div className="gm-eyebrow fp-mono">game.fujioha.com · あそびば</div>
        <h1 className="gm-title">
          <span className="gm-title-jp fp-jp">思いつきの</span>
          <span className="gm-title-en">Web Games</span>
        </h1>
        <p className="gm-lede">
          <span className="fp-jp">ジャンルはばらばら。ブラウザを開けば、その場で遊べる小さなゲームの棚です。だいたい一分で終わります。</span>
          <span className="fp-en fp-mute">A shelf of small browser games — different shapes, different rules, no installs. Most of them end in about a minute.</span>
        </p>
        <div className="gm-hero-meta">
          <span className="gm-chip fp-mono">{GAMES.length} games</span>
          <span className="gm-chip fp-mono">no install · ブラウザで完結</span>
          <span className="gm-chip fp-mono">free</span>
        </div>
      </div>
    </section>
  );
}

// animated-looking grid of falling blocks (static, but layered for depth)
function FallingField() {
  const blocks = [
    [2, 1, '#c96442'], [3, 1, '#c96442'], [3, 2, '#c96442'],
    [8, 0, '#f6d472'], [9, 0, '#f6d472'], [9, 1, '#f6d472'], [10, 1, '#f6d472'],
    [13, 3, '#7fc99a'], [13, 4, '#7fc99a'], [14, 4, '#7fc99a'], [14, 5, '#7fc99a'],
    [6, 5, '#7fb0d6'], [6, 6, '#7fb0d6'], [7, 6, '#7fb0d6'],
    [17, 2, '#d68fb0'], [18, 2, '#d68fb0'], [17, 3, '#d68fb0'], [18, 3, '#d68fb0'],
  ];
  const C = 34;
  return (
    <svg viewBox="0 0 760 380" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      {Array.from({ length: 24 }).map((_, r) =>
        Array.from({ length: 22 }).map((_, c) => (
          <rect key={`${r}-${c}`} x={c * C + 4} y={r * C + 4} width="1.5" height="1.5" fill="#fff" opacity=".08" />
        ))
      )}
      {blocks.map(([x, y, fill], i) => (
        <rect key={i} x={x * C} y={y * C} width={C - 3} height={C - 3} rx="2" fill={fill} opacity=".9" />
      ))}
    </svg>
  );
}

function GmFeatured() {
  const f = GAME_FEATURED;
  return (
    <section className="gm-section">
      <SectionHeadG eyebrow="新作 · Now playing" jp="今月の一本。" en="This month's release." />
      <article className="gm-feature">
        <div className="gm-feature-art" style={{ '--hue': f.hue }}>
          <div className="gm-feature-glyph fp-jp">漢</div>
          <div className="gm-feature-blocks"><MiniBlocks /></div>
        </div>
        <div className="gm-feature-body">
          <div className="gm-feature-tag">NEW</div>
          <h3 className="gm-feature-jp">{f.jp}</h3>
          <p className="gm-feature-sub fp-jp">{f.sub}</p>
          <p className="gm-feature-en fp-en">{f.en}</p>
          <p className="gm-feature-desc">
            <span className="fp-jp">{f.desc}</span>
            <span className="fp-en fp-mute">{f.descEn}</span>
          </p>
          <div className="gm-spec">
            <Spec label="ジャンル / Genre" value={f.genre} />
            <Spec label="プレイ時間 / Time" value={f.time} />
            <Spec label="操作 / Controls" value={f.controls} />
          </div>
          <button className="gm-play">
            <span className="gm-play-icon">▶</span>
            <span className="fp-jp">今すぐ遊ぶ</span>
            <span className="fp-en">Play now</span>
          </button>
        </div>
      </article>
    </section>
  );
}

function Spec({ label, value }) {
  return (
    <div className="gm-spec-item">
      <div className="gm-spec-label fp-mono">{label}</div>
      <div className="gm-spec-value fp-jp">{value}</div>
    </div>
  );
}

function MiniBlocks() {
  return (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <rect x="40" y="20" width="34" height="34" rx="3" fill="#c96442" />
      <rect x="74" y="20" width="34" height="34" rx="3" fill="#c96442" />
      <rect x="74" y="54" width="34" height="34" rx="3" fill="#c96442" />
      <rect x="108" y="120" width="34" height="34" rx="3" fill="#7fc99a" />
      <rect x="108" y="154" width="34" height="34" rx="3" fill="#7fc99a" />
      <rect x="74" y="154" width="34" height="34" rx="3" fill="#7fc99a" />
    </svg>
  );
}

function GmShelf() {
  return (
    <section className="gm-section">
      <SectionHeadG eyebrow="ぜんぶの棚 · The shelf" jp="ほかのゲーム。" en="Everything else on the shelf."
        right={
          <div className="gm-filters">
            {GENRES.map((g, i) => (
              <button key={i} className={`gm-filter ${i === 0 ? 'is-on' : ''}`}>{g}</button>
            ))}
          </div>
        } />
      <div className="gm-grid">
        {GAMES.map((g, i) => <GameCard key={i} {...g} />)}
      </div>
    </section>
  );
}

function GameCard({ jp, en, genre, genreEn, time, tag, icon, hue }) {
  return (
    <a className="gm-card">
      <div className="gm-card-art" style={{ '--hue': hue }}>
        <GameIcon kind={icon} hue={hue} />
        {tag && <span className={`gm-card-flag gm-flag-${tag}`}>{tag === 'new' ? 'NEW' : 'WIP'}</span>}
      </div>
      <div className="gm-card-body">
        <h3 className="gm-card-jp fp-jp">{jp}</h3>
        <p className="gm-card-en fp-en fp-mute">{en}</p>
        <div className="gm-card-foot">
          <span className="gm-card-genre">
            <span className="fp-jp">{genre}</span>
            <span className="fp-en fp-faint"> · {genreEn}</span>
          </span>
          <span className="gm-card-time fp-mono fp-faint">{time}</span>
        </div>
        <div className="gm-card-play">
          <span className="gm-play-icon">▶</span>
          <span className="fp-jp">{tag === 'wip' ? '準備中' : '遊ぶ'}</span>
          <span className="fp-en fp-mute">{tag === 'wip' ? 'Coming soon' : 'Play'}</span>
        </div>
      </div>
    </a>
  );
}

function GameIcon({ kind, hue }) {
  if (kind === 'kanji') {
    return <div className="gm-icon-glyph fp-jp" style={{ color: hue }}>漢</div>;
  }
  if (kind === 'clock') {
    return (
      <svg viewBox="0 0 120 120" className="gm-icon-svg" aria-hidden="true">
        <circle cx="60" cy="60" r="40" fill="none" stroke={hue} strokeWidth="4" />
        <line x1="60" y1="60" x2="60" y2="32" stroke={hue} strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="60" x2="80" y2="60" stroke={hue} strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'map') {
    return (
      <svg viewBox="0 0 120 120" className="gm-icon-svg" aria-hidden="true">
        <path d="M30 40 L55 30 L70 42 L92 36 L88 78 L62 88 L42 76 L28 82 Z"
          fill="none" stroke={hue} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }
  // rhythm
  return (
    <svg viewBox="0 0 120 120" className="gm-icon-svg" aria-hidden="true">
      {[34, 50, 66, 82].map((x, i) => (
        <rect key={i} x={x} y={60 - [18, 32, 12, 26][i]} width="9" height={[36, 64, 24, 52][i]}
          rx="3" fill={hue} />
      ))}
    </svg>
  );
}

function GmNote() {
  return (
    <section className="gm-section gm-note">
      <div className="gm-note-card">
        <div className="gm-eyebrow fp-mono">作っている人 · who makes these</div>
        <p className="gm-note-text">
          <span className="fp-jp">仕事の合間に、思いついたものから作っています。完成度より「一分で遊べて、また開きたくなる」を大事にしています。ソースは公開予定。</span>
          <span className="fp-en fp-mute">Made after work, one idea at a time. I care less about polish and more about whether you'd open it again tomorrow. Source coming soon.</span>
        </p>
        <div className="gm-note-sign fp-mono fp-mute">— @nickname</div>
      </div>
    </section>
  );
}

function SectionHeadG({ eyebrow, jp, en, right }) {
  return (
    <div className="gm-head">
      <div>
        <div className="gm-eyebrow fp-mono">{eyebrow}</div>
        <h2 className="gm-h2 fp-jp">{jp}</h2>
        <p className="gm-h2-en fp-en fp-mute">{en}</p>
      </div>
      {right ? <div className="gm-head-right">{right}</div> : null}
    </div>
  );
}

Object.assign(window, { GamePage });
