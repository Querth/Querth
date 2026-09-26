"use client";

import { useState } from "react";
import type { SessionUser } from "@/lib/session";

const ICONS: { key: string; label: string; path: string }[] = [
  { key: "home", label: "Home", path: "M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3z" },
  {
    key: "friends",
    label: "Friends",
    path: "M7 10a3 3 0 100-6 3 3 0 000 6zm10 0a3 3 0 100-6 3 3 0 000 6zM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6H2zm11-5.7c2.9.6 5 2.9 5 5.7h4c0-3-2.2-5.4-5-5.9-1.5-.3-3 0-4 .2z",
  },
  { key: "create", label: "", path: "" },
  {
    key: "inbox",
    label: "Inbox",
    path: "M4 4h16v12H8l-4 4V4z",
  },
  {
    key: "profile",
    label: "Profile",
    path: "M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z",
  },
];

export default function BottomNav({ user }: { user: SessionUser | null }) {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-4 pb-3 pt-2 bg-gradient-to-t from-black/60 to-transparent">
      {ICONS.map((icon) =>
        icon.key === "create" ? (
          <button
            key={icon.key}
            className="pointer-events-auto relative h-8 w-11 shrink-0"
          >
            <div className="absolute left-0 h-8 w-8 rounded-md bg-cyan-400" />
            <div className="absolute right-0 h-8 w-8 rounded-md bg-pink-500" />
            <div className="absolute inset-x-0 mx-auto h-8 w-9 rounded-md bg-white" />
          </button>
        ) : icon.key === "profile" ? (
          user ? (
            <div key={icon.key} className="pointer-events-auto relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex flex-col items-center gap-0.5 text-white"
              >
                {user.picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.picture}
                    alt=""
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                    <path d={icon.path} />
                  </svg>
                )}
                <span className="max-w-14 truncate text-[10px] font-medium">
                  {user.name}
                </span>
              </button>
              {menuOpen && (
                <form
                  action="/api/auth/logout"
                  method="post"
                  className="absolute bottom-full right-0 mb-2"
                >
                  <button className="whitespace-nowrap rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow">
                    Log out
                  </button>
                </form>
              )}
            </div>
          ) : (
            <a
              key={icon.key}
              href="/login"
              className="pointer-events-auto flex flex-col items-center gap-0.5 text-white"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white/60">
                <path d={icon.path} />
              </svg>
              <span className="text-[10px] font-medium text-white/60">
                Log in
              </span>
            </a>
          )
        ) : (
          <button
            key={icon.key}
            onClick={() => setActive(icon.key)}
            className="pointer-events-auto flex flex-col items-center gap-0.5 text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-6 w-6 ${
                active === icon.key ? "fill-white" : "fill-white/60"
              }`}
            >
              <path d={icon.path} />
            </svg>
            <span
              className={`text-[10px] font-medium ${
                active === icon.key ? "text-white" : "text-white/60"
              }`}
            >
              {icon.label}
            </span>
          </button>
        ),
      )}
    </div>
  );
}
