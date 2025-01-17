import { ExploreProvider } from "@/components/explore-button/context";
import { TRPCReactProvider } from "@/trpc/react";
import React from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TRPCReactProvider>
        <ExploreProvider>{children}</ExploreProvider>
      </TRPCReactProvider>
      <Toaster position="top-center" richColors />
    </>
  );
}
