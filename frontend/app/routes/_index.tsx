import * as React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink } from '@remix-run/react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';

// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
  { title: 'IntelliQuest' },
  { name: 'description', content: 'Welcome to IntelliQuest!' },
];

// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  return (
    <React.Fragment>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        Welcome to AI Dungeon Master!
      </Typography>
      <Typography variant='h6' sx={{ mb: 2}}>Go on an adventure lead by our innovation AI Dungeon Master using your very own character!</Typography>
      <Button variant="contained" to="/newCharacter" component={RemixLink}>START ADVENTURE</Button>
    </React.Fragment>
  );
}
