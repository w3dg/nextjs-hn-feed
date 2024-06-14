import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserComment from "@/components/Comment";
import Link from "next/link";
import { User2 } from "lucide-react";

export interface CommentType {
  id: number;
  level: number;
  user: string | null;
  time: number;
  time_ago: string;
  content: string;
  comments: CommentType[];
}

interface PostItem {
  id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  time_ago: string;
  type: string;
  url: string;
  domain?: string;
  comments_count: number;
  comments: CommentType[];
}

interface PostItemProps {
  params: {
    postId: number;
  };
}

async function PostPage({ params }: PostItemProps) {
  const { postId } = params;
  const postResponse = await fetch(`https://api.hackerwebapp.com/item/${postId}`);
  const postJson: PostItem = await postResponse.json();
  // console.log(postJson);
  return (
    <main className="flex p-8 flex-col gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-base md:text-xl">{postJson.title}</CardTitle>
          <CardDescription>
            <div className="grid gap-1">
              <div className="flex gap-1">
                <span>{postJson.points || 0} points</span>
                <span>posted {postJson.time_ago}</span>
              </div>
              <Link
                href={`/user/${postJson.user}`}
                className="flex gap-2 items-center text-accent-foreground hover:underline"
              >
                <User2 className="w-4 h-4" />
                by {postJson.user}
              </Link>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {postJson.domain && (
            <a href={postJson.url} target="_blank">
              ({postJson.domain})
            </a>
          )}
          {!postJson.domain && <p>Item id: {postJson.id}</p>}
        </CardContent>
      </Card>

      {postJson.comments_count === 0 ? (
        <p>No comments yet</p>
      ) : (
        <>
          <h2 className="text-xl">{postJson.comments_count} Comments</h2>
          <UserComment comments={postJson.comments}></UserComment>
        </>
      )}
    </main>
  );
}

export default PostPage;
