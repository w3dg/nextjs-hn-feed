import { CommentType } from "@/app/post/[postId]/page";
import Link from "next/link";

interface UserCommentProps {
  comments: CommentType[];
}

function UserComment({ comments }: UserCommentProps) {
  // console.log("Comments", comments);

  // return <pre>{JSON.stringify(comments, null, 4)}</pre>;

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        return (
          <article
            key={comment.id}
            className={`bg-secondary/50 text-secondary-foreground border-l border-secondary-foreground/15 px-4 pt-4 ml-${
              comment.level * 2
            }`}
          >
            <div className="flex gap-1 items-center mb-2">
              <h4 className="font-bold">
                {comment.user ? (
                  <Link className="hover:text-muted-foreground hover:underline" href={`/user/${comment.user}`}>
                    {comment.user}
                  </Link>
                ) : (
                  "user"
                )}
              </h4>
              <p className="text-muted-foreground">{comment.time_ago}</p>
            </div>
            <div className="prose-invert pb-4 text-wrap" dangerouslySetInnerHTML={{ __html: comment.content }}></div>
            {comment.comments.length != 0 && <UserComment comments={comment.comments} />}
          </article>
        );
      })}
    </div>
  );
}

export default UserComment;
