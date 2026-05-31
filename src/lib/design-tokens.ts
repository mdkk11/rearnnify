export const designTokens = {
  name: "Titanium Deck",
  colors: {
    primary: "#1c1f24",
    secondary: "#6c727a",
    tertiary: "#1c1f24",
    neutral: "#e7e9ec",
    surface: "#f1f2f4",
  },
  typography: {
    display: "Space Grotesk",
    body: "Space Grotesk",
    mono: "IBM Plex Mono",
    scale: {
      hero: "3.5rem / 1.04 / 600 / -0.03em",
      h1: "2.25rem / 1.15 / 600 / -0.025em",
      h2: "1.5rem / 1.3 / 600 / -0.015em",
      body: "0.9375rem / 1.55 / 400 / 0",
    },
  },
  radius: {
    sm: "3px",
    md: "5px",
    lg: "8px",
    pill: "9999px",
  },
  shadows: {
    card: "rgba(255,255,255,0.7) 0 1px 0 inset, rgba(28,31,36,0.06) 0 0 0 1px, rgba(28,31,36,0.04) 0 1px 2px",
    button:
      "rgba(255,255,255,0.10) 0 1px 0 inset, rgba(0,0,0,0.18) 0 1px 2px",
  },
  fontsUrl:
    "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
} as const;
