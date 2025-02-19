import { auth } from "@/server/auth";
import React from "react";
import { AuthClient } from "./auth.client";

export async function UserNav() {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  return (
    <AuthClient
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
    />
  );
}
