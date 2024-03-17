import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { getContrastColor } from "../helpers";

const swapDirection = (str) =>
  str.replace(/left|right/g, (match) => (match === "left" ? "right" : "left"));

export default function BeadRow({
  enableSymmetry,
  showLabels,
  palette,
  row,
  count,
  offset,
  currentColor,
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
    let newColor = currentColor.colorCode;
    const currentBeadColor = clickedBead.style.backgroundColor;
    if (currentBeadColor === newColor) {
      newColor = "transparent";
    }

    clickedBead.setAttribute("data-label", currentColor.label);
    clickedBead.setAttribute("data-color", newColor);
    clickedBead.innerText =  newColor !== "transparent" ? currentColor.label : "";
    // const oppositeBead = document.getElementById.swapDirection(bead.id);

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
    setBeads((existingBeads) => updateBeads(newColor, existingBeads, bead.index));

    if (enableSymmetry) {
      const clickedBeadId = bead.id; //for example "row3-right4"

      const oppositeBeadId = swapDirection(clickedBeadId);
      // console.log("clickedBeadId: " + clickedBeadId);
      // console.log("oppositeBeadId: " + oppositeBeadId);
      const oppositeBead = document.getElementById(oppositeBeadId);
      if (oppositeBead) {
        // Update opposite bead's background color
        const currentOppositeColor = oppositeBead.style.backgroundColor;
        let newOppositeColor = currentColor.colorCode;
        if (currentOppositeColor === newOppositeColor) {
          newOppositeColor = "transparent";
        }
        oppositeBead.style.backgroundColor = newOppositeColor;
        oppositeBead.setAttribute("data-label", currentColor.label);
        oppositeBead.setAttribute("data-color", newOppositeColor);
        oppositeBead.innerText =  newOppositeColor !== "transparent" ? currentColor.label : "";
        oppositeBead.style.color = getContrastColor(newOppositeColor)
      }
    }
  };

  const beadLabel = (bead) => {
    let label = "";
    if (bead.color === "transparent") return label;
    const colorInPalette = palette.find((p) => p.colorCode === bead.color);
    if (colorInPalette) {
      console.log("LABEL FOUND IN PALETTE " + colorInPalette.label);
      label = colorInPalette.label;
    }
    if (label && enableSymmetry) {
      const oppositeBeadId = swapDirection(bead.id);
      const oppositeBeadColor = document.getElementById(oppositeBeadId).style.backgroundColor;
      console.log("oppositeBeadColor: " + oppositeBeadColor);
    }

    //retrieve label for opposite bead
    //     if (enableSymmetry) {

    // const currentBeadText = document.getElementById(bead.id).innerText;
    // console.log("currentBeadText: " + currentBeadText);

    //       const oppositeBeadId = swapDirection(bead.id);
    //       console.log("beadLabel current Bead " + bead.id);
    //       console.log("beadLAbel oppositeBead: " + oppositeBeadId);
    //       const oppositeBead = document.getElementById(oppositeBeadId);
    //       if (oppositeBead !== null) {
    //         console.log("oppositeBead innertext: " + oppositeBead.innerText);
    //         label = oppositeBead.innerText
    //         // const oppositeBeadColor = oppositeBead.style.backgroundColor;

    //         // const colorInPalette = palette.find((p) => p.colorCode === oppositeBeadColor);
    //         // if (colorInPalette) {
    //         //   console.log("color in palette");
    //         //   label = colorInPalette.label;
    //         // }
    //       }
    //     }

    return label;
  };

  const beadLabel2 = (beadId) => {
    // console.log("beadLabel2 beadId: " + beadId)

    const currentBead = document.getElementById(beadId);
    if (currentBead) {
      const dataLabel = currentBead.dataset.label;
      console.log("beadLabel2 dataLabel: " + dataLabel);
      // const dataLabel = currentBead.getAttribute("data-label");
      return dataLabel;
    }

    // return label;
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
            {/* {showLabels && beadLabel(bead)} */}
            {/* {showLabels && beadLabel2(bead.id)} */}
          </div>
        );
      })}
    </Box>
  );
}
