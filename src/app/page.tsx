import VideoFeed from "@/components/VideoFeed";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { getVideos } from "@/lib/videos";

export default function Home() {
  const videos = getVideos();

  return (
    <main className="relative mx-auto h-dvh w-full max-w-md bg-black">
      <TopBar />
      <VideoFeed videos={videos} />
      <BottomNav />
    </main>
  );
}
