"use client";

import { useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/videos";
import VideoCard from "@/components/VideoCard";

export default function VideoFeed({ videos }: { videos: Video[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index,
            );
            setActiveIndex(index);
          }
        }
      },
      { root: container, threshold: [0.6] },
    );

    const children = container.querySelectorAll("[data-index]");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [videos.length]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full snap-y snap-mandatory overflow-y-scroll no-scrollbar"
    >
      {videos.map((video, index) => (
        <div key={video.id} data-index={index} className="h-full w-full">
          <VideoCard video={video} active={index === activeIndex} />
        </div>
      ))}
    </div>
  );
}
