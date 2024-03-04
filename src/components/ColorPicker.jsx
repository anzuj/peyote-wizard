import React from "react";
import { MuiColorInput } from "mui-color-input";
import Box from "@mui/material/Box";

export default function ColorPicker({ color, setColor }) {
  const handleChange = (newValue) => {
    setColor(newValue);
  };

  return (
    <Box mt={1}>
      <MuiColorInput format="hex" value={color} onChange={handleChange} />
    </Box>
  );
}
