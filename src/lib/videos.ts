export type Video = {
  id: string;
  src: string;
  poster?: string;
  username: string;
  avatarColor: string;
  caption: string;
  song: string;
  likes: number;
  comments: number;
  shares: number;
};

const AVATAR_COLORS = [
  "#ff2d55",
  "#5856d6",
  "#007aff",
  "#34c759",
  "#ff9500",
  "#af52de",
  "#ff3b30",
  "#00c7be",
];

const SAMPLE_MP4S = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
];

const USERNAMES = [
  "ebisu.eats",
  "shibuya_skater",
  "tokyo.nights",
  "ramen_diaries",
  "neon_wanderer",
  "yamanote_loop",
  "sakura.season",
  "izakaya_hopper",
];

const CAPTIONS = [
  "late night ramen run near Ebisu station 🍜 #ebisu #tokyo",
  "found the best rooftop view in the city 🌃",
  "this skate spot is unreal, no cap 🛹",
  "3am convenience store snacks hit different 🍙",
  "first time trying this izakaya, 10/10 would return",
  "cherry blossoms are back 🌸 spring in Tokyo",
  "riding the yamanote line at golden hour",
  "hidden alley bar, ask and you shall find 🍶",
];

const SONGS = [
  "original sound - ebisu.eats",
  "lofi tokyo beats - nightwave",
  "citypop revival - midnight drive",
  "original sound - shibuya_skater",
  "trending sound - izakaya vibes",
];

function seededPick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export function getVideos(count = 12): Video[] {
  return Array.from({ length: count }, (_, i) => {
    const src = seededPick(SAMPLE_MP4S, i);
    return {
      id: `v-${i}`,
      src,
      username: seededPick(USERNAMES, i),
      avatarColor: seededPick(AVATAR_COLORS, i),
      caption: seededPick(CAPTIONS, i),
      song: seededPick(SONGS, i),
      likes: 1200 + i * 347,
      comments: 20 + i * 13,
      shares: 5 + i * 4,
    };
  });
}
