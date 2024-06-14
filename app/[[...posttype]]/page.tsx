import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User2 } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

const BASE_API_URL = "https://api.hackerwebapp.com";

const HNSectionToURLType = new Map<string, string>([
  ["new", "newest"],
  ["news", "news"],
  ["top", "news"],
  ["ask", "ask"],
  ["jobs", "jobs"],
  ["show", "show"],
]);

// anything else defaults to "news"

interface HomePageProps {
  searchParams: { page: number | undefined };
  params: { posttype?: string[] };
}

interface NewsPost {
  id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain?: string; // domain is ommited if its ask hn and a relative url is provided with the id of the post
}

export default async function Home({ params, searchParams }: HomePageProps) {
  let { posttype } = params;

  if (!posttype) {
    redirect("/top");
  }

  const firstSection = posttype[0]; // take the first thing and disregard the rest of the params

  const hnSectionType = HNSectionToURLType.get(firstSection);

  if (!hnSectionType) {
    redirect("/top");
  }

  let { page } = searchParams;

  if (page == undefined) {
    page = 1;
  }

  const API_URL = `${BASE_API_URL}/${hnSectionType}?page=${page}`;
  console.log(API_URL);
  const response = await fetch(API_URL);
  const newsPosts: NewsPost[] = await response.json();

  return (
    <main className="flex min-h-screen flex-col gap-6 items-center p-8">
      <h2 className="font-bold text-2xl capitalize">{hnSectionType}</h2>
      <div className="flex gap-4">
        {page >= 2 ? (
          <Link
            className="px-2 py-1 rounded bg-slate-500 text-slate-100"
            href={`/${posttype}?page=${Number(page) - 1}`}
          >
            prev
          </Link>
        ) : (
          <p className="px-2 py-1 rounded bg-muted text-slate-100">prev</p>
        )}
        <h3 className="p-1 font-semibold">Page {page}</h3>
        {newsPosts.length !== 0 ? (
          <Link
            className="px-2 py-1 rounded bg-slate-500 text-slate-100"
            href={`/${posttype}?page=${Number(page) + 1}`}
          >
            next
          </Link>
        ) : (
          <p className="px-2 py-1 rounded bg-muted text-slate-100">next</p>
        )}
      </div>
      {newsPosts.map((post) => {
        return (
          <Card className="w-full bg-secondary/50" key={post.id}>
            <CardHeader>
              <CardTitle className="text-lg font-bold">{post.title}</CardTitle>
              <CardDescription className="flex gap-2">
                <div className="grid gap-1">
                  <div className="flex gap-1">
                    <span>{post.points || 0} points</span>
                    <span>posted {post.time_ago}</span>
                  </div>
                  <Link
                    href={`/user/${post.user}`}
                    className="flex gap-2 items-center text-accent-foreground hover:underline"
                  >
                    <User2 className="w-4 h-4" />
                    by {post.user}
                  </Link>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-foreground font-semibold">
              <Link href={`/post/${post.id}`} className="hover:text-muted-foreground">
                {post.comments_count} comments
              </Link>
            </CardContent>
            <CardFooter className="text-muted-foreground hover:text-secondary-foreground">
              {posttype[0] !== "ask" ? (
                <a target="_blank" href={post.url}>
                  Read more: <span className="underline">{post.domain || ""}</span>
                </a>
              ) : (
                <Link href={`/post/${post.id}`}>Show askHN post</Link>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </main>
  );
}
