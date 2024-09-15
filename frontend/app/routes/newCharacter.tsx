import * as React from 'react';
import { Link as RemixLink } from '@remix-run/react';
import {
  Box, Button, TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem, Tooltip
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
  const [showAbilities, setShowAbilities] = React.useState(false);
  const [showRace, setShowRace] = React.useState(false);
  const [showClass, setShowClass] = React.useState(false);
  const [showSpell, setShowSpell] = React.useState(false);
  const [showHitPoints, setShowHitPoints] = React.useState(false);
  const [showGold, setShowGold] = React.useState(false);
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
    setShowAbilities(true);
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
    setShowGold(true); // Show gold roll button after rolling hit points
  };

  const handleRollGold = () => {
    const gold = rollDice(3, 6) * 10; // Example rule: roll 3d6 * 10 for initial gold
    setCharacterData(prev => ({ ...prev, gold }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterData(prev => ({ ...prev, name: event.target.value }));
  };

  const handleSave = () => {
    console.log('Character data saved:', characterData);
    // You can implement the save logic here, such as saving to a backend or local storage
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
      <Typography variant="h4">Who are you?</Typography>
      
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={characterData.name}
        onChange={handleNameChange}
        sx={{ mb: 2 }}
      />

      {characterData.name && (
        <>
          <Button variant="contained" onClick={handleRollAbilities}>
            Roll Abilities
          </Button>

          {showAbilities && rollingAbilities && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Abilities:</Typography>
              {Object.entries(rollingAbilities).map(([ability, score]) => (
                <Typography key={ability}>{ability}: {score}</Typography>
              ))}
            </Box>
          )}

          {showRace && (
            <FormControl fullWidth sx={{ mt: 2 }}>
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

          {showHitPoints && (
            <Button variant="contained" onClick={handleRollHitPoints} sx={{ mt: 2 }}>
              Roll Hit Points
            </Button>
          )}

          {characterData.hitPoints !== undefined && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Hit Points: {characterData.hitPoints}
            </Typography>
          )}

          {showGold && (
            <Button variant="contained" onClick={handleRollGold} sx={{ mt: 2 }}>
              Roll Initial Gold
            </Button>
          )}

          {characterData.gold !== undefined && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Initial Gold: {characterData.gold}
            </Typography>
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
    </Container>
  );
}






