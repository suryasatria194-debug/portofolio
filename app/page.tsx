"use client";

import React from "react";
import { useRouter } from "next/navigation";
import OpeningGreeting, {
  hasOpeningPlayed,
} from "../components/OpeningGreeting";
import Home from "./home/page"; // [UBAH] Home ada di app/home/page.tsx

export default function Page() {
  const router = useRouter();

  // Opening sudah pernah diputar (mis. klik logo atau Back ke "/"): langsung ke /home
  React.useEffect(() => {
    if (hasOpeningPlayed()) router.replace("/home");
  }, [router]);

  return (
    <OpeningGreeting onFinish={() => router.replace("/home")}>
      <Home />
    </OpeningGreeting>
  );
}