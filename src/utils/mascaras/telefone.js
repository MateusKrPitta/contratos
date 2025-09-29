import React from "react";
import MaskedInput from "react-text-mask";
import { TextField, InputAdornment } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";

const MaskedFieldPhone = ({
  value,
  onChange,
  icon = <PhoneIcon />,
  iconSize = 24,
  label = "Telefone",
  labelSize = "small",
  width = "100%",
  autoComplete = "off",
}) => {
  const mask = [
    "(",
    /[1-9]/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  return (
    <MaskedInput
      mask={mask}
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
          label={label}
          autoComplete={autoComplete}
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

export default MaskedFieldPhone;
