import React, { useState } from "react";
import { Box } from "@mui/material/";
import { getContrastColor } from "../helpers";

function PaletteColor({showPaletteMenu, colorCode, label, setCurrentColor, currentColor }) {
  return (
    <Box
      role="button"
      onClick={() => setCurrentColor(colorCode)}
      sx={{
        bgcolor: colorCode,
        color: getContrastColor(colorCode),
        width: "40px",
        height: "40px",
        borderRadius: "4px",
        cursor: "pointer",
        outline: currentColor === colorCode ? "2px black solid" : "",
        outlineOffset: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label}
    </Box>
  );
}

export default PaletteColor;
