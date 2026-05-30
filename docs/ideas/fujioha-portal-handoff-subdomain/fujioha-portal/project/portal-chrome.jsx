// portal-chrome.jsx — shared topbar + footer for fujioha subdomain pages.
// Consistent with the root (fujioha.com) chrome. Bilingual throughout.

function PortalTop({ sub, subJp, accent }) {
  return (
    <header className="pc-top">
      <div className="pc-top-inner">
        <nav className="pc-crumb">
          <a className="pc-crumb-root" href="index.html">
            <span className="pc-mark-dot" />
            <span className="pc-mark-name">fujioha</span>
          </a>
          <span className="pc-crumb-sep">/</span>
          <span className="pc-crumb-here">
            <span className="pc-mono">{sub}</span>
            <span className="pc-crumb-jp fp-jp">{subJp}</span>
          </span>
        </nav>
        <div className="pc-top-right">
          <a className="pc-link" href="index.html">
            <span className="fp-jp">通りへ戻る</span>
            <span className="fp-en fp-mute"> · back to the alley</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function PortalFooter({ sub, subJp, siblingSub, siblingJp, siblingEn, siblingHref }) {
  return (
    <footer className="pc-footer">
      <div className="pc-footer-inner">
        <div className="pc-footer-cross">
          <div className="pc-footer-eyebrow fp-mono">ふじおはの、ほかの店 · elsewhere on fujioha</div>
          <a className="pc-cross-card" href={siblingHref}>
            <div className="pc-cross-sub fp-mono">{siblingSub}.fujioha.com</div>
            <div className="pc-cross-jp fp-jp">{siblingJp}</div>
            <div className="pc-cross-en fp-en fp-mute">{siblingEn}</div>
            <div className="pc-cross-go">
              <span className="fp-jp">のぞいてみる</span>
              <span className="pc-arrow">→</span>
            </div>
          </a>
          <a className="pc-cross-card pc-cross-root" href="index.html">
            <div className="pc-cross-sub fp-mono">fujioha.com</div>
            <div className="pc-cross-jp fp-jp">通りのトップへ</div>
            <div className="pc-cross-en fp-en fp-mute">The morning portal</div>
            <div className="pc-cross-go">
              <span className="fp-jp">戻る</span>
              <span className="pc-arrow">→</span>
            </div>
          </a>
        </div>
        <div className="pc-footer-base">
          <div className="pc-footer-mark">
            <span className="pc-mark-dot" />
            <span className="pc-mark-name">fujioha</span>
            <span className="pc-footer-sub fp-mono fp-faint">/ {sub}</span>
          </div>
          <div className="pc-footer-meta fp-mono fp-faint">
            © 2024–2026 · by @nickname
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { PortalTop, PortalFooter });
