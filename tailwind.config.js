module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px'
            }
        },
        fontFamily: {
            'rubik': ['Rubik', 'sans-serif']
        },
        boxShadow: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            DEFAULT: '0 3px 20px 12px rgba(171, 171, 171, 0.15)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            none: 'none',
            'focus': '0 0 0 0.3rem rgba(238, 255, 250, 0.2)'
        },
        borderWidth: {
            DEFAULT: '1px',
            '0': '0',
            '2': '2px',
            '3': '3px',
            '4': '4px'
        },
        extend: {
            colors: {
                'lightgrey': '#B3B3BF',
                'itemgrey': '#242528',
                'itemactivegrey': '#4C4E54',
                'darkgray': '#3E4851',
                'truth-yellow': '#F6BF22',
                'dare-green': '#09BB88',
                'hover-green': "#EEFFFA",
                'background-black': '#0C0C0C'
            },
            screens: {
                'xxs': '375px',
                'xs': '560px'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}