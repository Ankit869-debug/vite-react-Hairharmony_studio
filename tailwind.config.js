/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            colors: {
                gold: {
                    100: '#F9F1D8',
                    200: '#F0DEAA',
                    300: '#E6CB7D',
                    400: '#D4AF37',
                    500: '#B5952F',
                    600: '#967B27',
                },
                nude: {
                    50: '#FAF7F5',
                    100: '#F5E6D3',
                    200: '#EBD5B3',
                    300: '#D6C09D',
                    400: '#C2AB87',
                    900: '#2C2519',
                }
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out',
                'slide-up': 'slideUp 1s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
