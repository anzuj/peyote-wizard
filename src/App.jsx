import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material/";
import KiteSide from "./components/KiteSide";
import SideCountPicker from "./components/SideCountPicker";
import ColorPicker from "./components/ColorPicker";

export default function App() {
  const [sideCount, setSideCount] = useState(6);
  const [color, setColor] = useState("#c64080");
  const [beadGraph, setBeadGraph] = useState({
    top: { color: "transparent", position: "top", label: "" },
    left: [],
    right: [],
    bottom: { color: "transparent", position: "bottom", label: "" },
  });

  function generateBeads(count) {
    return Array.from({ length: count }, (_, index) => ({ index, color: "transparent" }));
  }

  function generateLeftGraph(totalCount) {
    let rowNr = 1;
    const arr = [{ row: rowNr, offset: false, beadsCount: totalCount, beads: [] }];

    for (let count = totalCount - 1; count >= 1; count--) {
      rowNr++;
      arr.push({ row: rowNr, offset: true, beadsCount: count, beads: generateBeads(count) });
      rowNr++;
      arr.push({ row: rowNr, offset: false, beadsCount: count, beads: generateBeads(count) });
    }
    return arr;
  }

  const test = generateLeftGraph(sideCount);
  console.log(JSON.stringify(test));

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
      <Grid item xs={8} className="border" sx={{}}>
        <Box
          className="kite-container"
          sx={{
            ml: leftMarginPerSideCount[sideCount],
            mt: topMarginPerSideCount[sideCount],
            height: "800px",
            minWidth: "100%",
            position: "relative",
            transform: `scale(${scalePerSideCount[sideCount]})`,
          }}
        >
          <div className="kite-side-container left">
            <KiteSide startCount={sideCount} direction={"left"} color={color} />
          </div>
          <div className="kite-side-container right">
            <KiteSide startCount={sideCount} direction={"right"} color={color} />
          </div>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Peyote-wizard
        </Typography>
        <SideCountPicker sideCount={sideCount} setSideCount={setSideCount} />
        <ColorPicker color={color} setColor={setColor} />
      </Grid>
    </Grid>
  );
}
