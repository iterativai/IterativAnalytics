import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'San Francisco',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        '2xl': "1.25rem",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          // Apple iOS blue shades
          50: "#F0F7FF",
          100: "#E0F0FF",
          200: "#BAE0FF",
          300: "#7CC4FA",
          400: "#47A3F3",
          500: "#0A84FF", // Main Apple blue
          600: "#0071E3", // Apple web button blue
          700: "#0059B3",
          800: "#004299",
          900: "#002D6B",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          // Apple red
          500: "#FF3B30", 
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Apple's typical UI colors
        apple: {
          gray: {
            50: "#F9F9F9",
            100: "#F2F2F7",
            200: "#E5E5EA",
            300: "#D1D1D6",
            400: "#C7C7CC",
            500: "#AEAEB2",
            600: "#8E8E93",
            700: "#636366",
            800: "#48484A",
            900: "#1C1C1E",
          },
          blue: "#0A84FF",
          indigo: "#5856D6",
          purple: "#AF52DE",
          pink: "#FF2D55",
          red: "#FF3B30",
          orange: "#FF9500",
          yellow: "#FFCC00",
          green: "#34C759",
          teal: "#5AC8FA",
        },
        chart: {
          "1": "hsl(var(--chart-1, 210 100% 50%))",
          "2": "hsl(var(--chart-2, 260 100% 60%))",
          "3": "hsl(var(--chart-3, 340 100% 50%))",
          "4": "hsl(var(--chart-4, 90 70% 50%))",
          "5": "hsl(var(--chart-5, 30 100% 50%))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background, 0 0% 100%))",
          foreground: "hsl(var(--sidebar-foreground, 0 0% 10%))",
          primary: "hsl(var(--sidebar-primary, 210 100% 50%))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground, 0 0% 100%))",
          accent: "hsl(var(--sidebar-accent, 210 100% 98%))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground, 210 100% 50%))",
          border: "hsl(var(--sidebar-border, 0 0% 90%))",
          ring: "hsl(var(--sidebar-ring, 210 100% 50%))",
        },
      },
      boxShadow: {
        // Apple-style shadows
        'apple-sm': '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'apple': '0 4px 8px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'apple-md': '0 8px 16px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
        'apple-lg': '0 12px 24px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.1)',
        'apple-xl': '0 20px 32px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.1)',
        'apple-button': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'apple-card': '0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Apple-style subtle animations
        "apple-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "apple-scale-in": {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "apple-fade-in": "apple-fade-in 0.4s ease-out",
        "apple-scale-in": "apple-scale-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
