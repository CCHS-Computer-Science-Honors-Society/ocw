"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export function SignOut() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    setLoading(true);
    router.push("/sign-out");
    router.refresh();
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      {isLoading ? "Loading..." : "Sign out"}
    </DropdownMenuItem>
  );
}

export const SignInButton = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    setLoading(true);
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={handleSignIn}
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
    </Button>
  );
};
