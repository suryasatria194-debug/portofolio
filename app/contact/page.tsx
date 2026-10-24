"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { sectionStyle } from "../../components/pageStyles";
import "../../components/Button/Glassbutton.css";
import "./contact.css";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const EMAIL = "suryasatria194@gmail.com";

/* Taruh file CV di folder `public/`, lalu samakan nama filenya di sini.
   Contoh: public/CV-Surya-Satria-Pratama.pdf  ->  "/CV-Surya-Satria-Pratama.pdf" */
const CV_URL = "/CV_Surya_Satria_Pratama.pdf";
const CV_FILENAME = "CV_Surya_Satria_Pratama.pdf";

/* Gambar cover CV (halaman 1 dari PDF). Taruh di folder `public/`.
   Kalau CV diperbarui, render ulang halaman 1 dan timpa file ini. */
const CV_COVER = "/cv-cover.png";

/* ------------------------------------------------------------------ */
/*  LATAR ala Home / Projects                                          */
/* ------------------------------------------------------------------ */

function Backdrop() {
  return (
    <div className="ct-bg" aria-hidden="true">
      <i className="ct-cell" />
      <i className="ct-cell" />
      <i className="ct-cell" />
      <i className="ct-cell" />

      <span className="ct-glow ct-glow--1" />
      <span className="ct-glow ct-glow--2" />

      <div className="ct-cursor ct-cursor--a">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2l16 9-7 2-3 7z" />
        </svg>
        <b>Designer</b>
      </div>
      <div className="ct-cursor ct-cursor--b">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2l16 9-7 2-3 7z" />
        </svg>
        <b>Developer</b>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  KARTU CV                                                           */
/*  Halaman depan memakai cover CV asli (gambar di public/).           */
/* ------------------------------------------------------------------ */

function CvCard() {
  return (
    <div className="ct-cvc">
      {/* Tumpukan kertas: dua lembar di belakang + halaman depan (cover CV) */}
      <div className="ct-cvc-stack">
        <span className="ct-cvc-sheet ct-cvc-sheet--3" aria-hidden="true" />
        <span className="ct-cvc-sheet ct-cvc-sheet--2" aria-hidden="true" />

        <div className="ct-cvc-page">
          <Image
            src={CV_COVER}
            alt="Preview of Surya Satria Pratama's CV"
            width={720}
            height={1018}
            sizes="148px"
            priority
            draggable={false}
          />
        </div>
      </div>

      <div className="ct-cvc-info">
        <b className="ct-cvc-title">Curriculum Vitae</b>
        <p className="ct-cvc-meta">
          Education, skills, and course projects in one place.
        </p>

        <ul className="ct-cvc-tags">
          <li>PDF</li>
          <li>Updated 2026</li>
        </ul>

        <div className="ct-cvc-actions">
          <a className="gbtn gbtn--accent" href={CV_URL} download={CV_FILENAME}>
            Download CV
            <span aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v11m0 0l-5-5m5 5l5-5M5 20h14" />
              </svg>
            </span>
          </a>

          <a className="ct-cvc-view" href={CV_URL} target="_blank" rel="noreferrer">
            Preview
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FORM                                                               */
/* ------------------------------------------------------------------ */

type Status = "idle" | "sending" | "sent" | "error";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(0);

  // Catat kapan form tampil; server menolak kiriman yang terlalu cepat (bot)
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"), // honeypot
          startedAt: startedAt.current,
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setError("Network error. Check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="ct-sent" role="status">
        <b>Message sent.</b>
        <p>Thanks for reaching out. I&apos;ll reply to your email soon.</p>
        <button type="button" className="ct-linkbtn" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="ct-form" onSubmit={onSubmit} noValidate={false}>
      <label className="ct-field">
        <span>Name</span>
        <input name="name" type="text" required minLength={2} maxLength={80} autoComplete="name" />
      </label>

      <label className="ct-field">
        <span>Email</span>
        <input name="email" type="email" required maxLength={120} autoComplete="email" />
      </label>

      <label className="ct-field">
        <span>Message</span>
        <textarea name="message" rows={4} required minLength={10} maxLength={2000} />
      </label>

      {/* Honeypot: tersembunyi untuk manusia, bot biasanya mengisinya */}
      <div className="ct-hp" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="ct-form-foot">
        <button type="submit" className="gbtn gbtn--accent" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p className="ct-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  HALAMAN                                                            */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  return (
    <main className="ct">
      <Backdrop />

      <section
        style={{
          ...sectionStyle,
          background: "transparent",
          padding: 0,
          minHeight: 0,
          alignItems: "flex-start",
        }}
      >
        <div className="ct-wrap">
          <div className="ct-grid">
            {/* ===== Kiri: pesan utama ===== */}
            <div className="ct-main">
              <span className="ct-tag">
                <i />
                Get in Touch
              </span>

              <h1 className="ct-title">
                Contact <em>me.</em>
              </h1>

              <p className="ct-lead">
                Have a question, a project idea, or an opportunity to discuss?
                Send me a message through the form or reach me by email, and
                I&apos;ll get back to you as soon as I can.
              </p>

              <CvCard />
            </div>

            {/* ===== Kanan: panel info ===== */}
            <aside className="ct-panel" aria-label="Contact details">
              {/* Email hanya ditampilkan sebagai teks (tidak mengarah ke Gmail) */}
              <div className="ct-block">
                <h2 className="ct-group">Email</h2>
                <div className="ct-mail">
                  <span className="ct-ico" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="3" />
                      <path d="M3.5 7.5l8.5 6 8.5-6" />
                    </svg>
                  </span>
                  <span className="ct-mail-addr">{EMAIL}</span>
                </div>
              </div>

              <div className="ct-block">
                <h2 className="ct-group">Send a message</h2>
                <ContactForm />
              </div>
            </aside>
          </div>

          <p className="ct-foot">Surya Satria Pratama · Information Systems · 2026</p>
        </div>
      </section>
    </main>
  );
}