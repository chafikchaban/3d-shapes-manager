import { AppBar, Box, Typography, IconButton } from '@mui/material';
import styles from './Navbar.module.css';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CategoryIcon from '@mui/icons-material/Category';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


export interface NavBarProps {
    mode: string;
    toggleTheme(): void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleTheme, mode }) => {

    return (
        <AppBar className={styles.container} elevation={4}>
            <Box>
                <a href="/" title="home">
                    <img src="src/assets/images/logo.png" alt="logo" className={styles.logo} />
                </a>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <ViewInArIcon color='primary' />
                <Typography variant="h5" component="h5" className={styles.title}>
                    Shapes Manager
                </Typography>
                <CategoryIcon color='primary' />
            </Box>
            <IconButton onClick={toggleTheme}>
                {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </AppBar>
    );
}

export default NavBar;
