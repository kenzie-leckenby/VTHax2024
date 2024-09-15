import React, { createContext, useContext, useState, ReactNode } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { red, teal, lightGreen, blueGrey, grey } from '@mui/material/colors'; // Example colors

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Define custom palette for light and dark modes
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? teal[600] : teal[300], // Lighter blue for dark mode, darker blue for light mode
      },
      secondary: {
        main: darkMode ? lightGreen[300] : lightGreen[300], // Different shades of green
      },
      background: {
        default: darkMode ? blueGrey[900] : grey[200], // Dark background for dark mode
        paper: darkMode ? blueGrey[800] : grey[300], // Paper background color
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000', // White text in dark mode, black in light mode
      },
      error: {
        main: red.A400, // Keep error red color consistent
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProviderComponent');
  }
  return context;
};