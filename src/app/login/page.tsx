import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

const ERRORS: Record<string, string> = {
  access_denied: "Login was cancelled.",
  expired: "Login session expired. Please try again.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  if (await getSession()) redirect("/");
  const { error } = await searchParams;
  const message =
    typeof error === "string"
      ? (ERRORS[error] ?? "Could not log in with LINE. Please try again.")
      : null;

  return (
    <main className="mx-auto flex h-dvh w-full max-w-md flex-col items-center justify-center gap-6 bg-black px-6 text-center">
      <h1 className="text-3xl font-bold">Log in to Ebisu</h1>
      <p className="text-sm text-white/60">
        Follow creators, like videos and comment.
      </p>
      {message && (
        <p className="w-full rounded-md bg-red-500/15 px-4 py-2 text-sm text-red-300">
          {message}
        </p>
      )}
      <a
        href="/api/auth/line"
        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#06C755] px-4 py-3 font-semibold text-white hover:bg-[#05b34c] active:bg-[#049a41]"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden>
          <path d="M12 3C6.5 3 2 6.6 2 11c0 4 3.6 7.3 8.4 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5s5.9-3.5 8.1-6C21.4 14.2 22 12.7 22 11c0-4.4-4.5-8-10-8z" />
        </svg>
        Log in with LINE
      </a>
      <Link href="/" className="text-sm text-white/60 underline">
        Back to feed
      </Link>
    </main>
  );
}
