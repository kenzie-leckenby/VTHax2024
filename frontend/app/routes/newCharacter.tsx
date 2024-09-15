import * as React from 'react';
import { Link as RemixLink } from '@remix-run/react';
import {
  Box, Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem, Tooltip, Paper, Alert
} from '@mui/material';

type AbilityScores = {
  STR: number;
  INT: number;
  WIS: number;
  DEX: number;
  CON: number;
  CHA: number;
};

type CharacterData = {
  name: string;
  experience?: number;
  abilities?: AbilityScores;
  race?: string;
  class?: string;
  spell?: string;
  hitPoints?: number;
  gold?: number;
};

export default function NewCharacter() {
  const [characterData, setCharacterData] = React.useState<CharacterData>({ name: '' });
  const [rollingAbilities, setRollingAbilities] = React.useState<AbilityScores | null>(null);
  const [abilitiesRolled, setAbilitiesRolled] = React.useState(false);
  const [showAbilities, setShowAbilities] = React.useState(false);
  const [showRace, setShowRace] = React.useState(false);
  const [showClass, setShowClass] = React.useState(false);
  const [showSpell, setShowSpell] = React.useState(false);
  const [showHitPoints, setShowHitPoints] = React.useState(false);
  const [hitPointsRolled, setHitPointsRolled] = React.useState(false);
  const [showGold, setShowGold] = React.useState(false);
  const [goldRolled, setGoldRolled] = React.useState(false);
  const [races, setRaces] = React.useState<string[]>(['Human', 'Elf', 'Dwarf', 'Halfling']); // Example races
  const [classes, setClasses] = React.useState<string[]>(['Cleric', 'Fighter', 'Magic-User', 'Thief']); // Example classes
  const [spells, setSpells] = React.useState<string[]>(['Magic Missile', 'Fireball']); // Example spells

  const rollDice = (numDice: number, sides: number) => {
    return Array.from({ length: numDice }, () => Math.floor(Math.random() * sides) + 1).reduce((a, b) => a + b, 0);
  };

  const handleRollAbilities = () => {
    const newAbilities = {
      STR: rollDice(3, 6),
      INT: rollDice(3, 6),
      WIS: rollDice(3, 6),
      DEX: rollDice(3, 6),
      CON: rollDice(3, 6),
      CHA: rollDice(3, 6),
    };
    setRollingAbilities(newAbilities);
    setAbilitiesRolled(true);
    setShowAbilities(true);
    setCharacterData(prev => ({ ...prev, abilities: newAbilities }));
    setCharacterData(prev => ({ ...prev, experience: 0}));
    setShowRace(true); // Show race dropdown after rolling abilities
  };

  const handleRaceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedRace = event.target.value as string;
    setCharacterData(prev => ({ ...prev, race: selectedRace }));
    if (selectedRace === 'Dwarf') {
      setClasses(['Cleric', 'Thief', 'Fighter']);
    } else if (selectedRace === 'Halfling') {
      setClasses(['Cleric', 'Fighter', 'Thief']);
    } else {
      setClasses(['Cleric', 'Fighter', 'Magic-User', 'Thief']); // Restore all classes for non-Dwarf and non-Halfling races
    }

    setShowClass(true); // Show class dropdown after selecting a race
  };

  const handleClassChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedClass = event.target.value as string;
    setCharacterData(prev => ({ ...prev, class: selectedClass }));
    
    if (selectedClass === 'Magic-User') {
      setShowSpell(true); // Show spell dropdown if class is Magic-User
    } else {
      setShowSpell(false); // Hide spell dropdown if class is not Magic-User
      setShowHitPoints(true); // Show hitpoints roll button after selecting a class
    }
  };

  const handleSpellChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCharacterData(prev => ({ ...prev, spell: event.target.value as string }));
    setShowHitPoints(true);
  };

  const handleRollHitPoints = () => {
    const hitPoints = rollDice(1, 6) + 5; // Example rule: roll 1d6 + 5 for hit points
    setCharacterData(prev => ({ ...prev, hitPoints }));
    setHitPointsRolled(true);
    setShowGold(true); // Show gold roll button after rolling hit points
  };

  const handleRollGold = () => {
    const gold = rollDice(3, 6) * 10; // Example rule: roll 3d6 * 10 for initial gold
    setGoldRolled(true);
    setCharacterData(prev => ({ ...prev, gold }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterData(prev => ({ ...prev, name: event.target.value }));
  };

  const handleSave = async () => {
    console.log('Character data saved:', characterData);
    const res = await fetch('http://localhost:5000/storeCharacterData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ characterData })
    });

    const response = await res.json();
    console.log(response);
  };

  const dwarfDisabled = rollingAbilities
    ? rollingAbilities.CON <= 9 || rollingAbilities.CHA > 17
    : true;

  const elfDisabled = rollingAbilities
    ? rollingAbilities.INT <= 9 || rollingAbilities.CON > 17
    : true;

  const halflingDisabled = rollingAbilities
    ? rollingAbilities.DEX <= 9 || rollingAbilities.STR > 17
    : true;

  

  return (
    <Container>
      <Paper
          elevation={3}
          sx={{
            flexGrow: 1,
            overflowY: 'auto', // Ensure vertical scrolling
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Use full remaining height
            maxHeight: '100%', // Ensure that overflow is handled
          }}
      >
        <Typography variant="h4" sx={{marginBottom: '16px'}}>Who are you?</Typography>
      
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          autoComplete="off"
          value={characterData.name}
          onChange={handleNameChange}
          sx={{ mb: 2 }}
        />

        {characterData.name && (
          <>
            {!abilitiesRolled && (
              <Button variant="contained" onClick={handleRollAbilities}>
                Roll Abilities
              </Button>
            )}

            {showAbilities && rollingAbilities && (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6">Abilities:</Typography>
                  <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
                    {Object.entries(rollingAbilities).map(([ability, score]) => (
                      <Typography key={ability}>{ability}: {score}</Typography>
                    ))}
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  onClick={handleRollAbilities}
                  sx={{ 
                    alignSelf: 'flex-start', // Aligns the button to the top of the container
                    ml: 2 // Optional: margin to separate from abilities
                  }}
                >
                  Re-Roll Abilities
                </Button>
              </Box>
            )}
            {(dwarfDisabled || elfDisabled || halflingDisabled) && showRace && (
              <Alert severity='info'>One or more races have been disabled based on rolled ability points.</Alert>
            )}
            {showRace && (
              <FormControl fullWidth sx={{ mt: 2, marginBottom: '16px'}}>
                <InputLabel>Race</InputLabel>
                <Select
                  value={characterData.race || ''}
                  onChange={handleRaceChange}
                  label="Race"
                >
                  {races.map(race => (
                    <MenuItem
                      key={race}
                      value={race}
                      disabled={
                        (race === 'Dwarf' && dwarfDisabled) ||
                        (race === 'Elf' && elfDisabled) ||
                        (race === 'Halfling' && halflingDisabled)
                      }
                    >
                      {race}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {(characterData.race === 'Halfing' || characterData.race === 'Dwarf') && showClass && (
              <Alert severity='info'>A class has been hidden based on your race.</Alert>
            )}
          
            {showClass && (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Class</InputLabel>
                <Select
                  value={characterData.class || ''}
                  onChange={handleClassChange}
                  label="Class"
                >
                  {classes.map(cls => (
                    <MenuItem key={cls} value={cls}>
                      {cls}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {showSpell && characterData.class === 'Magic-User' && (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Spell</InputLabel>
                <Select
                  value={characterData.spell || ''}
                  onChange={handleSpellChange}
                  label="Spell"
                >
                  {spells.map(spell => (
                    <MenuItem key={spell} value={spell}>
                      {spell}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {showHitPoints && !hitPointsRolled &&(
              <Button variant="contained" onClick={handleRollHitPoints} sx={{ mt: 2 }}>
                Roll Hit Points
              </Button>
            )}

            {characterData.hitPoints !== undefined && (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ mt: 0 }}>
                    Hit Points: {characterData.hitPoints}
                  </Typography>
                <Button
                  variant="contained"
                  onClick={handleRollHitPoints}
                  sx={{ 
                    alignSelf: 'center', // Aligns the button vertically center with the text
                    ml: 2 
                  }}
                >
                  Re-Roll Hit Points
                </Button>
              </Box>
            )}

            {showGold && !goldRolled && (
              <Button variant="contained" onClick={handleRollGold} sx={{ mt: 2 }}>
                Roll Initial Gold
              </Button>
            )}

            {characterData.gold !== undefined && (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ mt: 0 }}>
                  Initial Gold: {characterData.gold}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleRollGold}
                  sx={{ 
                    alignSelf: 'center', // Aligns the button vertically center with the text
                    ml: 2 
                  }}
                >
                  Re-Roll Gold
                </Button>
              </Box>
            )}

            {/* Save Button */}
            {characterData.gold !== undefined && (
              <Button
                variant="contained"
                color="primary"
                to="/chat"
                component={RemixLink}
                onClick={handleSave}
                sx={{ mt: 3 }}
              >
                Save and Begin
              </Button>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
}






