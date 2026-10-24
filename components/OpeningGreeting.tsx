"use client";

import React from "react";

type OpeningGreetingProps = {
  accent?: string;
  accent2?: string;
  children?: React.ReactNode;
  onFinish?: () => void;
};

const greetings = [
  { text: "Welcome", lang: "en" },
  { text: "Selamat Datang", lang: "id" },
  { text: "Bienvenido", lang: "es" },
  { text: "Bienvenue", lang: "fr" },
];

// ---------- Timing (detik) ----------
const FIRST_WORD_AT = 0.5; // jeda sebelum kata pertama
const WORD_STEP = 1.0; // jarak antar kata (sekaligus durasi tiap kata)
const LAST_IN_DUR = 0.8; // durasi kata terakhir masuk
const HOLD_END = 0.8; // tahan kata terakhir sebelum wipe
const EXIT_DUR = 1.0; // durasi wipe

const EASE_OUT = "cubic-bezier(.16, 1, .3, 1)";
const EASE_IN_OUT = "cubic-bezier(.76, 0, .24, 1)";

const WORD_START = greetings.map((_, i) => FIRST_WORD_AT + i * WORD_STEP);

const LAST = greetings.length - 1;

const LAST_DONE = WORD_START[LAST] + LAST_IN_DUR;

const LOAD_START = FIRST_WORD_AT;
const EXIT_AT = LAST_DONE + HOLD_END;
const LOAD_DUR = EXIT_AT - LOAD_START;

// Home mulai masuk bersamaan dengan wipe
const HOME_AT = EXIT_AT + 0.2;

// Bertahan selama pindah halaman, reset saat refresh / tab baru
let openingPlayed = false;

// Dipakai Home dan page "/" untuk tahu opening sudah diputar atau belum
export const hasOpeningPlayed = () => openingPlayed;

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Instrument+Serif&display=swap');

/* Palet biru Persib: #F1F5FD (dasar), #B9D0F8, #6A9BF4, #0B49B8 (aksen), #0B2A66 (navy), #14213D (teks) */

@property --og-num {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}

.og-root {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  background: #F1F5FD;
  color: #14213D;
}

.og-root, .og-root * {
  box-sizing: border-box;
}

/* ---------- Halaman Home ---------- */
.og-next {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(11,73,184,.4) transparent;
  -webkit-overflow-scrolling: touch;

  transform: translate3d(0, 4vh, 0);

  animation: og-next ${EXIT_DUR}s ${EASE_IN_OUT} ${EXIT_AT}s forwards;
}

@keyframes og-next {
  to { transform: translate3d(0, 0, 0); }
}

/* ---------- Opening overlay ---------- */
.og-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  background: #F1F5FD;
  font-family: 'DM Sans', system-ui, sans-serif;
  color: #14213D;
  clip-path: inset(0 0 0 0);
  will-change: clip-path;

  animation: og-exit ${EXIT_DUR}s ${EASE_IN_OUT} ${EXIT_AT}s forwards;
}

@keyframes og-exit {
  from { clip-path: inset(0 0 0 0); }
  to   { clip-path: inset(0 0 100% 0); }
}

/* ---------- Opening content ---------- */
.og-content {
  position: absolute;
  inset: 0;
  animation: og-out .5s ${EASE_IN_OUT} ${EXIT_AT}s forwards;
}

@keyframes og-out {
  to { opacity: 0; }
}

/* ---------- Meta (pojok-pojok) ---------- */
.og-meta {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 clamp(20px, 5vw, 64px);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(20,33,61,.5);
  opacity: 0;
  animation: og-fade .8s ease .1s forwards;
}

.og-meta-top { top: clamp(20px, 4svh, 36px); }
.og-meta-bottom { bottom: clamp(24px, 5svh, 44px); }

.og-count::after {
  counter-reset: og-n var(--og-num);
  content: counter(og-n) "%";
  font-variant-numeric: tabular-nums;
  animation: og-count ${LOAD_DUR}s linear ${LOAD_START}s forwards;
}

@keyframes og-count {
  to { --og-num: 100; }
}

@keyframes og-fade {
  to { opacity: 1; }
}

/* ---------- Greeting ---------- */
.og-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 0 clamp(20px, 5vw, 64px);
}

.og-wrap {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
}

.og-rule {
  width: 100%;
  height: 1px;
  background: rgba(20,33,61,.14);
  transform-origin: left;
  transform: scaleX(0);
  animation: og-rule 1.2s ${EASE_OUT} .2s forwards;
}

@keyframes og-rule {
  to { transform: scaleX(1); }
}

.og-stage {
  position: relative;
  width: 100%;
  height: clamp(100px, min(14vw, 26svh), 200px);
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(56px, min(10vw, 18svh), 148px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -.02em;
  color: #0B2A66;
}

.og-word {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.og-w {
  display: inline-block;
  opacity: 0;
  will-change: transform, opacity;
  animation: og-word ${WORD_STEP}s both;
}

.og-w-last {
  animation: og-word-in ${LAST_IN_DUR}s ${EASE_OUT} both;
}

@keyframes og-word {
  0% {
    opacity: 0;
    transform: translate3d(0, 14px, 0);
    animation-timing-function: ${EASE_OUT};
  }
  30% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  72% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    animation-timing-function: ease-in;
  }
  100% {
    opacity: 0;
    transform: translate3d(0, -14px, 0);
  }
}

@keyframes og-word-in {
  0%   { opacity: 0; transform: translate3d(0, 14px, 0); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); }
}

/* ---------- Subtitle ---------- */
.og-sub {
  margin-top: clamp(4px, 1svh, 12px);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: #0B49B8;
  opacity: 0;
  animation: og-fade .9s ease .8s forwards;
}

/* ---------- Progress line ---------- */
.og-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: rgba(20,33,61,.06);
}

.og-bar > i {
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: left;
  transform: scaleX(0);
  background: linear-gradient(90deg, var(--og-a2), #0B49B8);
  animation: og-bar ${LOAD_DUR}s ${EASE_IN_OUT} ${LOAD_START}s forwards;
}

@keyframes og-bar {
  to { transform: scaleX(1); }
}

/* ---------- Responsive ---------- */
@media (max-width: 600px) {
  .og-stage {
    font-size: clamp(40px, 12.5vw, 72px);
    height: clamp(64px, 18vw, 100px);
  }

  .og-center { padding: 0 6vw; }
  .og-meta { font-size: 10px; letter-spacing: .14em; }
  .og-sub { font-size: 11px; letter-spacing: .18em; }
}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .og-w,
  .og-rule,
  .og-sub,
  .og-meta,
  .og-content,
  .og-count::after,
  .og-bar > i,
  .og-next,
  .og-overlay {
    animation-duration: .01ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
  }

  .og-w-last {
    opacity: 1;
    transform: none !important;
  }
}
`;

export default function OpeningGreeting({
  accent = "#B9D0F8",
  accent2 = "#6A9BF4",
  children,
  onFinish,
}: OpeningGreetingProps) {
  // Sudah pernah main di sesi ini? Lewati opening. Dibaca sekali saat mount.
  const skip = React.useRef(openingPlayed).current;

  const [done, setDone] = React.useState(false);

  // Kasih tanda ke <html> selama opening berjalan, supaya navbar menunggu
  React.useEffect(() => {
    if (skip) return;
    const root = document.documentElement;
    root.dataset.og = "playing";
    return () => {
      delete root.dataset.og;
    };
  }, [skip]);

  const finish = React.useCallback(() => {
    openingPlayed = true;
    delete document.documentElement.dataset.og;
    setDone(true);
    onFinish?.();
  }, [onFinish]);

  // Bukan kunjungan pertama: langsung tampilkan Home tanpa opening
  if (skip) return <>{children}</>;

  return (
    <div className="og-root">
      <style>{css}</style>

      <section
        className="og-next"
        style={
          {
            background: "#F1F5FD",
            "--home-at": `${HOME_AT.toFixed(2)}s`,
          } as React.CSSProperties
        }
      >
        {children}
      </section>

      {!done && (
        <div
          className="og-overlay"
          style={{ "--og-a": accent, "--og-a2": accent2 } as React.CSSProperties}
          onAnimationEnd={(e) => {
            if (
              e.target === e.currentTarget &&
              e.animationName === "og-exit"
            ) {
              finish();
            }
          }}
        >
          <div className="og-content">
            <div className="og-meta og-meta-top" aria-hidden="true">
              <span>Portfolio</span>
              <span>{new Date().getFullYear()}</span>
            </div>

            <div className="og-center">
              <div className="og-wrap">
                <div className="og-rule" aria-hidden="true" />

                <div className="og-stage">
                  {greetings.map((g, wi) => {
                    const isLast = wi === LAST;

                    return (
                      <span
                        key={g.lang}
                        className="og-word"
                        lang={g.lang}
                        aria-label={g.text}
                      >
                        <span
                          aria-hidden="true"
                          className={`og-w${isLast ? " og-w-last" : ""}`}
                          style={{
                            animationDelay: `${WORD_START[wi].toFixed(3)}s`,
                          }}
                        >
                          {g.text}
                        </span>
                      </span>
                    );
                  })}
                </div>

                <div className="og-sub">To My Portfolio Website</div>
              </div>
            </div>

            <div className="og-meta og-meta-bottom" aria-hidden="true">
              <span>Loading</span>
              <span className="og-count" />
            </div>

            <div className="og-bar" aria-hidden="true">
              <i />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}