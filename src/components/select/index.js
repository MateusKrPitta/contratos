import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

export default function SelectTextFields({
  size = "medium",
  label,
  value,
  onChange,
  fullWidth = false,
  width = "200px",
  icon,
  disabled = false,
  options = [],
  id,
  optionFontSize = "0.875rem",
  placeholder,
  borderRadius = "3px",
  fontWeight,
  borderless = false,
  height,
}) {
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1 } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        select
        size={size}
        id={id}
        label={label}
        fullWidth={fullWidth}
        placeholder={placeholder || "Selecione"}
        value={value}
        variant={borderless ? "standard" : "outlined"}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: fullWidth ? "100%" : width,
          backgroundColor: "white",
          margin: "0px",
          borderRadius: borderRadius,
          border: borderless ? "none" : undefined,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: borderRadius,
            border: borderless ? "none" : undefined,
          },
          "& .MuiInputBase-root": {
            border: borderless ? "none" : undefined,
          },
          "& .MuiInput-underline:before": {
            borderBottom: borderless ? "none !important" : undefined,
          },
          "& .MuiInput-underline:hover:before": {
            borderBottom: borderless ? "none !important" : undefined,
          },
          "& .MuiInput-underline:after": {
            borderBottom: borderless ? "none !important" : undefined,
          },
        }}
        InputLabelProps={{
          style: {
            fontSize: "13px",
            fontWeight: fontWeight,
          },
        }}
        InputProps={{
          startAdornment: icon && (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
          disableUnderline: borderless,
          sx: {
            height: height || "36px",
            fontSize: "13px",
            padding: "10px 8px",
            border: borderless ? "none" : undefined,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontSize: optionFontSize,
              padding: "4px 8px",
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
