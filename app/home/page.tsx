"use client";

import React from "react";
import type { IconType } from "react-icons";
import {
  SiFigma,
  SiNextdotjs,
  SiTailwindcss,
  SiLaravel,
  SiPhp,
  SiGithub,
  SiVercel,
  SiClaude,
  SiGooglegemini,
} from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import {
  LuPencilRuler,
  LuMousePointerClick,
  LuWorkflow,
  LuArrowUpRight,
} from "react-icons/lu";
import { hasOpeningPlayed } from "../../components/OpeningGreeting";
import "./home.css";

/**
 * Home — hero satu layar + section di bawahnya.
 * Kiri: status, nama, role, intro singkat, tombol aksi.
 * Kanan: name card yang tergantung dari atas layar dengan tali panjang.
 * Card bisa di-drag lalu berayun (fisika pendulum).
 * Foto: taruh di /public/profile.png (kalau belum ada, tampil gradient).
 *
 * Semua style ada di ./home.css
 */

// Data hero
const NAME_FIRST = "Surya Satria";
const NAME_LAST = "Pratama";
const NAME = `${NAME_FIRST} ${NAME_LAST}`;
const ROLE = "UI/UX Designer & Web Developer";
const INTRO =
  "I design intuitive experiences and build modern, responsive websites that look good and work reliably.";
const HEADING = "Get to know me!";
const STATUS = "Open to Work & Internship";

// About: ganti ABOUT_PHOTO kalau punya foto lain (taruh di /public)
const ABOUT_PHOTO = "/Miror.jpg";
const ABOUT_PHOTO_POSITION = "center 18%";

// Bio About: dua paragraf, ubah teksnya di sini
const BIO_PARAS = [
  "I'm a UI/UX designer and web developer who enjoys turning ideas into practical digital experiences. Through academic projects and self-learning, I explore interface design with Figma and web development using Laravel and Tailwind CSS.",
  "I'm passionate about creating user-friendly interfaces and functional websites while continuously improving my design and development skills.",
];

const HEADING_WORDS = HEADING.split(" ");
const HEADING_LAST = HEADING_WORDS.pop();
const HEADING_HEAD = HEADING_WORDS.join(" ");

const icon = (d: React.ReactNode) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

const HIGHLIGHTS = [
  {
    title: "UI/UX Design",
    text: "User flows, wireframes, and interactive prototypes in Figma.",
    icon: icon(
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
  },
  {
    title: "Web Development",
    text: "Responsive websites built with Laravel and Tailwind CSS.",
    icon: icon(
      <>
        <path d="m16 18 6-6-6-6" />
        <path d="m8 6-6 6 6 6" />
      </>
    ),
  },
  {
    title: "User-centered",
    text: "A balance of aesthetics, usability, and performance.",
    icon: icon(
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Skills & experience: ubah isi di sini saja                         */
/*  Isi awal diambil dari bio & project kamu. Ganti org / period /     */
/*  points dengan pengalaman aslimu (magang, organisasi, freelance).   */
/* ------------------------------------------------------------------ */

type Job = {
  role: string;
  org: string;
  period: string;
  points: string[];
  current?: boolean;
};

// Kosong dulu. Selama array ini kosong, kolom Experience menampilkan kartu kosong.
// Contoh isi kalau nanti sudah ada:
// {
//   role: "UI/UX Designer",
//   org: "SATERA · Course project",
//   period: "UI/UX",
//   current: true, // opsional, menandai yang sedang berjalan
//   points: ["Apa yang kamu kerjakan.", "Hasil yang kamu capai."],
// },
const EXPERIENCE: Job[] = [];
const HAS_EXPERIENCE = EXPERIENCE.length > 0;

type ToolGroup = { title: string; items: string[] };

const TOOLS: ToolGroup[] = [
  {
    title: "Design",
    items: ["Figma", "Wireframing", "Prototyping", "User flows"],
  },
  {
    title: "Frontend",
    items: ["Next.js", "Tailwind CSS", "HTML & CSS"],
  },
  {
    title: "Backend",
    items: ["Laravel", "PHP"],
  },
  {
    title: "Workflow",
    items: ["Git & GitHub", "VS Code", "Vercel"],
  },
  {
    title: "AI tools",
    items: ["Claude", "ChatGPT", "Gemini"],
  },
];

// Logo tiap tool. Kalau `color` kosong, logo ikut warna teks (cocok untuk
// logo hitam seperti Next.js, GitHub, Vercel supaya aman di dark mode).
const TOOL_ICONS: Record<string, { Icon: IconType; color?: string }> = {
  Figma: { Icon: SiFigma, color: "#F24E1E" },
  Wireframing: { Icon: LuPencilRuler },
  Prototyping: { Icon: LuMousePointerClick },
  "User flows": { Icon: LuWorkflow },
  "Next.js": { Icon: SiNextdotjs },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "HTML & CSS": { Icon: FaHtml5, color: "#E34F26" },
  Laravel: { Icon: SiLaravel, color: "#FF2D20" },
  PHP: { Icon: SiPhp, color: "#777BB4" },
  "Git & GitHub": { Icon: SiGithub },
  "VS Code": { Icon: VscVscode, color: "#007ACC" },
  Vercel: { Icon: SiVercel },
  Claude: { Icon: SiClaude, color: "#D97757" },
  ChatGPT: { Icon: RiOpenaiFill },
  Gemini: { Icon: SiGooglegemini, color: "#8E75B2" },
};

function ToolIcon({ name, size = 16 }: { name: string; size?: number }) {
  const entry = TOOL_ICONS[name];
  if (!entry) return null;
  const { Icon, color } = entry;
  return (
    <i aria-hidden="true" style={color ? { color } : undefined}>
      <Icon size={size} />
    </i>
  );
}

/* ------------------------------------------------------------------ */
/*  Kartu ringkas di section Skills. Klik kartu untuk membuka pop up.  */
/*  groups  = grup di TOOLS yang tampil di pop up                      */
/*  preview = logo yang tampil di kartu (tanpa perlu dibuka)           */
/* ------------------------------------------------------------------ */

type SkillCard = {
  id: "experience" | "tools" | "ai";
  title: string;
  width: number; // lebar pop up (px)
  blurb?: string;
  groups?: string[];
  preview?: string[];
};

const SKILL_CARDS: SkillCard[] = [
  { id: "experience", title: "Experience", width: 560 },
  {
    id: "tools",
    title: "Tools",
    width: 720,
    blurb: "Design, frontend, backend, and workflow.",
    groups: ["Design", "Frontend", "Backend", "Workflow"],
    preview: ["Figma", "Next.js", "Tailwind CSS", "Laravel", "VS Code"],
  },
  {
    id: "ai",
    title: "AI tools",
    width: 480,
    blurb: "Assistants for research, code, and writing.",
    groups: ["AI tools"],
    preview: ["Claude", "ChatGPT", "Gemini"],
  },
];

const groupsOf = (card: SkillCard) =>
  TOOLS.filter((g) => card.groups?.includes(g.title));

const countItems = (card: SkillCard) =>
  groupsOf(card).reduce((n, g) => n + g.items.length, 0);

const cardBlurb = (card: SkillCard) =>
  card.id === "experience"
    ? HAS_EXPERIENCE
      ? `${EXPERIENCE.length} ${EXPERIENCE.length === 1 ? "entry" : "entries"}`
      : "Nothing here yet. Open to internships."
    : card.blurb;

/* ------------------------------------------------------------------ */
/*  Projects: ubah isi di sini saja                                    */
/*  Isi di bawah hanya contoh. Ganti dengan project aslimu.            */
/*  image    = path gambar di /public (opsional). Kalau kosong, kartu  */
/*             menampilkan mockup abstrak sesuai `tone`.               */
/*  portrait = true kalau gambarnya tegak (layar HP) -> frame HP.      */
/*             Kalau false -> frame laptop. Pakai screenshot polos.    */
/*  href     = link demo / case study (opsional)                       */
/*  repo     = link GitHub (opsional)                                  */
/*  tone     = 1 | 2 | 3, variasi warna mockup                         */
/*  features = deretan halaman penting di bawah project (opsional).    */
/*             Tiap item: title, text, image, device ("phone"/"laptop")*/
/*             Gambar = screenshot polos, frame perangkat dibuat CSS.  */
/*             Tips tajam: ekspor screenshot minimal 2x (lebar >= 460px)*/
/* ------------------------------------------------------------------ */

type Feature = {
  title: string;
  text: string;
  image: string; // screenshot polos halaman (tanpa mockup HP/laptop)
  device?: "phone" | "laptop"; // default: phone
};

type Project = {
  title: string;
  tagline?: string;
  tag: string;
  year: string;
  text: string;
  stack: string[];
  tone: 1 | 2 | 3;
  image?: string;
  portrait?: boolean;
  href?: string;
  repo?: string;
  features?: Feature[];
};

const PROJECTS_LEAD =
  "Projects I designed and built during my university courses, from first sketch to finished prototype.";

const PROJECTS: Project[] = [
  {
    title: "SATERA",
    tagline: "Mobility for Everyone.",
    tag: "UI/UX · Mobile App",
    year: "2025",
    text: "A transit app that brings every kind of public transport into one place, so people across Jabodetabek can travel more easily, choose greener trips, and move around with confidence, whatever their needs.",
    stack: ["Figma", "Prototyping", "User flows"],
    tone: 1,
    image: "/projects/SATERA/SATERA.png",
    portrait: true,
    href: "/projects",
    features: [
      {
        title: "Core Features",
        text: "Plan a trip across KRL, MRT, LRT, and Transjakarta in one search, then pay for every ride with a single QR code.",
        image: "/projects/SATERA/HOME.png",
      },
      {
        title: "Learn as You Ride",
        text: "Short, interactive lessons on traffic etiquette that reward good commuting habits and make civic learning engaging.",
        image: "/projects/SATERA/Edukasi.png",
      },
      {
        title: "Accessible for Everyone",
        text: "Inclusive routes and clear guidance for riders with disabilities, so everyone can travel with confidence.",
        image: "/projects/SATERA/Disabilitas.png",
      },
    ],
  },
  {
    title: "JASAKTI",
    tagline: "One Province, One Gateway.",
    tag: "UI/UX · Mobile App",
    year: "2025",
    text: "A mobile app that gathers scattered government services and information in one simple place, so residents no longer have to find their way through confusing bureaucracy.",
    stack: ["Figma", "Prototyping", "User flows"],
    tone: 2,
    image: "/projects/JASAKTI/JASAKTI.png",
    portrait: true,
    href: "/projects",
    features: [
      {
        title: "Citizen Reports",
        text: "Residents can report local problems straight from their phone, without having to visit an office.",
        image: "/projects/JASAKTI/LAPORAN.png",
      },
      {
        title: "Emergency Help",
        text: "Emergency contacts and ambulance requests are one tap away, so help is easy to reach when it matters most.",
        image: "/projects/JASAKTI/URGENT.png",
      },
      {
        title: "Food Price Watch",
        text: "Current staple food prices in one clear view, so residents can plan their spending with better information.",
        image: "/projects/JASAKTI/KOMODITAS.png",
      },
    ],
  },
];

/* Pop up memakai <dialog>: ESC menutup, fokus terkunci di dalam,
   klik area gelap juga menutup. */
function Modal({
  open,
  title,
  width,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  width: number;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="hm-modal"
      style={{ ["--mw" as string]: `${width}px` }}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="hm-modal-box">
        <header className="hm-modal-head">
          <h3>{title}</h3>
          <button
            type="button"
            className="hm-modal-x"
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>
        <div className="hm-modal-body">{open ? children : null}</div>
      </div>
    </dialog>
  );
}

const PHOTO = "/profile.png";
const PHOTO_POSITION = "center 20%";

// Pengaturan ayunan
const MAX_ANGLE = 0.62;
const FREQ = 2.6;
const DAMPING = 0.7;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Dekorasi latar untuk section di bawah hero.
 * Bentuk tiap section diatur lewat CSS (.hm-deco--{kind} .hm-d-N).
 * `extra` menambahkan class ke span tertentu (mis. hm-sel, hm-plus).
 */
type DecoKind = "about" | "skills" | "projects" | "contact";

const DECO_EXTRA: Record<DecoKind, Partial<Record<1 | 2 | 3 | 4, string>>> = {
  about: { 3: "hm-plus" },
  skills: { 3: "hm-sel" },
  projects: { 4: "hm-plus" },
  contact: {},
};

function Deco({ kind }: { kind: DecoKind }) {
  const extra = DECO_EXTRA[kind];
  return (
    <div className={`hm-deco hm-deco--${kind}`} aria-hidden="true">
      {([1, 2, 3, 4] as const).map((n) => (
        <span
          key={n}
          className={`hm-d hm-d-${n}${extra[n] ? ` ${extra[n]}` : ""}`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  // Dibaca sekali saat mount. true kalau opening baru saja diputar
  // (kita ada di /home setelah redirect).
  const [isStatic] = React.useState(() => hasOpeningPlayed());

  const anchorRef = React.useRef<HTMLDivElement>(null);
  const swingRef = React.useRef<HTMLDivElement>(null);
  const sectionRef = React.useRef<HTMLElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const [openCard, setOpenCard] = React.useState<SkillCard["id"] | null>(null);
  const activeCard = SKILL_CARDS.find((c) => c.id === openCard) ?? null;

  const [photoOk, setPhotoOk] = React.useState(true);
  const [aboutOk, setAboutOk] = React.useState(true);

  const s = React.useRef({
    theta: 0,
    omega: 0,
    dragging: false,
    grab: 0,
    lastT: 0,
    lastA: 0,
    raf: 0,
    running: false,
  });

  const apply = React.useCallback(() => {
    const el = swingRef.current;
    if (el) {
      el.style.transform = `rotate(${(s.current.theta * 180) / Math.PI}deg)`;
    }
  }, []);

  // Simulasi pendulum teredam
  const run = React.useCallback(() => {
    const st = s.current;
    if (st.running) return;
    st.running = true;

    let last = performance.now();

    const tick = (now: number) => {
      if (st.dragging) {
        st.running = false;
        return;
      }

      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      st.omega +=
        (-(FREQ * FREQ) * Math.sin(st.theta) - DAMPING * st.omega) * dt;
      st.theta += st.omega * dt;
      apply();

      if (Math.abs(st.theta) < 0.0005 && Math.abs(st.omega) < 0.0005) {
        st.theta = 0;
        st.omega = 0;
        apply();
        st.running = false;
        return;
      }

      st.raf = requestAnimationFrame(tick);
    };

    st.raf = requestAnimationFrame(tick);
  }, [apply]);

  // Ayunan pembuka sekali saat halaman dibuka
  React.useEffect(() => {
    const st = s.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let delay: number;
    if (isStatic) {
      delay = 0;
    } else {
      const at = sectionRef.current
        ? parseFloat(
            getComputedStyle(sectionRef.current).getPropertyValue("--home-at")
          )
        : NaN;
      delay = (Number.isFinite(at) ? at : 0.15) * 1000 + 750;
    }

    const t = window.setTimeout(() => {
      if (reduce) return;
      st.theta = 0.2;
      st.omega = 0;
      run();
    }, delay);

    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(st.raf);
      st.running = false;
    };
  }, [run, isStatic]);

  React.useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setPhotoOk(false);
  }, []);

  // Hero tidak boleh ter-scroll sendiri (hanya elemen hero, bukan halaman)
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reset = () => {
      if (el.scrollLeft !== 0) el.scrollLeft = 0;
      if (el.scrollTop !== 0) el.scrollTop = 0;
    };

    reset();
    el.addEventListener("scroll", reset, { passive: true });
    return () => el.removeEventListener("scroll", reset);
  }, []);

  const angleOf = (x: number, y: number) => {
    const r = anchorRef.current!.getBoundingClientRect();
    return Math.atan2(x - r.left, y - r.top);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = s.current;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.dataset.drag = "1";

    cancelAnimationFrame(st.raf);
    st.running = false;
    st.dragging = true;
    st.omega = 0;
    st.grab = angleOf(e.clientX, e.clientY) - st.theta;
    st.lastT = performance.now();
    st.lastA = st.theta;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = s.current;
    if (!st.dragging) return;

    const a = clamp(
      angleOf(e.clientX, e.clientY) - st.grab,
      -MAX_ANGLE,
      MAX_ANGLE
    );
    const now = performance.now();
    const dt = (now - st.lastT) / 1000;

    if (dt > 0) {
      st.omega = st.omega * 0.6 + ((a - st.lastA) / dt) * 0.4;
    }

    st.lastT = now;
    st.lastA = a;
    st.theta = a;
    apply();
  };

  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = s.current;
    if (!st.dragging) return;

    st.dragging = false;
    delete e.currentTarget.dataset.drag;

    if (performance.now() - st.lastT > 100) st.omega = 0;
    st.omega = clamp(st.omega, -8, 8);

    run();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    s.current.omega += e.key === "ArrowLeft" ? -3 : 3;
    run();
  };

  return (
    <>
      {/* Hero satu layar */}
      <section
        id="home"
        className={`hm${isStatic ? " hm--static" : ""}`}
        ref={sectionRef}
      >
        <div className="hm-bg" aria-hidden="true">
          <span className="hm-glow" />
          <span className="hm-arc" />
          <span className="hm-cell" style={{ left: 56, top: 224 }} />
          <span className="hm-cell" style={{ left: 112, top: 224 }} />
          <span className="hm-cell" style={{ left: 112, top: 280 }} />
        </div>

        <div className="hm-inner">
          <div className="hm-text">
            <div className="hm-status">
              <i aria-hidden="true" />
              {STATUS}
            </div>

            <h1 className="hm-name">
              <span>{NAME_FIRST}</span>
              <span className="hm-last">{NAME_LAST}</span>

              <i className="hm-cursor hm-cursor--a" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4 3l16 7.2-6.6 2.2L11 19.5z" />
                </svg>
                <b>UI/UX</b>
              </i>
              <i className="hm-cursor hm-cursor--b" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4 3l16 7.2-6.6 2.2L11 19.5z" />
                </svg>
                <b>Web Dev</b>
              </i>
            </h1>

            <p className="hm-role">{ROLE}</p>
            <p className="hm-intro">{INTRO}</p>

          </div>
        </div>

        <div className="hm-anchor" ref={anchorRef}>
          <div className="hm-swing" ref={swingRef}>
            <div className="hm-cord" aria-hidden="true" />

            <div
              className="hm-id"
              role="group"
              tabIndex={0}
              aria-label={`Name card ${NAME}. Tarik untuk mengayun, atau pakai panah kiri dan kanan.`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerEnd}
              onPointerCancel={onPointerEnd}
              onKeyDown={onKeyDown}
            >
              <span className="hm-ring" aria-hidden="true" />
              <span className="hm-slot" aria-hidden="true" />

              <div className="hm-photo">
                {photoOk && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    ref={imgRef}
                    src={PHOTO}
                    alt={`Foto ${NAME}`}
                    draggable={false}
                    style={{ objectPosition: PHOTO_POSITION }}
                    onError={() => setPhotoOk(false)}
                  />
                )}
              </div>

              <div className="hm-meta">
                <strong>{NAME}</strong>
                <span>{ROLE}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="hm-more hm-about">
        <Deco kind="about" />
        <div className="hm-more-inner hm-about-inner">
          <div className="hm-about-media">
            <span className="hm-about-rings" aria-hidden="true" />
            <div className="hm-about-photo">
              {aboutOk && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ABOUT_PHOTO}
                  alt={`Foto ${NAME}`}
                  style={{ objectPosition: ABOUT_PHOTO_POSITION }}
                  onError={() => setAboutOk(false)}
                />
              )}
            </div>
            <div className="hm-about-badge">
              <strong>{NAME}</strong>
              <span>{ROLE}</span>
            </div>
          </div>

          <div className="hm-about-text">
            <p className="hm-about-eyebrow">About me</p>
            <h2 className="hm-about-title">
              {HEADING_HEAD} <em>{HEADING_LAST}</em>
            </h2>

            {BIO_PARAS.map((para) => (
              <p key={para} className="hm-about-bio">
                {para}
              </p>
            ))}

            <ul className="hm-about-cards">
              {HIGHLIGHTS.map((h) => (
                <li key={h.title}>
                  <span className="hm-about-ico">{h.icon}</span>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="hm-more hm-more--tint hm-skills">
        <Deco kind="skills" />
        <div className="hm-more-inner hm-sk">
          <header className="hm-sk-head">
            <h2 className="hm-sk-title">
              Skills &amp; <em>experience</em>
            </h2>
            <p className="hm-sk-lead">
              The tools I design and build with, and the work that shaped how I
              use them.
            </p>
          </header>

          <ul className="hm-sc-grid">
            {SKILL_CARDS.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className="hm-sc"
                  aria-haspopup="dialog"
                  onClick={() => setOpenCard(c.id)}
                >
                  <span className="hm-sc-pill">{c.title}</span>

                  <span className="hm-sc-preview" aria-hidden="true">
                    {c.preview ? (
                      <span className="hm-sc-logos">
                        {c.preview.map((n) => (
                          <span key={n}>
                            <ToolIcon name={n} size={26} />
                          </span>
                        ))}
                        {countItems(c) > c.preview.length && (
                          <span className="more">
                            +{countItems(c) - c.preview.length}
                          </span>
                        )}
                      </span>
                    ) : (
                      <span
                        className={`hm-sc-tl${HAS_EXPERIENCE ? " is-filled" : ""}`}
                      >
                        <i />
                        <i />
                        <i />
                      </span>
                    )}
                  </span>

                  <span className="hm-sc-foot">
                    <span className="hm-sc-blurb">{cardBlurb(c)}</span>
                    <span className="hm-sc-plus" aria-hidden="true">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <Modal
            open={activeCard !== null}
            title={activeCard?.title ?? ""}
            width={activeCard?.width ?? 560}
            onClose={() => setOpenCard(null)}
          >
            {activeCard?.id === "experience" &&
              (HAS_EXPERIENCE ? (
                <ol className="hm-sk-tl">
                  {EXPERIENCE.map((job) => (
                    <li
                      key={job.role}
                      className={job.current ? "is-now" : undefined}
                    >
                      <span className="hm-sk-node" aria-hidden="true" />
                      <article className="hm-sk-job">
                        <div className="hm-sk-job-top">
                          <h4>{job.role}</h4>
                          <span className="hm-sk-period">{job.period}</span>
                        </div>
                        <p className="hm-sk-org">{job.org}</p>
                        <ul>
                          {job.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </article>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="hm-sk-job">
                  <div className="hm-sk-job-top">
                    <h4>Open to Opportunities</h4>
                  </div>
                  <p className="hm-sk-org">
                    Currently seeking internship opportunities to apply my skills, gain practical experience, and contribute to meaningful projects.
                  </p>
                </div>
              ))}

            {activeCard && activeCard.id !== "experience" && (
              <div className="hm-sk-panel">
                {groupsOf(activeCard).map((g) => (
                  <section key={g.title} className="hm-sk-group">
                    <h4>{g.title}</h4>
                    <ul className="hm-sk-chips">
                      {g.items.map((t) => (
                        <li key={t}>
                          <ToolIcon name={t} />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </Modal>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="hm-more hm-more--tint hm-projects">
        <Deco kind="projects" />
        <div className="hm-more-inner hm-pj">
          <header className="hm-pj-head">
            <div className="hm-pj-headtext">
              <p className="hm-about-eyebrow">Coursework</p>
              <h2 className="hm-pj-title">
                Course <em>projects</em>
              </h2>
              <p className="hm-pj-lead">{PROJECTS_LEAD}</p>
            </div>
          </header>

          <ul className="hm-pj-list">
            {PROJECTS.map((p, i) => (
              <li key={p.title} className="hm-pj-item">
                <div className={`hm-pj-row${i % 2 === 1 ? " is-flip" : ""}`}>
                  <div className="hm-pj-frame">
                    {p.image ? (
                      <div
                        className={`hm-dev hm-dev--${p.portrait ? "phone" : "laptop"}`}
                      >
                        <div className="hm-dev-screen">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.image}
                            alt={`Preview ${p.title}`}
                            draggable={false}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="hm-dev hm-dev--laptop">
                        <div
                          className={`hm-dev-screen hm-dev-screen--mock hm-tone-${p.tone}`}
                          aria-hidden="true"
                        >
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="hm-pj-info">
                    <div className="hm-pj-meta">
                      <span className="hm-pj-tag">{p.tag}</span>
                      <span className="hm-pj-year">{p.year}</span>
                    </div>

                    <h3>{p.title}</h3>
                    {p.tagline && (
                      <span className="hm-pj-tagline">{p.tagline}</span>
                    )}
                    <p>{p.text}</p>

                    <ul className="hm-pj-stack">
                      {p.stack.map((t) => (
                        <li key={t}>
                          <ToolIcon name={t} size={14} />
                          {t}
                        </li>
                      ))}
                    </ul>

                    {(p.href || p.repo) && (
                      <div className="hm-pj-links">
                        {p.href && (
                          <a
                            className="hm-pj-link"
                            href={p.href}
                          >
                            View project
                            <LuArrowUpRight size={16} aria-hidden="true" />
                          </a>
                        )}
                        {p.repo && (
                          <a
                            className="hm-pj-link hm-pj-link--soft"
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <SiGithub size={15} aria-hidden="true" />
                            Source
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {p.features && p.features.length > 0 && (
                  <ul className="hm-pj-feats">
                    {p.features.map((f) => (
                      <li key={f.title} className="hm-pj-feat">
                        <div
                          className={`hm-pj-feat-media hm-pj-feat-media--${f.device ?? "phone"}`}
                        >
                          <span className="hm-pj-feat-screen">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={f.image}
                              alt={f.title}
                              draggable={false}
                              loading="lazy"
                              decoding="async"
                            />
                          </span>
                        </div>
                        <div className="hm-pj-feat-body">
                          <h4>{f.title}</h4>
                          <p>{f.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="hm-foot">
        <div className="hm-more-inner hm-ct-foot">
          <span>© 2026 {NAME}</span>
          <span>Designed in Figma. Built with Next.js.</span>
        </div>
      </footer>
    </>
  );
}