"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "@/server/auth/auth.client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { data } = useSession();
  const router = useRouter();

  if (!data?.user) {
    router.push("/login");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign Out</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Are you sure you want to sign out from your account:{" "}
            {data?.user.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div
              className={cn(
                "flex w-full items-center gap-2",
                "flex-col justify-between",
              )}
            >
              <Button
                variant="outline"
                className={cn("w-full gap-2")}
                onClick={async () => {
                  await signOut();
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
