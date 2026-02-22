/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "#E2E2DF",
                input: "#E2E2DF",
                ring: "#8DA399",
                background: "#FAFAF9",
                foreground: "#1A1A1A",
                primary: {
                    DEFAULT: "#8DA399",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#E5E5E0",
                    foreground: "#1A1A1A",
                },
                destructive: {
                    DEFAULT: "hsl(0 84.2% 60.2%)",
                    foreground: "hsl(0 0% 98%)",
                },
                muted: {
                    DEFAULT: "#F0F0EB",
                    foreground: "#64748B",
                },
                accent: {
                    DEFAULT: "#D4AF37",
                    foreground: "#FFFFFF",
                },
                popover: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#1A1A1A",
                },
                card: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#1A1A1A",
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
                serif: ['var(--font-serif)', 'serif'],
                heading: ['var(--font-serif)'],
                body: ['var(--font-sans)'],
            },
            borderRadius: {
                lg: "0.5rem",
                md: "calc(0.5rem - 2px)",
                sm: "calc(0.5rem - 4px)",
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
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
