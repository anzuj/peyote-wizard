import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function MyCheckbox({label, checked, onChange}) {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox disableRipple checked={checked} onChange={handleChange} />}
        label={label}
      />
    </FormGroup>
  );
}

export default MyCheckbox;
