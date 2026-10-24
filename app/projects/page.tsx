"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { sectionStyle } from "../../components/pageStyles";
import "../../components/Button/Glassbutton.css";
import "./projects.css";

/* ------------------------------------------------------------------ */
/*  DATA (taken from the CV)                                           */
/*  - Put images in the  public/projects/  folder, then fill `images`. */
/*    Paths in `src` start with "/projects/..." (without "public").    */
/*  - Web projects: one large laptop, other images become clickable    */
/*    thumbnails to switch screens.                                    */
/*  - UI/UX projects: the main screens are shown side by side in an    */
/*    iPhone frame; export Figma frames at 2x/3x (e.g. 720x1600,       */
/*    9:20 ratio) so they stay sharp.                                  */
/*  - `showcase` = feature slider cards (screen on the left, text on   */
/*    the right). The slider screens are shown in an iPhone frame.     */
/*  - `design` = color palette (named) + typography (font name).       */
/*  - Fill `links` if there is a demo / repo / Figma link.             */
/*  - Order in the array = order on the page (UI/UX first, then web).  */
/* ------------------------------------------------------------------ */

type Category = "web" | "uiux";

type ProjectImage = { src: string; alt: string; label?: string };

type ShowcaseItem = {
  id: string;
  title: string;
  description: string;
  image: string; // screen image (9:20 ratio, export at 2x/3x)
  alt: string;
};

type DesignColor = { name: string; hex: string };

type DesignSpec = {
  font: string; // typography family name
  colors: DesignColor[]; // shown left to right (dark to light)
};

type Project = {
  id: string;
  category: Category;
  categoryLabel: string;
  name: string;
  fullName?: string;
  role: string;
  accent: string;
  summary: string;
  about?: string[];
  points: string[];
  featuresTitle: string;
  features: string[];
  stack: string[];
  images: ProjectImage[];
  showcase?: { title: string; items: ShowcaseItem[] };
  design?: DesignSpec;
  links?: { label: string; href: string }[];
};

const projects: Project[] = [
  /* ---------------------------- UI/UX ---------------------------- */
  {
    id: "satera",
    category: "uiux",
    categoryLabel: "UI/UX Design",
    name: "SATERA",
    fullName: "Satu Transportasi Rakyat",
    role: "UI/UX Designer",
    accent: "#113FBC",
    summary:
      "A mobile app concept for planning multimodal trips, focusing on route integration, accessibility, and environmental awareness.",
    about: [
      "SATERA is a multimodal transportation app that tackles the tangled mobility situation across Greater Jakarta (Jabodetabek), where one journey often means juggling several modes and routes.",
      "Beyond guiding people from point A to point B, it aims to nurture a more orderly, inclusive, and eco-conscious commuting culture.",
    ],
    points: [
      "Applied Design Thinking to identify users' main problems and design solutions.",
      "Designed the user flow and information architecture for all app features.",
      "Created an interactive prototype that considers accessibility for users with special needs.",
    ],
    featuresTitle: "Design scope",
    features: [
      "Trip planning",
      "Traffic etiquette education",
      "Carbon emission calculator",
    ],
    stack: ["Figma", "Design Thinking", "Prototyping"],
    images: [
      { src: "/projects/SATERA/SATERA.png", alt: "SATERA app main screen" },
      { src: "/projects/SATERA/HOME.png", alt: "SATERA app home screen" },
      // add more if needed
    ],
    showcase: {
      title: "About the project.",
      items: [
        {
          id: "rute",
          title: "Trip planning feature",
          description:
            "Builds cross-modal routes in a single flow, from origin to destination, including options that are friendly to users with special needs.",
          image: "/projects/SATERA/Disabilitas.png",
          alt: "SATERA trip planning screen",
        },
        {
          id: "edukasi",
          title: "Education feature",
          description:
            "Helps users understand everyday transportation etiquette through practical and relevant learning materials. Users can choose topics, track their progress, and test their understanding through interactive mini quizzes.",
          image: "/projects/SATERA/Edukasi.png",
          alt: "SATERA traffic etiquette education screen",
        },
        {
          id: "emisi",
          title: "Emission calculator feature",
          description:
            "Compares the carbon emissions of various vehicles based on trip distance, from private cars and motorcycles to electric vehicles, so users can choose a more eco-friendly option.",
          image: "/projects/SATERA/Emisi.png",
          alt: "SATERA carbon emission calculator screen",
        },
      ],
    },
    design: {
      font: "Montserrat",
      colors: [
        { name: "Midnight", hex: "#081D56" },
        { name: "Royal", hex: "#113FBC" },
        { name: "Ocean", hex: "#2B70B3" },
        { name: "Sky", hex: "#ACD5F1" },
        { name: "White", hex: "#FFFFFF" },
      ],
    },
    // This button appears automatically below the slider.
    links: [
      {
        label: "View Prototype",
        href: "https://www.figma.com/proto/1P287fB9gSah2hDzheUNBY/SATERA?node-id=97-651&t=8EAKiRNxw43MPKzv-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&fuid=1353914041698166546",
      },
    ],
  },
  {
    id: "jasakti",
    category: "uiux",
    categoryLabel: "UI/UX Design",
    name: "JASAKTI",
    role: "UI/UX Designer",
    accent: "#0139EF",
    summary:
      "A super-app concept that gathers scattered public services and information in West Java into one easy entry point for residents.",
    about: [
      "JASAKTI is a super-app concept that brings public services in West Java together in one place, so residents no longer have to hop between separate apps and channels to get things done.",
      "From emergency contacts to local information, every essential feature lives inside one friendly interface, supporting the vision of a smart province.",
    ],
    points: [
      "Designed the user flow and information architecture so many services stay easy to find from a single home screen.",
      "Created the homepage service grid, with recognizable icons and short labels for quick access.",
      "Built an interactive prototype in Figma covering both the user side and the admin side.",
    ],
    featuresTitle: "Design scope",
    features: [
      "Service homepage",
      "Citizen reports",
      "Emergency help",
      "Food price information",
      "Public transportation",
    ],
    stack: ["Figma", "Prototyping", "User flows"],
    images: [
      { src: "/projects/JASAKTI/JASAKTI.png", alt: "JASAKTI app main screen" },
      { src: "/projects/JASAKTI/HOMEPAGE.png", alt: "JASAKTI app home screen" },
      // add more if needed
    ],
    showcase: {
      title: "About the project.",
      items: [
        {
          id: "laporan",
          title: "Citizen reports feature",
          description:
            "Lets residents report local problems straight from their phone, with a simple flow for sending a photo or a video as evidence.",
          image: "/projects/JASAKTI/LAPORAN.png",
          alt: "JASAKTI citizen reports screen",
        },
        {
          id: "darurat",
          title: "Emergency help feature",
          description:
            "Keeps emergency contacts and ambulance requests within quick reach. A press-and-hold emergency button helps prevent accidental requests while staying fast to use.",
          image: "/projects/JASAKTI/URGENT.png",
          alt: "JASAKTI emergency help screen",
        },
        {
          id: "pangan",
          title: "Food price feature",
          description:
            "Shows current staple food prices by commodity, with search, so residents can compare prices and plan their spending with better information.",
          image: "/projects/JASAKTI/KOMODITAS.png",
          alt: "JASAKTI food price screen",
        },
        {
          id: "transportasi",
          title: "Public transportation feature",
          description:
            "Brings public transportation information into the same app, so residents can check available modes, routes, and schedules around West Java without opening another app.",
          image: "/projects/JASAKTI/Transportasi.png",
          alt: "JASAKTI public transportation screen",
        },
      ],
    },
    design: {
      font: "Montserrat",
      colors: [
        { name: "Deep", hex: "#004AAD" },
        { name: "Electric", hex: "#0139EF" },
        { name: "Azure", hex: "#85C4EC" },
        { name: "Mist", hex: "#CEE7F7" },
        { name: "Silver", hex: "#D9D9D9" },
        { name: "White", hex: "#FFFFFF" },
      ],
    },
    // This button appears automatically below the slider.
    // NOTE: this is the JASAKTI prototype link. Replace it with the
    // JASAKTI Figma prototype link if it has its own file.
    links: [
      {
        label: "View Prototype",
        href: "https://www.figma.com/proto/UnIMOUVi2s1NyQALkpm6QR/JASAKTI?node-id=226-335&t=XGtte2eQP8ILqxQn-0&scaling=scale-down&content-scaling=fixed&page-id=56%3A207&starting-point-node-id=417%3A922&fuid=1353914041698166546",
      },
    ],
  },

  /* ------------------------ Web Development ------------------------ */
  {
    id: "gunz-gaming",
    category: "web",
    categoryLabel: "Web Development",
    name: "GUNZ Gaming",
    role: "Web Developer / Programmer",
    accent: "#2747E0",
    summary:
      "A web-based gaming studio reservation management system covering booking, verification, scheduling, and reporting.",
    about: [
      "GUNZ Gaming is a web-based reservation management system for a PlayStation rental studio. It is designed so customers can book play sessions online without having to queue, while the studio manager gets tools to manage schedules and monitor daily operations.",
      "Customers can choose a bundle package, make a reservation, and leave a review after playing. On the manager's side, every reservation goes through a verification process, is added to the schedule, and is recorded in reports.",
    ],
    points: [
      "Developed the gaming studio reservation system using Laravel, PHP, and MySQL.",
      "Built a responsive interface using Blade and Tailwind CSS.",
      "Applied the MVC architecture and relational database concepts to structure the application.",
    ],
    featuresTitle: "Features built",
    features: [
      "Reservation management",
      "Verification",
      "Scheduling",
      "Bundle packages",
      "Visitor reviews",
      "Reporting",
    ],
    stack: ["Laravel", "PHP", "Blade", "MySQL", "Tailwind CSS", "JavaScript"],
    images: [
      { src: "/projects/gunz/Gunz.png", alt: "GUNZ Gaming reservation schedule page", label: "Customer page" },
      { src: "/projects/gunz/Admin.png", alt: "GUNZ Gaming reservation verification page", label: "Manager dashboard" },
      // add more if needed
    ],
    links: [],
  },
];

const filters: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "uiux", label: "UI/UX Design" },
  { key: "web", label: "Web Development" },
];

/* picks black or white text for a given background hex */
function inkFor(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.62 ? "#0F1B33" : "#FFFFFF";
}

/* ------------------------------------------------------------------ */
/*  Home-style BACKGROUND: canvas grid, filled cells, glow, Figma      */
/*  cursors. Styles are in projects.css (.pj-bg, .pj-cell, .pj-glow,   */
/*  .pj-cursor)                                                        */
/* ------------------------------------------------------------------ */

function Backdrop() {
  return (
    <div className="pj-bg" aria-hidden="true">
      {/* 6 filled grid cells (positions set via nth-child in CSS) */}
      <i className="pj-cell" />
      <i className="pj-cell" />
      <i className="pj-cell" />
      <i className="pj-cell" />
      <i className="pj-cell" />
      <i className="pj-cell" />

      {/* soft glow */}
      <span className="pj-glow pj-glow--1" />
      <span className="pj-glow pj-glow--2" />
      <span className="pj-glow pj-glow--3" />

      {/* Figma-style cursors */}
      <div className="pj-cursor pj-cursor--a">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2l16 9-7 2-3 7z" />
        </svg>
        <b>Designer</b>
      </div>
      <div className="pj-cursor pj-cursor--b">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2l16 9-7 2-3 7z" />
        </svg>
        <b>Developer</b>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PHONE                                                              */
/*  - framed (default): full iPhone titanium frame (bezel, Dynamic     */
/*    Island, side buttons). Used for the 2 main phones AND for the    */
/*    "About the project" slider.                                      */
/*  - framed={false}: plain screen image, no frame (not used now,      */
/*    kept in case you need it again).                                 */
/* ------------------------------------------------------------------ */

function Phone({
  src,
  alt,
  framed = true,
}: {
  src: string;
  alt: string;
  framed?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  const screen = failed ? (
    <div className="pj-phone-missing">
      Add an image at
      <br />
      {src}
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      width={360}
      height={800}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );

  // Plain version: no frame at all
  if (!framed) {
    return <div className="pj-shot">{screen}</div>;
  }

  return (
    <div className="pj-phone">
      {/* side buttons: left = action + volume up/down, right = power */}
      <span className="pj-btn pj-btn--action" aria-hidden="true" />
      <span className="pj-btn pj-btn--volup" aria-hidden="true" />
      <span className="pj-btn pj-btn--voldown" aria-hidden="true" />
      <span className="pj-btn pj-btn--power" aria-hidden="true" />
      {screen}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LAPTOP FRAME (screen + hinge/base) for web projects                */
/* ------------------------------------------------------------------ */

function Laptop({
  src,
  alt,
  label,
  onError,
}: {
  src: string;
  alt: string;
  label?: string;
  onError: () => void;
}) {
  return (
    <div className="pj-laptop">
      <div className="pj-laptop-lid">
        <div className="pj-laptop-screen">
          <img src={src} alt={alt} onError={onError} />
        </div>
      </div>
      <div className="pj-laptop-base" />
      {label && <p className="pj-laptop-cap">{label}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  IMAGE GALLERY                                                      */
/*  - Mobile: all screens side by side in iPhone frames.               */
/*  - Web: laptops side by side.                                       */
/*  Images that fail to load are hidden automatically (no broken       */
/*  icons), so it is safe to list image paths that don't exist yet.    */
/* ------------------------------------------------------------------ */

function Gallery({
  images,
  name,
  phone = false,
}: {
  images: ProjectImage[];
  name: string;
  phone?: boolean;
}) {
  const [bad, setBad] = useState<string[]>([]);
  const fail = (src: string) => setBad((b) => (b.includes(src) ? b : [...b, src]));

  // Mobile project: all screens shown side by side in iPhone frames
  if (phone) {
    if (images.length === 0) {
      return <div className="pj-empty">Add project images in the `images` data.</div>;
    }
    return (
      <div className="pj-phones" role="group" aria-label={`${name} app screens`}>
        {images.map((img) => (
          <Phone key={img.src} src={img.src} alt={img.alt} />
        ))}
      </div>
    );
  }

  // Web project
  const ok = images.filter((i) => !bad.includes(i.src));
  if (ok.length === 0) {
    return <div className="pj-empty">Add project images in the public/projects folder.</div>;
  }

  return (
    <div
      className={`pj-laptops ${ok.length > 1 ? "multi" : ""}`}
      role="group"
      aria-label={`${name} app screens`}
    >
      {ok.map((img) => (
        <Laptop key={img.src} src={img.src} alt={img.alt} label={img.label} onError={() => fail(img.src)} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DESIGN SYSTEM                                                      */
/*  - Palette: one joined strip of color panels. The hovered/focused   */
/*    panel widens and reveals its name + hex. Click to copy the hex.  */
/*  - Typography: only the font name, bold | light (e.g.              */
/*    "Montserrat | montserrat"), under a small "typography" caption.  */
/* ------------------------------------------------------------------ */

function DesignSystem({ name, design }: { name: string; design: DesignSpec }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      window.setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1400);
    } catch {
      /* clipboard not available: ignore */
    }
  };

  return (
    <section className="pj-design" aria-label={`${name} design system`}>
      <h3 className="pj-group">Design system</h3>

      {/* ---- Palette strip ---- */}
      <div className="pj-ds-block">
        <p className="pj-ds-label">
          Color palette <span>{design.colors.length} colors · click to copy</span>
        </p>
        <ul className="pj-palette">
          {design.colors.map((c) => (
            <li
              key={c.hex}
              className="pj-chip"
              style={{ background: c.hex, color: inkFor(c.hex) } as CSSProperties}
            >
              <button
                type="button"
                onClick={() => copy(c.hex)}
                aria-label={`Copy ${c.name} ${c.hex}`}
              >
                <span className="pj-chip-name">{c.name}</span>
                <span className="pj-chip-hex">{copied === c.hex ? "Copied!" : c.hex}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ---- Typography: font name only ---- */}
      <div className="pj-ds-block">
        <div className="pj-type" style={{ fontFamily: `"${design.font}", var(--font)` }}>
          <p className="pj-type-cap">typography</p>
          <p className="pj-type-name">
            <b>{design.font}</b>
            <i aria-hidden="true" />
            <span>{design.font.toLowerCase()}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURE CARD SLIDER (screen on the left, description on the right) */
/*  Shows 2 cards per page (1 card on small screens).                  */
/*  The screens here use the iPhone frame.                             */
/* ------------------------------------------------------------------ */

function Showcase({
  title,
  items,
  links,
}: {
  title: string;
  items: ShowcaseItem[];
  links?: { label: string; href: string }[];
}) {
  const rail = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(items.length > 1);

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  // scroll by "page" (2 cards on desktop, 1 card on small screens)
  const slide = (dir: 1 | -1) => {
    const el = rail.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const gap = 16; // must match the gap in .sc-rail
    const cardW = first.offsetWidth + gap;
    const perView = Math.max(1, Math.round((el.clientWidth + gap) / cardW));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * cardW * perView, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="sc" aria-label={title}>
      <div className="sc-head">
        <h3>{title}</h3>
        <div className="sc-ctrl">
          <button type="button" className="gbtn gbtn--icon" aria-label="Previous feature" disabled={!canPrev} onClick={() => slide(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className="gbtn gbtn--icon" aria-label="Next feature" disabled={!canNext} onClick={() => slide(1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <ul
        className="sc-rail"
        ref={rail}
        onScroll={update}
        tabIndex={0}
        aria-label={`${title} Scroll to see other features`}
      >
        {items.map((it) => (
          <li key={it.id} className="sc-card">
            <div className="sc-shot">
              {/* framed iPhone (default) */}
              <Phone src={it.image} alt={it.alt} />
            </div>
            <div className="sc-text">
              <h4>{it.title}</h4>
              <p>{it.description}</p>
            </div>
          </li>
        ))}
      </ul>

      {links && links.length > 0 && (
        <div className="sc-cta">
          {links.map((l) => (
            <a key={l.href} className="gbtn gbtn--accent" href={l.href} target="_blank" rel="noreferrer">
              {l.label}
              <span aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | Category>("all");

  const visible = projects.filter((p) => filter === "all" || p.category === filter);
  const count = (key: "all" | Category) =>
    key === "all" ? projects.length : projects.filter((p) => p.category === key).length;

  return (
    <main className="pj">
      {/* ===== Home-style background ===== */}
      <Backdrop />

      {/* transparent background so the .pj-bg backdrop isn't covered by sectionStyle */}
      <section style={{ ...sectionStyle, background: "transparent" }}>
        <div className="pj-wrap">
          {/* ===== Filter ===== */}
          <div className="pj-bar">
            <div className="pj-filters" role="group" aria-label="Project filter">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className="gbtn gbtn--sm"
                  aria-pressed={filter === f.key}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                  <span>{count(f.key)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pj-list" key={filter}>
            {visible.map((p, i) => (
              <Fragment key={p.id}>
                <article
                  className={`pj-case ${i % 2 === 1 ? "rev" : ""} ${p.showcase ? "has-showcase" : ""} ${p.category === "web" ? "wide" : ""}`}
                  style={{ ["--accent" as string]: p.accent }}
                >
                  <div className={`pj-visual ${p.category}`}>
                    <Gallery images={p.images} name={p.name} phone={p.category === "uiux"} />
                  </div>

                  <div className="pj-info">
                    <div className="pj-main">
                      <span className="pj-tag">
                        <i />
                        {p.categoryLabel}
                      </span>

                      <h2>{p.name}</h2>
                      {p.fullName && <p className="pj-full">{p.fullName}</p>}
                      <p className="pj-role">{p.role}</p>

                      {p.about ? (
                        <div className="pj-about">
                          {p.about.map((para) => (
                            <p key={para} className="pj-sum">{para}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="pj-sum">{p.summary}</p>
                      )}
                    </div>

                    <div className="pj-side">
                      <ul className="pj-points">
                        {p.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>

                      <div className="pj-block">
                        <h3 className="pj-group">{p.featuresTitle}</h3>
                        <ul className="pj-feats">
                          {p.features.map((f, idx) => (
                            <li key={f}>
                              <b aria-hidden="true">{String(idx + 1).padStart(2, "0")}</b>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pj-block">
                        <h3 className="pj-group">Technologies and methods</h3>
                        <ul className="pj-tech">
                          {p.stack.map((s) => (
                            <li key={s}>
                              <i aria-hidden="true" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {!p.showcase && p.links && p.links.length > 0 && (
                        <div className="pj-links">
                          {p.links.map((l) => (
                            <a key={l.href} className="gbtn gbtn--accent" href={l.href} target="_blank" rel="noreferrer">
                              {l.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>

                {p.design && (
                  <div style={{ ["--accent" as string]: p.accent } as CSSProperties}>
                    <DesignSystem name={p.name} design={p.design} />
                  </div>
                )}

                {p.showcase && (
                  <Showcase title={p.showcase.title} items={p.showcase.items} links={p.links} />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}