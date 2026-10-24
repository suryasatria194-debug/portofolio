import type React from "react";

// Palet biru Persib
export const colors = {
  bg: "#F1F5FD",
  soft: "#B9D0F8",
  mid: "#6A9BF4",
  accent: "#0B49B8",
  navy: "#0B2A66",
  ink: "#14213D",
  muted: "#4A5772",
  chipBg: "#DCE8FB",
  chipText: "#0B2A66",
};

export const sectionStyle: React.CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  minHeight: "100svh",
  padding:
    "clamp(110px, 16svh, 150px) clamp(20px, 5vw, 64px) clamp(48px, 8svh, 96px)",
  fontFamily: "'Montserrat', sans-serif",
  color: colors.ink,
  background: `
    radial-gradient(
      40% 50% at 80% 70%,
      rgba(106,155,244,.45),
      rgba(106,155,244,0) 100%
    ),
    radial-gradient(
      32% 40% at 20% 20%,
      rgba(185,208,248,.7),
      rgba(185,208,248,0) 100%
    ),
    ${colors.bg}
  `,
};

export const eyebrowStyle: React.CSSProperties = {
  margin: "0 0 14px",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "13px",
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: colors.accent,
};

export const headingStyle: React.CSSProperties = {
  margin: "0 0 20px",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "clamp(30px, 4.4vw, 56px)",
  fontWeight: 500,
  lineHeight: 1.08,
  letterSpacing: "-.03em",
  color: colors.ink,
};

export const mutedStyle: React.CSSProperties = {
  margin: "0 0 14px",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "15px",
  lineHeight: 1.65,
  color: colors.muted,
};

export const cardStyle: React.CSSProperties = {
  boxSizing: "border-box",
  padding: "26px",
  borderRadius: "22px",
  border: "1px solid rgba(255,255,255,.9)",
  background:
    "linear-gradient(145deg, #FFFFFF 0%, #F3F7FE 70%, #DCE8FB 100%)",
  boxShadow:
    "0 20px 44px rgba(20,60,140,.14), 0 4px 10px rgba(11,42,102,.06), inset 0 1px 0 #FFFFFF",
};
