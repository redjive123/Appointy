/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(220px, 1fr))'
      },
      colors: {
        primary: {
          DEFAULT: '#171717',
          hover: '#000000',
          muted: '#262626',
        },
        ink: '#171717',
        body: '#4d4d4d',
        mute: '#8f8f8f',
        faint: '#a1a1a1',
        hairline: '#ebebeb',
        'hairline-soft': '#f2f2f2',
        canvas: {
          DEFAULT: '#fafafa',
          elevated: '#ffffff',
        },
        accent: {
          blue: '#0070f3',
          'blue-deep': '#0761d1',
          'blue-soft': '#d3e5ff',
          violet: '#7928ca',
          cyan: '#50e3c2',
          pink: '#ff0080',
          amber: '#f5a623',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '20px',
      },
      boxShadow: {
        'whisper': '0px 1px 2px rgba(0, 0, 0, 0.04)',
        'elevated': '0px 2px 4px rgba(0, 0, 0, 0.04), 0px 8px 16px -4px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}