import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "./index";

export const getSession = async () =>
  cache(auth.api.getSession)({
    headers: await headers(),
  });
