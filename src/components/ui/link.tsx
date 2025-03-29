"use client";

import NextLink from "next/link";

export const Link: typeof NextLink = (({ children, ...props }) => {
  return <NextLink {...props}>{children}</NextLink>;
}) as typeof NextLink;
