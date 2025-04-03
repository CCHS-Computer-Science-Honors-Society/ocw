"use client";

import { CheckIcon, MoonIcon, RepeatIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { useThemeConfig } from "@/components/theme/active-theme"; // Adjust path
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { baseThemes } from "@/lib/colors"; // Adjust path
import { cn } from "@/lib/utils"; // Adjust path

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  const [mounted, setMounted] = React.useState(false);
  // resolvedTheme gives the actual theme (light/dark), theme might be 'system'
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeReset = () => {
    setActiveTheme("orange"); // Reset to your default theme name
    setTheme("system"); // Reset light/dark mode to system preference
  };

  return (
    <div className="w-full space-y-4 rounded-lg border p-4">
      {/* Header */}
      <div className="flex items-start">
        <div className="space-y-1 pr-2">
          <div className="font-semibold tracking-tight">Customize</div>
          <div className="text-xs text-muted-foreground">
            Pick a style and color.
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-[0.5rem]"
          onClick={handleThemeReset}
          aria-label="Reset theme"
        >
          <RepeatIcon className="size-4" />
        </Button>
      </div>

      {/* Color Theme Selection */}
      <div className="space-y-1.5">
        <Label className="text-xs">Color</Label>
        <div className="grid grid-cols-3 gap-2">
          {baseThemes.map((themeOption) => {
            const isActive = activeTheme === themeOption.name;

            return mounted ? (
              <Button
                variant={"outline"}
                size="sm"
                key={themeOption.name}
                onClick={() => {
                  setActiveTheme(themeOption.name);
                }}
                className={cn(
                  "justify-start",
                  isActive && "border-2 border-primary",
                )}
                // Style the button with its representative color
                style={
                  {
                    "--theme-primary": `${
                      themeOption?.activeColor[
                        resolvedTheme === "dark" ? "dark" : "light"
                      ]
                    }`,
                  } as React.CSSProperties
                }
              >
                <span
                  className={cn(
                    "mr-2 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--theme-primary)]",
                  )}
                >
                  {isActive && <CheckIcon className="size-4 text-white" />}
                </span>
                {themeOption.label}
              </Button>
            ) : (
              <Skeleton className="h-8 w-full" key={themeOption.name} />
            );
          })}
        </div>
      </div>

      {/* Light/Dark Mode Selection */}
      <div className="space-y-1.5">
        <Label className="text-xs">Mode</Label>
        <div className="grid grid-cols-2 gap-2">
          {mounted ? (
            <>
              <Button
                variant={"outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className={cn(
                  resolvedTheme === "light" && "border-2 border-primary",
                )}
              >
                <SunIcon className="mr-2 size-4" />
                Light
              </Button>
              <Button
                variant={"outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className={cn(
                  resolvedTheme === "dark" && "border-2 border-primary",
                )}
              >
                <MoonIcon className="mr-2 size-4" />
                Dark
              </Button>
            </>
          ) : (
            <>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
