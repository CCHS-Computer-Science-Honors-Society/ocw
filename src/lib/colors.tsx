// lib/themes.ts
export const baseThemes = [
  {
    name: "blue",
    label: "Blue",
    activeColor: {
      // Use the primary color for the swatch
      light: "oklch(0.59 0.20 277.12)", // primary light
      dark: "oklch(0.68 0.16 276.93)", // primary dark
    },
  },
  {
    name: "orange",
    label: "Orange",
    activeColor: {
      // Use the primary color for the swatch (using HSL as provided)
      light: "hsl(11.63 100% 68.63%)", // primary light
      dark: "hsl(11.63 100% 68.63%)", // primary dark (same in your example)
    },
  },
  {
    name: "green",
    label: "Green",
    activeColor: {
      // Use the primary color for the swatch
      light: "oklch(0.52 0.13 144.17)", // primary light
      dark: "oklch(0.67 0.16 144.21)", // primary dark
    },
  },
] as const;

export type BaseTheme = (typeof baseThemes)[number];
