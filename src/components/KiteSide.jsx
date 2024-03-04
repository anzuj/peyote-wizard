import * as React from "react";
import { Box } from "@mui/material";
import BeadRow from "./BeadRow";

export default function KiteSide({ startCount, direction , color}) {
  const endCount = 1;
  const beadRows = [];
  beadRows.push(<BeadRow key={`row-${0}-sequence`} count={startCount} color={color}/>);
  for (let count = startCount - 1; count >= endCount; count--) {
    beadRows.push(
      <React.Fragment key={`row-${count}-sequence`}>
        <BeadRow key={`row-${count}-offset`} count={count} offset color={color}/>
        <BeadRow key={`row-${count}`}  count={count} color={color}/>
      </React.Fragment>
    );
  }

  return (
    <Box className={"kite-" + direction}>
      {direction === "left" && <div className="delica top"></div>}
      {beadRows}
      {direction === "left" && <div className="delica bottom"></div>}
    </Box>
  );
}
