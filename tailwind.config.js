/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F3F4EF",
          deep: "#EAEBE2",
          line: "#C7CBBF",
        },
        ink: {
          DEFAULT: "#1B1F1B",
          soft: "#4B5147",
          faint: "#767C70",
        },
        stamp: {
          DEFAULT: "#B3261E",
          dark: "#8C2116",
          light: "#D9483B",
        },
        registry: {
          DEFAULT: "#2B4A5E",
          dark: "#1E3544",
        },
        seal: {
          available: "#2F6B3A",
          pending: "#B9791A",
          sold: "#8C2116",
        },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "parcel-grid":
          "linear-gradient(#C7CBBF 1px, transparent 1px), linear-gradient(90deg, #C7CBBF 1px, transparent 1px)",
      },
      boxShadow: {
        ledger: "0 1px 0 0 rgba(27,31,27,0.08), 0 8px 20px -12px rgba(27,31,27,0.35)",
        stamp: "0 2px 8px -2px rgba(179,38,30,0.45)",
      },
      letterSpacing: {
        stamped: "0.08em",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
