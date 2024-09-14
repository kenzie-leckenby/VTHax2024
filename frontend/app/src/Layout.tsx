import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';
import AppBar from '../components/AppBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <CssBaseline />
      <AppBar />
      <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        {children}
      </Box>
    </Container>
    </div>
  );
}
