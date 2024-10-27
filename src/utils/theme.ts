import { createTheme, Theme } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark') => {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'light' ? '#3a1755' : '#3D7A81',
            },
            background: {
                default: mode === 'light' ? '#F5F7FA' : '#111827',
            },
        },
    });
};

// inject CSS variables into the document root
const injectCSSVariables = (theme: Theme) => {
    const root = document.documentElement;

    root.style.setProperty('--primary-color', theme.palette.primary.main);
    root.style.setProperty('--background-color', theme.palette.background.default);
};


export { getTheme, injectCSSVariables };
