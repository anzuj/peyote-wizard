import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Grid, IconButton } from "@mui/material/";
import { MdEdit as EditIcon, MdEditOff as NoEditIcon } from "react-icons/md";
import KiteSide from "./components/KiteSide";
import SideCountPicker from "./components/SideCountPicker";
import ColorPicker from "./components/ColorPicker";
import PaletteColor from "./components/PaletteColor";
import Checkbox from "./components/Checkbox";

export default function App() {
  const [enableSymmetry, setEnableSymmetry] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [instructons, setInstructions] = useState({ 1: "3 x B" });
  const [currentColor, setCurrentColor] = useState("rgb(21, 139, 128)");
  const [sideCount, setSideCount] = useState(6);

  const [showPaletteMenu, setShowPaletteMenu] = useState(false);
  const [palette, setPalette] = useState([
    { colorCode: "rgb(19, 20, 20)", label: "A" },
    { colorCode: "rgb(243, 236, 215)", label: "B" },
    { colorCode: "rgb(21, 139, 128)", label: "C" },
    { colorCode: "rgb(124, 81, 143)", label: "D" },
  ]);
  const addToPalette = (newColor) => {
    setPalette([...palette, newColor]);
  };
  const removeFromPalette = (color) => {
    const filteredPalette = palette.filter((p) => p.colorCode !== color);
    setPalette(filteredPalette);
  };

  function generateBeads(count) {
    return Array.from({ length: count }, (_, index) => ({ index, color: "transparent" }));
  }

  const topMarginPerSideCount = {
    5: "50px",
    6: "55px",
    7: "60px",
    8: "65px",
    9: "70px",
    10: "75px",
    11: "80px",
    12: "80px",
    13: "85px",
    14: "90px",
    15: "70px",
    16: "62px",
    17: "50px",
    18: "35px",
  };

  const leftMarginPerSideCount = {
    5: "90px",
    6: "100px",
    7: "110px",
    8: "120px",
    9: "133px",
    10: "145px",
    11: "155px",
    12: "165px",
    13: "175px",
    14: "185px",
    15: "170px",
    16: "175px",
    17: "155px",
    18: "135px",
  };

  const scalePerSideCount = {
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 1,
    11: 1,
    12: 1,
    13: 1,
    14: 1,
    15: 0.95,
    16: 0.93,
    17: 0.89,
    18: 0.85,
  };

  return (
    <Grid container justifyContent="space-between" minWidth="100%">
      <Grid item xs={8} className="" sx={{}}>
        <Box
          className="kite-container"
          sx={{
            ml: leftMarginPerSideCount[sideCount],
            mt: topMarginPerSideCount[sideCount],
            height: "800px",
            position: "relative",
            transform: `scale(${scalePerSideCount[sideCount]})`,
          }}
        >
          <div className="kite-side-container left">
            <KiteSide
              palette={palette}
              startCount={sideCount}
              direction={"left"}
              color={currentColor}
              showLabels={showLabels}
              enableSymmetry={enableSymmetry}
            />
          </div>
          <div className="kite-side-container right">
            <KiteSide
              palette={palette}
              startCount={sideCount}
              direction={"right"}
              color={currentColor}
              showLabels={showLabels}
              enableSymmetry={enableSymmetry}
            />
          </div>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Peyote-wizard
        </Typography>
        <SideCountPicker sideCount={sideCount} setSideCount={setSideCount} />

        <Box>
          <Checkbox label="Enable symmetry" checked={enableSymmetry} onChange={setEnableSymmetry} />
          <Checkbox label="Show labels" checked={showLabels} onChange={setShowLabels} />
        </Box>

        <Box mt={2}>
          <div>Palette</div>
          <Box display="flex" gap={1}>
            {/* {JSON.stringify(palette)} */}
            {palette.map((color, index) => (
              <PaletteColor
                currentColor={currentColor}
                setCurrentColor={setCurrentColor}
                key={index}
                colorCode={color.colorCode}
                label={color.label}
                showPaletteMenu={showPaletteMenu}
              />
            ))}

            <IconButton disableRipple onClick={() => setShowPaletteMenu(!showPaletteMenu)}>
              {showPaletteMenu ? <NoEditIcon /> : <EditIcon />}{" "}
            </IconButton>
          </Box>
        </Box>
        {showPaletteMenu && (
          <Box mt={2}>
            <ColorPicker
              palette={palette}
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
              addToPalette={addToPalette}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
