"use client";

import { useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/videos";

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export default function VideoCard({
  video,
  active,
}: {
  video: Video;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [paused, setPaused] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (active) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active]);

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setPaused(false);
    } else {
      el.pause();
      setPaused(true);
    }
  }

  function toggleLike() {
    setLiked((prev) => {
      const next = !prev;
      setLikes((l) => (next ? l + 1 : l - 1));
      return next;
    });
  }

  return (
    <div
      className="relative h-full w-full snap-start snap-always flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(160deg, ${video.avatarColor}55, #000 70%)`,
      }}
    >
      {!errored && (
        <video
          ref={videoRef}
          src={video.src}
          loop
          muted
          playsInline
          preload="metadata"
          onClick={togglePlay}
          onError={() => setErrored(true)}
          className="h-full w-full object-cover cursor-pointer"
        />
      )}

      {errored && (
        <div
          onClick={togglePlay}
          className="flex h-full w-full cursor-pointer items-center justify-center px-10 text-center text-white/70"
        >
          <p className="text-sm">Video unavailable — check your connection</p>
        </div>
      )}

      {paused && !errored && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div className="rounded-full bg-black/40 p-5">
            <svg viewBox="0 0 24 24" className="h-10 w-10 fill-white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 pb-20 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
        <div className="min-w-0 flex-1 text-white">
          <p className="font-semibold text-[15px]">@{video.username}</p>
          <p className="mt-1 text-[14px] leading-snug line-clamp-2">
            {video.caption}
          </p>
          <div className="mt-2 flex items-center gap-2 text-[13px] text-white/90">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white/90">
              <path d="M9 18V5l12-2v13" strokeWidth="0" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <span className="truncate">{video.song}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pb-1">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-sm font-bold text-white"
            style={{ backgroundColor: video.avatarColor }}
          >
            {video.username.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={toggleLike}
            className="flex flex-col items-center gap-1 text-white active:scale-90 transition-transform"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-8 w-8 ${liked ? "fill-red-500" : "fill-white"}`}
            >
              <path d="M12 21s-7.5-4.6-10-9.3C.5 8.1 2.4 5 6 5c2 0 3.5 1.1 4.5 2.4C11.5 6.1 13 5 15 5c3.6 0 5.5 3.1 4 6.7C19.5 16.4 12 21 12 21z" />
            </svg>
            <span className="text-xs font-medium">{formatCount(likes)}</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white active:scale-90 transition-transform">
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white">
              <path d="M4 4h16v12H7l-3 3V4z" />
            </svg>
            <span className="text-xs font-medium">
              {formatCount(video.comments)}
            </span>
          </button>

          <button className="flex flex-col items-center gap-1 text-white active:scale-90 transition-transform">
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white">
              <path d="M14 9V5l8 7-8 7v-4c-6 0-9 2-11 6 0-8 4-12 11-12z" />
            </svg>
            <span className="text-xs font-medium">
              {formatCount(video.shares)}
            </span>
          </button>

          <div
            className="h-9 w-9 rounded-full flex items-center justify-center overflow-hidden animate-spin-slow text-xs font-bold text-white"
            style={{ backgroundColor: video.avatarColor }}
          >
            {video.username.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
