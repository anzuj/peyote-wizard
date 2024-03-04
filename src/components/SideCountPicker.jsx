import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SideContPicker({ sideCount, setSideCount }) {
  const minValue = 5;
  const maxValue = 18;
  const menuItems = [];

  // Generate MenuItem components using a loop
  for (let i = minValue; i <= maxValue; i++) {
    menuItems.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  return (
    <Box sx={{}}>
    <FormControl fullWidth>
      <InputLabel>Side count</InputLabel>
    <Select
      id=""
      label="Side count"
      value={sideCount}
      sx={{width:"100px"}}
      onChange={(event) => setSideCount(event.target.value)}
    >
      {menuItems}
    </Select>
    </FormControl>
    </Box>
  );
}