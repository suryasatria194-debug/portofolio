import "./GlassButton.css";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Common = {
  variant?: "light" | "accent" | "dark";
  size?: "md" | "sm" | "icon";
  className?: string;
  children: ReactNode;
};

type AsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export default function GlassButton(props: AsButton | AsLink) {
  const { variant = "light", size = "md", className = "", children, ...rest } = props;

  const cls = [
    "gbtn",
    variant !== "light" && `gbtn--${variant}`,
    size !== "md" && `gbtn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Link (internal pakai next/link, external buka tab baru)
  if ("href" in rest && rest.href) {
    const { href, ...anchor } = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
      href: string;
    };
    if (/^https?:\/\//.test(href)) {
      return (
        <a className={cls} href={href} target="_blank" rel="noreferrer" {...anchor}>
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href} {...anchor}>
        {children}
      </Link>
    );
  }

  // Button biasa
  const button = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={cls} {...button}>
      {children}
    </button>
  );
}