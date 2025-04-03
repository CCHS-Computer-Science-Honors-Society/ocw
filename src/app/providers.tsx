import { ExploreProvider } from "@/components/explore-button/context";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import React from "react";
import { Toaster } from "sonner";
import { PostHogProvider } from "./_providers/posthog.client";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import { IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "./_providers/theme";
import { ActiveThemeProvider } from "@/components/theme/active-theme";

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "400",
});

export async function Providers({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;

  return (
    <>
      <body
        className={cn(
          // Add your font variables here
          ibm.className,
          // GeistSans.variable,
          // GeistMono.variable,
          "bg-background min-h-screen font-sans antialiased",
          // Apply theme class server-side based on cookie
          activeThemeValue ? `theme-${activeThemeValue}` : "theme-orange", // Default to blue if no cookie
        )}
      >
        <PostHogProvider>
          <TRPCReactProvider>
            <ExploreProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {/* Your custom theme provider */}
                <ActiveThemeProvider initialTheme={activeThemeValue}>
                  {children}
                </ActiveThemeProvider>
              </ThemeProvider>
            </ExploreProvider>
          </TRPCReactProvider>
          <Toaster position="top-center" richColors />
        </PostHogProvider>
      </body>
    </>
  );
}
