import React from "react";
import MaskedInput from "react-text-mask";
import { TextField, InputAdornment } from "@mui/material";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";

const MaskedFieldCep = ({
  value,
  onChange,
  icon = <LocationOnOutlined />,
  iconSize = 24,
  labelSize = "small",
  width = "100%",
  inputRef, // Adicione esta prop
  onKeyDown, // Adicione esta prop
}) => {
  const mask = [/\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

  return (
    <MaskedInput
      mask={mask}
      guide={false}
      value={value}
      onChange={onChange}
      render={(ref, props) => (
        <TextField
          {...props}
          inputRef={(element) => {
            ref(element);
            if (inputRef) {
              inputRef(element);
            }
          }}
          onKeyDown={onKeyDown}
          variant="outlined"
          size="small"
          fullWidth
          label="CEP"
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

export default MaskedFieldCep;
