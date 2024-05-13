/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'light-blue': '#5894C8',
                'dark-blue': '#06579E',
                'dark-gray': '#3B4856',
                silver: '#9FADBD',
                beige: '#FFECCB',
                red: '#9E2A2B',
                green: '#209264',
                black: '#0F172A',
            },
            borderRadius: {
                base: '10px',
            },
        },
    },
    plugins: [],
};
