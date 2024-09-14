import * as React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink } from '@remix-run/react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';

// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
  { title: 'Remix Starter' },
  { name: 'description', content: 'Welcome to remix!' },
];

// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  return (
    <React.Fragment>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        AI Dungeon Master!
      </Typography>
      <Typography variant='body1' sx={{ mb: 2}}>Go on an adventure lead by our AI Dungeon Master using your own character!</Typography>
      <Button variant="contained" to="/chat" component={RemixLink}>START ADVENTURE</Button>
    </React.Fragment>
  );
}
