"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import {
  PiHouse,
  PiHouseFill,
  PiBriefcase,
  PiBriefcaseFill,
  PiFolderSimple,
  PiFolderSimpleFill,
  PiArticle,
  PiArticleFill,
  PiEnvelopeSimple,
  PiEnvelopeSimpleFill,
} from "react-icons/pi";

/**
 * Navbar — dock ikon di tengah atas.
 * Logo dari /public/logo.png (disarankan 512x512 px, transparan) atau logo.svg.
 * Tema biru Persib: glass putih kebiruan, navy, dan gradasi biru.
 * Navbar disembunyikan selama opening (html[data-og="playing"]).
 */

// Ganti ke "/logo.svg" kalau kamu punya versi vektor (paling tajam)
const LOGO_SRC = "/logo.png";

const EASE_OUT = "cubic-bezier(.16, 1, .3, 1)";

// Menandai animasi masuk sudah pernah diputar (bertahan selama sesi SPA)
let navPlayed = false;

// Menandai opening pertama sudah selesai; setelah itu navbar tidak pernah ditahan lagi
let ogReleased = false;

// Batas maksimal opening boleh "playing" sebelum dipaksa selesai (ms)
const OG_SAFETY_MS = 8000;

// Jeda tunggu Opening menyetel data-og; kalau tidak pernah diset, navbar dilepas (ms)
const OG_GRACE_MS = 3000;

// Icon = versi garis (tidak aktif), IconActive = versi solid (aktif)
const navItems = [
  {
    id: "home",
    label: "Home",
    href: "/home",
    Icon: PiHouse,
    IconActive: PiHouseFill,
  },
  {
    id: "work",
    label: "Experience",
    href: "/experience",
    Icon: PiBriefcase,
    IconActive: PiBriefcaseFill,
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    Icon: PiFolderSimple,
    IconActive: PiFolderSimpleFill,
  },
  {
    id: "case-study",
    label: "Case Study",
    href: "/case-study",
    Icon: PiArticle,
    IconActive: PiArticleFill,
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    Icon: PiEnvelopeSimple,
    IconActive: PiEnvelopeSimpleFill,
  },
];

const css = `
/* =========================================
   PALET — BIRU PERSIB
   Ubah di sini kalau mau menyesuaikan warna.
========================================= */

.nv-wrap {
  --blue-50:  #F1F5FD;
  --blue-100: #D3E2FB;
  --blue-200: #B9D0F8;
  --blue-300: #9DBDF7;
  --blue-400: #6A9BF4;
  --blue-500: #1E63E0;
  --blue-600: #0B49B8;
  --blue-900: #0B2A66;
  --ink:      #14213D;
}

/* =========================================
   NAVBAR WRAPPER
========================================= */

.nv-wrap {
  position: fixed;
  top: clamp(14px, 3vh, 26px);
  left: 0;
  right: 0;
  z-index: 9999;
  height: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
  isolation: isolate;
}

/* =========================================
   NAVBAR — LIGHT BLUE GLASS
========================================= */

.nv {
  --size: 56px;
  --gap: 5px;
  --ico: 25px;

  /* Ukuran gambar logo di dalam lingkaran (PIKSEL BULAT supaya tajam).
     Harus bilangan bulat dan >= --size. Makin besar = logo makin ter-zoom.
     Zoom sebelumnya 135% (75.6px, pecahan, penyebab buram). */
  --logo-img: 76px;

  position: relative;
  box-sizing: border-box;
  pointer-events: auto;

  display: flex;
  align-items: center;
  gap: 14px;

  height: 68px;
  padding: 0 7px;

  border: 1px solid rgba(255, 255, 255, .85);
  border-radius: 999px;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, .78) 0%,
    rgba(241, 245, 253, .80) 50%,
    rgba(185, 208, 248, .72) 100%
  );

  -webkit-backdrop-filter: blur(24px) saturate(1.2);
  backdrop-filter: blur(24px) saturate(1.2);

  box-shadow:
    0 12px 36px rgba(20, 60, 140, .22),
    0 2px 6px rgba(11, 42, 102, .08),
    inset 0 1px 0 rgba(255, 255, 255, .95);

  opacity: 0;
  transform: translate3d(0, -26px, 0) scale(.96);

  animation:
    nv-in 1s ${EASE_OUT} var(--nav-at, 0s) forwards;
}

@keyframes nv-in {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

/* Navbar yang sudah pernah tampil: langsung muncul, tanpa animasi */
.nv.nv--static {
  opacity: 1;
  transform: none;
  animation: none;
}

/* =========================================
   LOGO — tanpa background, setajam mungkin
========================================= */

.nv-logo {
  position: relative;

  display: block;

  flex: 0 0 var(--size);
  width: var(--size);
  height: var(--size);
  min-width: var(--size);
  min-height: var(--size);

  box-sizing: border-box;
  overflow: hidden;

  /* tepi lingkaran bersih */
  isolation: isolate;
  clip-path: circle(50%);

  /* tanpa background, border, dan bayangan */
  border: 0;
  border-radius: 50%;
  background: none;
  box-shadow: none;

  text-decoration: none;

  transition: transform .4s ${EASE_OUT};
}

.nv-logo img {
  position: absolute;

  /* Ukuran & posisi memakai piksel bulat (bukan persen) supaya gambar
     jatuh tepat di grid piksel layar. Posisi pecahan seperti -9.8px
     adalah penyebab utama logo terlihat buram di dalam navbar kaca.
     Offset dihitung otomatis supaya logo selalu di tengah. */
  top: calc((var(--size) - var(--logo-img)) / 2);
  left: calc((var(--size) - var(--logo-img)) / 2);
  width: var(--logo-img);
  height: var(--logo-img);
  max-width: none;
  max-height: none;

  object-fit: contain;
  object-position: center;

  margin: 0;
  padding: 0;
  border: 0;
  background: none;

  /* Biarkan browser memakai resampling halus bawaan (paling tajam
     untuk mengecilkan gambar besar). Nilai -webkit-optimize-contrast
     dihapus karena bisa membuat tepi bergerigi di Safari. */
  image-rendering: auto;

  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

/* Cincin tipis di tepi logo supaya bentuk lingkarannya rapi */
.nv-logo::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(11, 73, 184, .14);
  pointer-events: none;
}

/* Hover: naik sedikit (bukan scale), karena scale membuat gambar
   di-resample ulang sehingga tepinya buram sesaat */
.nv-logo:hover {
  transform: translateY(-2px);
}

/* =========================================
   SEPARATOR
========================================= */

.nv-sep {
  flex: 0 0 1px;
  width: 1px;
  height: 28px;
  margin: 0 -2px;

  background: linear-gradient(
    180deg,
    rgba(20, 33, 61, 0),
    rgba(20, 33, 61, .20),
    rgba(20, 33, 61, 0)
  );
}

/* =========================================
   NAVIGATION LIST
========================================= */

.nv-list {
  position: relative;

  display: flex;
  align-items: center;
  gap: var(--gap);

  flex: 0 0 auto;

  margin: 0;
  padding: 0;
  list-style: none;
}

/* =========================================
   ACTIVE INDICATOR — BLUE GRADIENT
========================================= */

.nv-pill {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  width: var(--pw, var(--size));
  height: var(--size);

  border-radius: 999px;

  background: linear-gradient(
    145deg,
    var(--blue-100) 0%,
    var(--blue-300) 55%,
    var(--blue-400) 100%
  );

  box-shadow:
    0 4px 16px rgba(30, 99, 224, .35),
    inset 0 1px 0 rgba(255, 255, 255, .65);

  transform: translate3d(var(--px, 0px), 0, 0);

  transition: transform .55s cubic-bezier(.34, 1.4, .5, 1);
}

/* =========================================
   NAVIGATION BUTTONS
========================================= */

.nv-link {
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;

  flex: 0 0 auto;
  height: var(--size);

  box-sizing: border-box;
  border-radius: 999px;

  color: #4A5772;
  text-decoration: none;

  transition:
    color .3s,
    transform .35s ${EASE_OUT};
}

.nv-link:hover {
  color: var(--blue-900);
  transform: translateY(-2px);
}

.nv-link.is-active {
  color: var(--blue-900);
}

.nv-link:focus-visible,
.nv-logo:focus-visible {
  outline: 2px solid var(--blue-600);
  outline-offset: 3px;
}

/* =========================================
   ICON + LABEL — LABEL MEMBUKA KE SAMPING
========================================= */

.nv-link svg {
  display: block;
  flex: 0 0 auto;
  width: var(--ico);
  height: var(--ico);
  margin: 0 calc((var(--size) - var(--ico)) / 2);
}

.nv-link::after {
  content: attr(data-label);

  display: block;
  box-sizing: content-box;
  overflow: hidden;

  max-width: 0;
  margin: 0;

  color: var(--blue-900);

  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: .01em;
  white-space: nowrap;

  opacity: 0;
  pointer-events: none;

  transition:
    max-width .45s ${EASE_OUT},
    margin .45s ${EASE_OUT},
    opacity .25s;
}

.nv-link:hover::after,
.nv-link:focus-visible::after {
  max-width: calc(var(--n, 8) * 1ch);
  margin: 0 18px 0 -8px;
  opacity: 1;
  transition-delay: 0s, 0s, .08s;
}

/* =========================================
   TABLET & MOBILE
========================================= */

@media (max-width: 480px) {
  .nv {
    --size: 48px;
    --gap: 3px;
    --ico: 22px;

    /* piksel bulat juga di layar kecil */
    --logo-img: 65px;

    height: 60px;
    gap: 9px;
    padding: 0 6px;
  }

  .nv-sep {
    height: 24px;
  }
}

/* =========================================
   REDUCE MOTION
========================================= */

@media (prefers-reduced-motion: reduce) {
  .nv {
    animation-duration: .01s;
    animation-delay: 0s;
  }

  .nv-pill,
  .nv-link,
  .nv-link::after,
  .nv-logo {
    transition: none;
  }
}
`;

export default function Navbar() {
  const pathname = usePathname();

  // Active mengikuti halaman yang sedang dibuka
  const active =
    navItems.find((n) =>
      n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)
    )?.id ?? "home";

  const [mounted, setMounted] = React.useState(false);

  // Navbar DITAHAN sejak render pertama (kecuali opening pertama sudah selesai),
  // supaya tidak sempat muncul sebelum data-og="playing" diset oleh Opening.
  const [hold, setHold] = React.useState(() => !ogReleased);

  // Kalau navbar sudah pernah tampil, jangan putar animasi masuk lagi
  const [skipIntro] = React.useState(() => navPlayed);

  React.useEffect(() => {
    const root = document.documentElement;
    let seenPlaying = false;
    let graceTimer: number | undefined;
    let safetyTimer: number | undefined;

    const release = () => {
      ogReleased = true;
      window.clearTimeout(graceTimer);
      window.clearTimeout(safetyTimer);
      setHold(false);
    };

    const sync = () => {
      // Opening pertama sudah lewat: jangan pernah sembunyikan lagi
      if (ogReleased) {
        release();
        return;
      }

      const og = root.dataset.og;

      if (og === "playing") {
        // Opening sedang berjalan: tahan navbar
        seenPlaying = true;
        window.clearTimeout(graceTimer);
        setHold(true);

        // Safety: jangan biarkan tersangkut di "playing"
        window.clearTimeout(safetyTimer);
        safetyTimer = window.setTimeout(() => {
          if (root.dataset.og === "playing") root.dataset.og = "done";
          release();
        }, OG_SAFETY_MS);
      } else if (og === "done" || (seenPlaying && !og)) {
        // Opening benar-benar selesai ("done", atau atribut dihapus setelah playing)
        release();
      }
      // Nilai lain (belum diset / "ending" / dll): tetap tahan, tunggu Opening
    };

    sync();
    setMounted(true);
    navPlayed = true;

    // Kalau Opening tidak pernah menyetel data-og (mis. di-skip), lepas setelah jeda singkat
    if (!ogReleased && !seenPlaying) {
      graceTimer = window.setTimeout(() => {
        if (!seenPlaying) release();
      }, OG_GRACE_MS);
    }

    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-og"] });

    return () => {
      mo.disconnect();
      window.clearTimeout(graceTimer);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  const listRef = React.useRef<HTMLUListElement>(null);

  // Posisi & lebar indikator mengikuti ikon aktif, termasuk saat label membuka
  const syncPill = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const el = list.querySelector<HTMLElement>(".nv-link.is-active");
    if (!el) return;

    list.style.setProperty("--px", `${el.offsetLeft}px`);
    list.style.setProperty("--pw", `${el.offsetWidth}px`);
  }, []);

  React.useEffect(() => {
    syncPill();

    const list = listRef.current;
    if (!list) return;

    const ro = new ResizeObserver(syncPill);
    list.querySelectorAll(".nv-link").forEach((el) => ro.observe(el));
    window.addEventListener("resize", syncPill);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncPill);
    };
  }, [active, syncPill, mounted, hold]);

  // Selama opening: navbar TIDAK dirender sama sekali (bukan sekadar disembunyikan)
  if (!mounted || hold) return null;

  return createPortal(
    <div className="nv-wrap">
      <style>{css}</style>

      <nav
        className={`nv${skipIntro ? " nv--static" : ""}`}
        aria-label="Navigasi utama"
      >
        <Link className="nv-logo" href="/" aria-label="Beranda">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt="Logo SSP"
            width={256}
            height={256}
            decoding="sync"
            loading="eager"
            draggable={false}
          />
        </Link>

        <span className="nv-sep" aria-hidden="true" />

        <ul className="nv-list" ref={listRef}>
          <li className="nv-pill" aria-hidden="true" />

          {navItems.map(({ id, label, href, Icon, IconActive }) => {
            const Current = active === id ? IconActive : Icon;
            return (
            <li key={id}>
              <Link
                href={href}
                data-label={label}
                style={{ "--n": label.length + 1 } as React.CSSProperties}
                aria-label={label}
                aria-current={active === id ? "page" : undefined}
                className={`nv-link${active === id ? " is-active" : ""}`}
              >
                <Current aria-hidden="true" />
              </Link>
            </li>
            );
          })}
        </ul>
      </nav>
    </div>,
    document.body
  );
}