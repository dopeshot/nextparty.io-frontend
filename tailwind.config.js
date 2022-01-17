module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    safelist: [{
        pattern: /(border|text)-theme-(default|kids|classic|friendship|couples|soft|party|hot|sexy|hardcore|onlydares|onlytruths|crazy)-(truth|dare)/,
    }],
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
        colors: {
            "light-500": "#FFFFFF",
            "light-600": "#FFFFFFBF",
            "light-700": "#FFFFFF80",
            "dark-500": "#232323",
            "dark-600": "#111111",
            "dark-700": "#0A0A0A",
            "dark-800": "#000000",
            "theme-default-truth": "#F45C68",
            "theme-default-dare": "#00E5D9",
            "theme-kids-truth": "#FF2641",
            "theme-kids-dare": "#03E07C",
            "theme-classic-truth": "#F99000",
            "theme-classic-dare": "#94EFC6",
            "theme-friendship-truth": "#FF5D5D",
            "theme-friendship-dare": "#FDEB62",
            "theme-couples-truth": "#E47583",
            "theme-couples-dare": "#A368FC",
            "theme-soft-truth": "#FAA69A",
            "theme-soft-dare": "#7CC9DF",
            "theme-party-truth": "#9585FF",
            "theme-party-dare": "#01ED70",
            "theme-hot-truth": "#FA5CB6",
            "theme-hot-dare": "#FF3D56",
            "theme-sexy-truth": "#FF233E",
            "theme-sexy-dare": "#5CC9C2",
            "theme-hardcore-truth": "#DB162F",
            "theme-hardcore-dare": "#929292",
            "theme-onlydares-truth": "#B04FD4",
            "theme-onlydares-dare": "#E86507",
            "theme-onlytruths-truth": "#9B72FF",
            "theme-onlytruths-dare": "#49CADC",
            "theme-crazy-truth": "#EC41EF",
            "theme-crazy-dare": "#70CF7E"
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
            screens: {
                'xxs': '375px',
                'xs': '560px'
            }
        },
    },
    plugins: [],
}