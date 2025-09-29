import React from "react";
import MaskedInput from "react-text-mask";
import { TextField, InputAdornment } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";

const MaskedFieldOAB = ({
  value,
  onChange,
  icon = <GavelIcon />,
  iconSize = 24,
  labelSize = "small",
  width = "100%",
}) => {
  const createMask = (rawValue) => {
    const digits = rawValue.replace(/\D/g, "");
    let mask = [];

    if (digits.length <= 5) {
      mask = [/\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /[A-Z]/, /[A-Z]/];
    } else if (digits.length === 6) {
      mask = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /[A-Z]/, /[A-Z]/];
    } else {
      mask = [
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "/",
        /[A-Z]/,
        /[A-Z]/,
      ];
    }

    return mask;
  };

  return (
    <MaskedInput
      mask={(rawValue) => createMask(rawValue)}
      guide={false}
      value={value}
      onChange={onChange}
      render={(ref, props) => (
        <TextField
          {...props}
          inputRef={ref}
          variant="outlined"
          size="small"
          fullWidth
          label="OAB"
          autoComplete="off"
          InputLabelProps={{
            shrink: true,
            style: { fontSize: labelSize === "small" ? "0.75rem" : "1rem" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {React.cloneElement(icon, { style: { fontSize: iconSize } })}
              </InputAdornment>
            ),
          }}
          sx={{ width }}
        />
      )}
    />
  );
};

export default MaskedFieldOAB;
