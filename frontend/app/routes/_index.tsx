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
        Welcome to IntelliQuest!
      </Typography>
      <Typography variant='h6' sx={{ mb: 2}}>IntelliQuest acts as the "Game Master" for a Table Top RPG session, where it generates a story so you can explore a new world within the bounds of your own imagination. It also keeps track of your information so you don't have to and can focus on immersing yourself into the world!</Typography>
      <Button variant="contained" to="/newCharacter" component={RemixLink}>START ADVENTURE</Button>
    </React.Fragment>
  );
}
