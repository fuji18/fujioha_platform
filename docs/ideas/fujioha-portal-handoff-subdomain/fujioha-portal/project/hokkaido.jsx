// hokkaido.jsx — content for hokkaido.fujioha.com
// 北海道の歩き方 — a local-led travel guide. Warm, editorial, morning light.

// ─── Data ───────────────────────────────────────────────────────────────
const HOK_FEATURED = {
  jp: '函館の朝市、地元の人の歩き方',
  en: "How a local actually does Hakodate's morning market",
  lead: '観光客がまず案内される店ではなく、地元の人が朝に立ち寄る三軒を、回る順番ごと案内します。いちばん混む時間と、その前に着くための始発も。',
  leadEn: 'Not the stall everyone is sent to first — the three I actually stop at, in the order I walk them, with the train that gets you there before the crowd.',
  city: '函館 · Hakodate',
  read: '6 min',
  date: '2026.05.27',
};

const HOK_CITIES = [
  { jp: '札幌', en: 'Sapporo',   n: 5, note: '街と山が15分で行き来できる街' },
  { jp: '函館', en: 'Hakodate',  n: 3, note: '朝市と坂と、海のにおい' },
  { jp: '小樽', en: 'Otaru',     n: 2, note: '運河は早朝がいちばん静か' },
  { jp: '知床', en: 'Shiretoko', n: 2, note: '人より熊の数が多い半島' },
  { jp: '富良野', en: 'Furano',  n: 1, note: '夏の丘、冬の粉雪' },
  { jp: '釧路', en: 'Kushiro',   n: 1, note: '湿原と霧と、炉端' },
];

const HOK_THEMES = [
  { jp: '朝市・市場', en: 'Morning markets', k: 'market' },
  { jp: 'ラーメンと汁物', en: 'Ramen & soup', k: 'ramen' },
  { jp: '自然と歩き', en: 'Nature & trails', k: 'nature' },
  { jp: '温泉', en: 'Hot springs', k: 'onsen' },
  { jp: '冬の歩き方', en: 'Winter walking', k: 'winter' },
  { jp: '始発と終電', en: 'First & last trains', k: 'transit' },
];

const HOK_RECENT = [
  { jp: '雨の札幌で行きたいラーメン10軒', en: "10 ramen shops for Sapporo's rainy days",
    city: '札幌', theme: 'ラーメン', read: '4 min', date: '2026.05.20' },
  { jp: '知床の朝、ヒグマに会わない歩き方', en: 'Shiretoko mornings without bumping into a bear',
    city: '知床', theme: '自然', read: '5 min', date: '2026.05.12' },
  { jp: '小樽、観光客のいない時間帯', en: "Otaru's empty hours",
    city: '小樽', theme: '歩き', read: '3 min', date: '2026.05.04' },
  { jp: '冬の札幌、滑らない靴と歩き方', en: "Sapporo in winter: shoes that don't slip",
    city: '札幌', theme: '冬', read: '4 min', date: '2026.04.22' },
  { jp: '富良野の丘、観光バスが来る前に', en: 'Furano hills before the tour buses',
    city: '富良野', theme: '自然', read: '3 min', date: '2026.04.10' },
];

// ─── Page ───────────────────────────────────────────────────────────────
function HokkaidoPage() {
  return (
    <div className="hk">
      <PortalTop sub="hokkaido" subJp="北海道の歩き方" accent="var(--accent)" />

      <HkHero />
      <HkFeatured />
      <HkCities />
      <HkThemes />
      <HkRecent />
      <HkLocal />

      <PortalFooter
        sub="hokkaido"
        subJp="北海道の歩き方"
        siblingSub="game"
        siblingJp="思いつきの Web ゲーム"
        siblingEn="Small web games, made by hand"
        siblingHref="game.html"
      />
    </div>
  );
}

function HkHero() {
  return (
    <section className="hk-hero">
      <div className="hk-hero-art">
        <HokkaidoScene />
      </div>
      <div className="hk-hero-inner">
        <div className="hk-eyebrow fp-mono">hokkaido.fujioha.com · 旅のガイド</div>
        <h1 className="hk-title fp-jp">北海道の<br />歩き方</h1>
        <p className="hk-title-en fp-en">Hokkaido, on foot — by someone who lives here.</p>
        <p className="hk-lede">
          <span className="fp-jp">観光ガイドには載らない、地元の人の朝の回り方。住んでいる人間が、実際に歩く順番で書いています。</span>
          <span className="fp-en fp-mute">A travel guide written from the inside — the routes, the hours, and the small detours a local actually takes.</span>
        </p>
        <div className="hk-hero-meta">
          <span className="hk-chip fp-mono">{HOK_CITIES.length} 都市 · cities</span>
          <span className="hk-chip fp-mono">14 記事 · guides</span>
          <span className="hk-chip fp-mono">今週更新 · updated this week</span>
        </div>
      </div>
    </section>
  );
}

// Layered snowy-mountain horizon with morning sun — matches root's hokkaido card
function HokkaidoScene() {
  return (
    <svg viewBox="0 0 900 600" className="hk-scene" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="hk-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fde6c8" />
          <stop offset="55%" stopColor="#f6ddc2" />
          <stop offset="100%" stopColor="#f3ece0" />
        </linearGradient>
        <linearGradient id="hk-far" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#cdbfae" />
          <stop offset="100%" stopColor="#e6dcce" />
        </linearGradient>
      </defs>
      <rect width="900" height="600" fill="url(#hk-sky)" />
      <circle cx="650" cy="170" r="74" fill="var(--accent)" opacity=".82" />
      {/* far ridges */}
      <path d="M0 360 L150 300 L300 350 L460 280 L620 340 L780 270 L900 320 L900 600 L0 600 Z" fill="url(#hk-far)" />
      {/* near snowy peaks */}
      <path d="M0 460 L120 360 L210 410 L320 320 L430 400 L560 300 L680 390 L800 330 L900 380 L900 600 L0 600 Z"
        fill="#ffffff" opacity=".92" stroke="#1f1a14" strokeWidth=".6" strokeOpacity=".25" />
      {/* peak shadows */}
      <path d="M320 320 L380 360 L430 400 L320 400 Z" fill="#1f1a14" opacity=".06" />
      <path d="M560 300 L620 345 L680 390 L560 390 Z" fill="#1f1a14" opacity=".06" />
      {/* foreground field */}
      <path d="M0 520 L300 500 L600 515 L900 495 L900 600 L0 600 Z" fill="#1f1a14" opacity=".08" />
      {/* pines */}
      {[80, 200, 360, 520, 700, 820].map((x, i) => (
        <g key={i} transform={`translate(${x},${510 - (i % 3) * 6})`} opacity=".55">
          <path d="M0 0 L-7 14 L-3 14 L-9 26 L-3 26 L-11 40 L11 40 L3 26 L9 26 L3 14 L7 14 Z" fill="#1f1a14" />
        </g>
      ))}
    </svg>
  );
}

function HkFeatured() {
  const f = HOK_FEATURED;
  return (
    <section className="hk-section">
      <SectionHead eyebrow="今週の一本 · This week's guide"
        jp="まずは、ここから。" en="Start here." />
      <article className="hk-feature">
        <div className="hk-feature-art"><FeatureArt /></div>
        <div className="hk-feature-body">
          <div className="hk-feature-meta">
            <span className="hk-tag">{f.city}</span>
            <span className="fp-mono fp-faint">{f.read} read · {f.date}</span>
          </div>
          <h3 className="hk-feature-jp fp-jp">{f.jp}</h3>
          <p className="hk-feature-en fp-en">{f.en}</p>
          <p className="hk-feature-lead">
            <span className="fp-jp">{f.lead}</span>
            <span className="fp-en fp-mute">{f.leadEn}</span>
          </p>
          <span className="hk-readmore">
            <span className="fp-jp">続きを読む</span>
            <span className="fp-en fp-mute">Read the guide</span>
            <span className="pc-arrow">→</span>
          </span>
        </div>
      </article>
    </section>
  );
}

function FeatureArt() {
  return (
    <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="hk-feat" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fdebcf" />
          <stop offset="100%" stopColor="#e9a86e" />
        </linearGradient>
      </defs>
      <rect width="600" height="480" fill="url(#hk-feat)" />
      <circle cx="430" cy="150" r="100" fill="#fff" opacity=".35" />
      {/* market stalls — simple rooflines */}
      <g stroke="#5c3b25" strokeWidth="2" fill="none" opacity=".55">
        <path d="M60 300 L140 260 L220 300" />
        <path d="M70 300 L70 380 M210 300 L210 380" />
        <path d="M260 320 L340 280 L420 320" />
        <path d="M270 320 L270 400 M410 320 L410 400" />
        <path d="M440 300 L520 260 L600 300" />
      </g>
      <rect x="60" y="380" width="500" height="100" fill="#5c3b25" opacity=".12" />
      {/* steam */}
      <g stroke="#fff" strokeWidth="3" fill="none" opacity=".5" strokeLinecap="round">
        <path d="M150 250 q-10 -18 4 -34 q12 -16 0 -32" />
        <path d="M330 270 q-10 -18 4 -34 q12 -16 0 -32" />
      </g>
    </svg>
  );
}

function HkCities() {
  return (
    <section className="hk-section">
      <SectionHead eyebrow="街から探す · Browse by city"
        jp="どの街へ行きますか。" en="Where are you headed?" />
      <div className="hk-cities">
        {HOK_CITIES.map((c, i) => (
          <a key={i} className="hk-city">
            <div className="hk-city-top">
              <span className="hk-city-jp fp-jp">{c.jp}</span>
              <span className="hk-city-n fp-mono">{c.n}</span>
            </div>
            <div className="hk-city-en fp-en">{c.en}</div>
            <div className="hk-city-note fp-jp fp-mute">{c.note}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function HkThemes() {
  return (
    <section className="hk-section">
      <SectionHead eyebrow="テーマから探す · Browse by theme"
        jp="気分で選ぶなら。" en="Or pick by mood." />
      <div className="hk-themes">
        {HOK_THEMES.map((t, i) => (
          <a key={i} className={`hk-theme hk-theme-${t.k}`}>
            <span className="hk-theme-jp fp-jp">{t.jp}</span>
            <span className="hk-theme-en fp-en fp-mute">{t.en}</span>
            <span className="hk-theme-arrow pc-arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function HkRecent() {
  return (
    <section className="hk-section">
      <SectionHead eyebrow="最近の記事 · Recent guides"
        jp="新しく書いたもの。" en="Lately." right={<a className="pc-link fp-mono">すべて見る / All →</a>} />
      <ol className="hk-list">
        {HOK_RECENT.map((a, i) => (
          <li key={i} className="hk-list-item">
            <span className="hk-list-date fp-mono fp-faint">{a.date}</span>
            <span className="hk-list-tags">
              <span className="hk-tag">{a.city}</span>
              <span className="hk-tag hk-tag-soft">{a.theme}</span>
            </span>
            <span className="hk-list-title">
              <span className="hk-list-jp fp-jp">{a.jp}</span>
              <span className="hk-list-en fp-en fp-mute">{a.en}</span>
            </span>
            <span className="hk-list-read fp-mono fp-faint">{a.read}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function HkLocal() {
  return (
    <section className="hk-section hk-local">
      <div className="hk-local-card">
        <div className="hk-local-avatar">
          <svg viewBox="0 0 120 120" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
            <rect width="120" height="120" fill="#f0b27a" />
            <circle cx="60" cy="48" r="24" fill="#fff" opacity=".85" />
            <path d="M24 116 Q60 80 96 116 Z" fill="#fff" opacity=".85" />
          </svg>
        </div>
        <div className="hk-local-body">
          <div className="hk-eyebrow fp-mono">書いている人 · who writes this</div>
          <p className="hk-local-text">
            <span className="fp-jp">札幌に住んで十数年。観光で来た友人を案内するうちに、自分用のメモが増えていきました。これはその延長です。広告も、提携店もありません。</span>
            <span className="fp-en fp-mute">Living in Sapporo for over a decade. This guide grew out of notes I kept for visiting friends. No ads, no sponsored stops — just where I'd actually take you.</span>
          </p>
          <div className="hk-local-sign fp-mono fp-mute">— @nickname</div>
        </div>
      </div>
    </section>
  );
}

// Shared section head
function SectionHead({ eyebrow, jp, en, right }) {
  return (
    <div className="hk-head">
      <div>
        <div className="hk-eyebrow fp-mono">{eyebrow}</div>
        <h2 className="hk-h2 fp-jp">{jp}</h2>
        <p className="hk-h2-en fp-en fp-mute">{en}</p>
      </div>
      {right ? <div className="hk-head-right">{right}</div> : null}
    </div>
  );
}

Object.assign(window, { HokkaidoPage });
