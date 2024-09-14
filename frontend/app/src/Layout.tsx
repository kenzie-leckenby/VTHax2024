import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '../components/AppBar';
import { ThemeProviderComponent } from './ThemeContext'; // Adjust the path as needed

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviderComponent>
      <div>
        <AppBar />
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            {children}
          </Box>
        </Container>
      </div>
    </ThemeProviderComponent>
  );
}
