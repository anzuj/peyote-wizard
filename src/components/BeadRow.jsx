import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

function generateInitialBeads(count) {
  return Array.from({ length: count }, (_, index) => ({ index, color: "transparent" }));
}

function updateBeads( color, existingBeads, index) {
  return existingBeads.map((bead) => {
    if (bead.index === index) {
      return { ...bead, color: bead.color === "transparent" ? color : "transparent" };
    }
    return bead;
  });
}

export default function BeadRow({ count, offset, color }) {
  const [beads, setBeads] = useState(generateInitialBeads(count));

  useEffect(() => {
    setBeads(generateInitialBeads(count));
  }, [count]);

  const handleBeadClick = (index) => {
    setBeads((existingBeads) => updateBeads( color, existingBeads, index));
  };

  return (
    <Box className={"delica-row " + (offset ? "offset" : "")}>
      {beads.map((bead) => (
        <div
          key={bead.index}
          className="delica"
          style={{ backgroundColor: bead.color }}
          onClick={() => handleBeadClick(bead.index)}
        ></div>
      ))}
    </Box>
  );
}
