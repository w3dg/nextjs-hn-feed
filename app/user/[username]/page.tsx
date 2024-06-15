import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  about: string;
  created: number;
  id: string;
  karma: number;
  submitted: number[];
}
interface UserPageProps {
  params: {
    username: string;
  };
}

async function UserPage({ params }: UserPageProps) {
  const { username } = params;
  const userResponse = await fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json`);
  const userJson: User = await userResponse.json();

  return (
    <main className="flex p-8 flex-col gap-6">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>User: {userJson.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Karma: {userJson.karma}</p>
          <p>Posts submitted: {userJson.submitted.length}</p>
        </CardContent>
      </Card>
    </main>
  );
}

export default UserPage;
