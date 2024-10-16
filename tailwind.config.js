/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
		animation: {
			fadeIn: "fadeIn .3s ease-in",
			easeSpin: "spin 1.5s ease-in-out infinite"
		},
		keyframes: {
			fadeIn: {
				from: { opacity: 0 },
				to:   { opacity: 1 },
			},
		},
	},
  },
  plugins: [],
}

