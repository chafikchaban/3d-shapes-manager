import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme, injectCSSVariables } from './utils/theme';
import HomePage from './pages/Home/Home.page';
import NavBar from './components/NavBar/Navbar';

const App: React.FC = () => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const theme = getTheme(mode);
        injectCSSVariables(theme);
    }, [mode]);

    return (
        <ThemeProvider theme={getTheme(mode)}>
                <NavBar toggleTheme={toggleTheme} mode={mode} />
                <HomePage />
        </ThemeProvider>
    );
};

export default App;
