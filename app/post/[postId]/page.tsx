import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserComment from "@/components/Comment";

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
  domain: string;
  comments_count: number;
  comments: CommentType[];
}

interface PostItemProps {
  params: {
    postId: number;
  };
}

async function UserPage({ params }: PostItemProps) {
  const { postId } = params;
  const postResponse = await fetch(`https://api.hackerwebapp.com/item/${postId}`);
  const postJson: PostItem = await postResponse.json();
  // console.log(postJson);
  return (
    <main className="flex p-8 flex-col gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{postJson.title}</CardTitle>
          <CardDescription className="flex gap-2 items-center">
            <span>Points: {postJson.points || 0}</span>
            <span>Posted by: {postJson.user || ""}</span>
            <span>Posted {postJson.time_ago}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a href={postJson.url} target="_blank">
            ({postJson.domain})
          </a>
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

export default UserPage;
