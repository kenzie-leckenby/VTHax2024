import * as React from 'react';
import { Box, Typography, Button } from '@mui/material';

type CharacterSheetProps = {
  name: string;
  race: string;
  className: string;
  level: number;
  abilities: { [key: string]: number };
  hitPoints: number;
  gold: number;
};

const CharacterSheet: React.FC<CharacterSheetProps> = ({
  name,
  race,
  className,
  level,
  abilities,
  hitPoints,
  gold,
}) => {
  const abilityEntries = Object.entries(abilities);
  const half = Math.ceil(abilityEntries.length / 2);
  const firstColumnAbilities = abilityEntries.slice(0, half);
  const secondColumnAbilities = abilityEntries.slice(half);

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        width: '300px', // Adjust as needed
      }}
    >
      {/* Character Name */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        {name}
      </Typography>

      {/* Race, Class, and Level */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          {race} {className}
        </Typography>
        <Typography variant="h6">
          Level {level}
        </Typography>
      </Box>

      {/* Abilities in Two Columns */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          {firstColumnAbilities.map(([ability, score]) => (
            <Typography key={ability}>
              {ability}: {score}
            </Typography>
          ))}
        </Box>
        <Box>
          {secondColumnAbilities.map(([ability, score]) => (
            <Typography key={ability}>
              {ability}: {score}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Hit Points and Gold */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Hit Points: {hitPoints}</Typography>
        <Typography variant="h6">Gold: {gold}</Typography>
      </Box>
    </Box>
  );
};

export default CharacterSheet;
