"use client";

import { useState } from "react";

const TABS = ["Following", "For You"] as const;

export default function TopBar() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("For You");

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-center gap-6 pt-4 text-white">
      {TABS.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`pointer-events-auto text-[15px] font-semibold transition-opacity ${
            tab === t ? "opacity-100" : "opacity-60"
          }`}
        >
          {t}
          {tab === t && (
            <div className="mx-auto mt-1 h-0.5 w-6 rounded-full bg-white" />
          )}
        </button>
      ))}
    </div>
  );
}
