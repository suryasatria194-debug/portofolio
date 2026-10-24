import type { ReactNode } from "react";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import "./globals.css"; // sesuaikan nama/path file CSS global kamu

export const metadata: Metadata = {
  title: "Surya Satria | UI/UX Designer & Web Developer",
  // Favicon diambil otomatis dari app/icon.png (atau icon.svg).
  // Jangan tambahkan `icons` di sini supaya tidak bentrok.
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0 }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}