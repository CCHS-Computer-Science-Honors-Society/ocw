"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import Link from "next/link";

export function SignOut() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    setLoading(true);
    router.push("/logout");
    router.refresh();
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      {isLoading ? "Loading..." : "Sign out"}
    </DropdownMenuItem>
  );
}

export const SignInButton = () => {
  return (
    <Link
      className={buttonVariants({
        variant: "ghost",
      })}
      href="/login"
    >
      Sign In
    </Link>
  );
};
