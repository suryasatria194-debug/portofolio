import "../../components/Button/Glassbutton.css";
import "./experience.css";

/* ------------------------------------------------------------------ */
/*  Halaman Experience: sementara dalam perawatan.                     */
/*  Semua gaya ada di ./experience.css (class .ex-*).                  */
/*  Kalau isi Experience sudah siap, ganti bagian <div className=      */
/*  "ex-card"> dengan konten aslinya.                                  */
/* ------------------------------------------------------------------ */

function Backdrop() {
  return (
    <div className="ex-bg" aria-hidden="true">
      <i className="ex-cell" />
      <i className="ex-cell" />
      <i className="ex-cell" />
      <i className="ex-cell" />

      <span className="ex-glow ex-glow--1" />
      <span className="ex-glow ex-glow--2" />

      <div className="ex-cursor ex-cursor--a">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2l16 9-7 2-3 7z" />
        </svg>
        <b>Designer</b>
      </div>
      <div className="ex-cursor ex-cursor--b">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 2l16 9-7 2-3 7z" />
        </svg>
        <b>Developer</b>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <main className="ex">
      <Backdrop />

      <section className="ex-wrap" aria-labelledby="ex-title">
        <div className="ex-card">
          <span className="ex-ico" aria-hidden="true">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </span>

          <h1 id="ex-title" className="ex-title">
            Experience
          </h1>

          <p className="ex-text" role="status">
            This section is currently under maintenance.
          </p>

          <p className="ex-badge">
            <span aria-hidden="true" />
            Under maintenance
          </p>

          <div className="ex-actions">
            <a className="gbtn gbtn--accent" href="/home">
              Back to home
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}