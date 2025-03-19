import React from "react";
import { AuthClient } from "./auth.client";
import { getSession } from "@/server/auth/auth.server";

export async function UserNav() {
  const session = await getSession();

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
