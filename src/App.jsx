import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material/";
import KiteSide from "./components/KiteSide";
import SideCountPicker from "./components/SideCountPicker";
import ColorPicker from "./components/ColorPicker";
import MenuItem from "@mui/material/MenuItem";

export default function App() {
  const [sideCount, setSideCount] = useState(14);
  const [color, setColor] = useState("#c64080");

  return (
    <Grid container justifyContent="space-between" minWidth="100%">
      <Grid item sx={6}>
        <Box className="kite-container" sx={{ ml: "180px", mt: "80px" }}>
          <div className="kite-side-container left">
            <KiteSide startCount={sideCount} direction={"left"} color={color} />
          </div>
          <div className="kite-side-container right">
            <KiteSide startCount={sideCount} direction={"right"} color={color} />
          </div>
        </Box>
      </Grid>
      <Grid item sx={6} >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Peyote-wizard
        </Typography>
        <SideCountPicker sideCount={sideCount} setSideCount={setSideCount} />
        <ColorPicker color={color} setColor={setColor} />
      </Grid>
    </Grid>
  );
}
