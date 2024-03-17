import * as React from "react";
import { Box } from "@mui/material";
import BeadRow from "./BeadRow";

export default function KiteSide({enableSymmetry, showLabels, startCount, direction, color , palette}) {
  const endCount = 1;
  const beadRows = [];
  let currentRow = 1
  beadRows.push(<BeadRow enableSymmetry={enableSymmetry} showLabels={showLabels} palette={palette} key={`row-${0}-sequence`} row={currentRow} count={startCount} currentColor={color} direction={direction} />);
  currentRow ++
  for (let count = startCount - 1; count >= endCount; count--) {
   
    beadRows.push(
      <React.Fragment key={`row-${count}-sequence`}>
        <BeadRow enableSymmetry={enableSymmetry}  showLabels={showLabels} palette={palette} row={currentRow} key={`row-${count}-offset`} count={count} offset currentColor={color} direction={direction}/>
        <BeadRow enableSymmetry={enableSymmetry} showLabels={showLabels}  palette={palette} row={currentRow + 1} key={`row-${count}`} count={count} currentColor={color} direction={direction} />
      </React.Fragment>
    );
    currentRow += 2
  }

  return (
    <Box className={"kite-" + direction}>
      {direction === "left" && <div className="delica top"></div>}
      {beadRows}
      {direction === "left" && (
        <>
          <div className="delica bottom-left" />
          <div className="delica bottom" />
          <div className="delica bottom-right" />
        </>
      )}
    </Box>
  );
}
