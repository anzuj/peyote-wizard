import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { getContrastColor } from "../helpers";

export default function BeadRow({
  enableSymmetry,
  showLabels,
  palette,
  row,
  count,
  offset,
  color,
  direction,
}) {
  const [beads, setBeads] = useState(generateInitialBeads(count));

  function generateInitialBeads(count) {
    return Array.from({ length: count }, (_, index) => ({
      index,
      color: "transparent",
      numberInRow: direction === "left" ? count - index : index + 1,
      row: row,
      id: `row${row}-${direction}${direction === "left" ? count - index : index + 1}`,
    }));
  }

  function updateBeads(color, existingBeads, index) {
    return existingBeads.map((bead) => {
      if (bead.index === index) {
        return { ...bead, color: bead.color === "transparent" ? color : "transparent" };
      }
      return bead;
    });
  }

  useEffect(() => {
    setBeads(generateInitialBeads(count));
  }, [count]);

  const handleBeadClick = (bead) => {
    const clickedBead = document.getElementById(bead.id);

    /*     if (clickedBead) {
      // Update its background color
      const currentBeadColor = clickedBead.style.backgroundColor;
      console.log("current color from palette: " + color);
      let newColor = color;
      if (currentBeadColor === color) {
        newColor = "transparent";
      }
      clickedBead.style.backgroundColor = newColor;
    }

    if (enableSymmetry) {
      const clickedBeadId = bead.id; //for example "row3-right4"
      const oppositeBeadId = clickedBeadId.replace("left", "right").replace("right", "left");

      const oppositeBead = document.getElementById(oppositeBeadId);
      if (oppositeBead) {
        // Update opposite bead's background color
        const currentOppositeColor = oppositeBead.style.backgroundColor;
        let newOppositeColor = color;
        if (currentOppositeColor === color) {
          newOppositeColor = "transparent";
        }
        oppositeBead.style.backgroundColor = newOppositeColor;
      }
    }
 */
    setBeads((existingBeads) => updateBeads(color, existingBeads, bead.index));

    if (enableSymmetry) {
      const clickedBeadId = bead.id; //for example "row3-right4"
      const swapDirection = (str) =>
        str.replace(/left|right/g, (match) => (match === "left" ? "right" : "left"));

      const oppositeBeadId = swapDirection(clickedBeadId);
      console.log("clickedBeadId: " + clickedBeadId);
      console.log("oppositeBeadId: " + oppositeBeadId);
      const oppositeBead = document.getElementById(oppositeBeadId);
      if (oppositeBead) {
        // Update opposite bead's background color
        const currentOppositeColor = oppositeBead.style.backgroundColor;
        let newOppositeColor = color;
        if (currentOppositeColor === color) {
          newOppositeColor = "transparent";
        }
        oppositeBead.style.backgroundColor = newOppositeColor;
      }
    }
  };

  const beadLabel = (color) => {
    // if(enableSymmetry){

    // }

    if (!color || !showLabels) {
      return "";
    } else {
      const colorInPalette = palette.find((p) => p.colorCode === color);
      if (colorInPalette) {
        console.log("color in palette");
        return colorInPalette.label;
      } else {
        return "";
      }
    }
  };

  return (
    <Box className={"delica-row " + (offset ? "offset" : "")}>
      {/* beads: {JSON.stringify(beads)} */}
      {beads.map((bead) => {
        return (
          <div
            key={bead.index}
            data-direction={direction}
            data-color={bead.color}
            className="delica"
            id={bead.id}
            style={{ color: getContrastColor(bead.color), backgroundColor: bead.color }}
            onClick={() => handleBeadClick(bead)}
          >
            {/* {beadColor} */}
            {beadLabel(bead.color)}
          </div>
        );
      })}
    </Box>
  );
}
