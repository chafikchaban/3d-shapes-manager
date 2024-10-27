import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NavBar, { NavBarProps } from './Navbar';

describe('NavBar Component', () => {
    const setup = (mode: 'light' | 'dark', toggleThemeMock = vi.fn()) => {
        const props: NavBarProps = {
            mode,
            toggleTheme: toggleThemeMock,
        };
        return render(<NavBar {...props} />);
    };

    it('renders the NavBar with the correct title and icons', () => {
        setup('light');

        const logo = screen.getByAltText('logo');
        expect(logo).toBeTruthy();

        const title = screen.getByText(/Shapes Manager/i);
        expect(title).toBeTruthy();

        expect(screen.getByTestId('ViewInArIcon')).toBeTruthy();
        expect(screen.getByTestId('CategoryIcon')).toBeTruthy();
    });

    it('displays the LightMode icon when in light mode', () => {
        setup('light');

        // Check that the light mode icon is rendered
        expect(screen.getByTestId('LightModeIcon')).toBeTruthy();
    });

    it('displays the DarkMode icon when in dark mode', () => {
        setup('dark');

        // Check that the dark mode icon is rendered
        expect(screen.getByTestId('DarkModeIcon')).toBeTruthy();
    });

    it('calls the toggleTheme function when the theme button is clicked', () => {
        const toggleThemeMock = vi.fn();
        setup('light', toggleThemeMock);

        const toggleButton = screen.getByRole('button');
        fireEvent.click(toggleButton);

        // Check if the toggleTheme function is called when clicking the button
        expect(toggleThemeMock).toHaveBeenCalledTimes(1);
    });
});
