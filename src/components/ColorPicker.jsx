import React, { useState } from "react";
import { MuiColorInput } from "mui-color-input";
import { Box, Button, TextField, Card, Divider } from "@mui/material";
import { GoPlus } from "react-icons/go";
import Typography from "@mui/material/Typography";

export default function ColorPicker({ currentColor, addToPalette, palette }) {
  const [displayWarning, setDisplayWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [pickerColor, setPickerColor] = useState(currentColor.colorCode);

  const handleChange = (newValue) => {
    setDisplayWarning(false);
    // setCurrentColor(newValue);
    setPickerColor(newValue)
  };
  const handleAddToPalette = () => {
    const colorExists = palette.find((p) => p.colorCode === pickerColor);
    if (!colorExists) {
      addToPalette({ colorCode: pickerColor, label: nextLabel });
    } else {
      showWarning("Color already exists in palette");
    }
  };

  const showWarning = (message) => {
    setWarningMessage(message);
    setDisplayWarning(true);
  };

  const currentLabels = palette.map((p) => p.label);
  //  const nextLabel = String.fromCharCode(65 + currentLabels.length);

  const [nextLabel, setNextLabel] = useState(String.fromCharCode(65 + currentLabels.length));

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Divider sx={{ my: 2 }}></Divider>
        <Typography variant="h6">Add a new color</Typography>

        <MuiColorInput
          label="Color"
          sx={{ mb: 2 }}
          format="rgb"
          value={pickerColor}
          onChange={handleChange}
        ></MuiColorInput>
        <TextField
          label="Graph label"
          value={nextLabel}
          variant="outlined"
          onChange={(event) => {
            setNextLabel(event.target.value);
          }}
        ></TextField>
        <Button onClick={handleAddToPalette} variant="contained" startIcon={<GoPlus />}>
          add to palette
        </Button>
      </Box>
      {displayWarning && <Box sx={{ color: "#EA4949", mt: 1 }}>{warningMessage}</Box>}
    </>
  );
}
