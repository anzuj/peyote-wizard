import React, { useState } from "react";
import { Box } from "@mui/material/";
import { getContrastColor } from "../helpers";

function PaletteColor({showPaletteMenu, color, setCurrentColor, currentColor }) {
  return (
    <Box
      role="button"
      onClick={() => setCurrentColor(color)}
      sx={{
        bgcolor: color.colorCode,
        color: getContrastColor(color.colorCode),
        width: "40px",
        height: "40px",
        borderRadius: "4px",
        cursor: "pointer",
        outline: currentColor.colorCode === color.colorCode ? "2px black solid" : "",
        outlineOffset: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {color.label}
    </Box>
  );
}

export default PaletteColor;
