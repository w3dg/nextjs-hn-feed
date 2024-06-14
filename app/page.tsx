import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const NEWS_API_URL = "https://api.hackerwebapp.com/news";

interface HomePageProps {
  searchParams: {
    page: number | undefined;
  };
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
  domain: string;
}

export default async function Home({ searchParams }: HomePageProps) {
  let { page } = searchParams;

  if (page == undefined) {
    page = 1;
  }

  const response = await fetch(`${NEWS_API_URL}?page=${page}`);
  const newsPosts: NewsPost[] = await response.json();
  // console.log(newsPosts);

  return (
    <main className="flex min-h-screen flex-col gap-6 items-center p-8">
      <h2 className="font-bold text-2xl">News</h2>
      <div className="flex gap-4">
        {page >= 2 ? (
          <Link className="px-2 py-1 rounded bg-slate-500 text-slate-100" href={`/?page=${Number(page) - 1}`}>
            prev
          </Link>
        ) : (
          <p className="px-2 py-1 rounded bg-muted text-slate-100">prev</p>
        )}
        <h3 className="p-1 font-semibold">Page {page}</h3>
        {newsPosts.length !== 0 ? (
          <Link className="px-2 py-1 rounded bg-slate-500 text-slate-100" href={`/?page=${Number(page) + 1}`}>
            next
          </Link>
        ) : (
          <p className="px-2 py-1 rounded bg-slate-400 text-slate-100">next</p>
        )}
      </div>
      {newsPosts.map((post) => {
        return (
          <Card className="w-full bg-secondary/50" key={post.id}>
            <CardHeader>
              <CardTitle className="text-lg font-bold">{post.title}</CardTitle>
              <CardDescription className="flex gap-2">
                <span>{post.points || 0} points</span>
                <span>posted {post.time_ago}</span>
                <Link href={`/user/${post.user}`} className="text-accent-foreground hover:underline">
                  by {post.user}
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-foreground font-semibold">
              <Link href={`/post/${post.id}`} className="hover:text-muted-foreground">
                {post.comments_count} comments
              </Link>
            </CardContent>
            <CardFooter className="text-muted-foreground hover:text-secondary-foreground">
              <a target="_blank" href={post.url}>
                Read more: <span className="underline">({post.domain})</span>
              </a>
            </CardFooter>
          </Card>
        );
      })}
    </main>
  );
}
