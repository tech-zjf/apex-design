/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{tsx,jsx,js,ts}'],
    theme: {
        extend: {
            colors: {
                'zjf-red': '#FF2E00',
                'zjf-yellow': '#FFB200',
                'zjf-green': '#00C259',
                'zjf-gray-bg': '#F7F7F7',
                'zjf-cyan': '#3DDBD1',
                'zjf-new-cyan': '#3DDBD1',
                'zjf-darker-cyan': '#1E8E9D',
                'zjf-blue': '#5283F0',
                'zjf-green-cell': '#33A145',
                'zjf-orange': '#FF5430',
                'zjf-border': '#1d1d1d',
                'zjf-gold': '#FFAE00',
                'zjf-dark-gray': '#222427',
                'zjf-dark-bg': '#141414',
                'zjf-bright-blue': '#2367FF',
                gray: {
                    100: '#F6F8FB',
                    200: '#EEF0F3',
                    300: '#E6E7EB',
                    400: '#D5DBE4',
                    500: '#B3BAC8',
                    600: '#838D9E',
                    700: '#656E82',
                    800: '#475368',
                    333: '#333',
                    999: '#999',
                    900: '#152137'
                }
            }
        }
    },
    plugins: []
};
