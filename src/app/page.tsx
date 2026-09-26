import VideoFeed from "@/components/VideoFeed";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { getVideos } from "@/lib/videos";
import { getSession } from "@/lib/session";

export default async function Home() {
  const videos = getVideos();
  const user = await getSession();

  return (
    <main className="relative mx-auto h-dvh w-full max-w-md bg-black">
      <TopBar />
      <VideoFeed videos={videos} />
      <BottomNav user={user} />
    </main>
  );
}
