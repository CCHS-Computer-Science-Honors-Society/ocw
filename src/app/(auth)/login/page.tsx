import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/server/auth";
import Google from "@/components/ui/icons/google";

export default async function LoginForm({
  searchParams,
}: {
  searchParams: Promise<{
    redirect?: string;
  }>;
}) {
  const { redirect } = await searchParams;

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form
              action={async () => {
                "use server";
                await signIn("google", {
                  redirectTo: redirect ?? "/",
                });
              }}
            >
              <Button className="w-full bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90">
                <span className="pointer-events-none me-2 flex-1">
                  <Google className="opacity-60" aria-hidden="true" />
                </span>
                Login with Google
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
