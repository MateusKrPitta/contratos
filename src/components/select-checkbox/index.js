import React from 'react';
import { Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const SelectWithCheckbox = ({ options, label, value, onChange, size }) => {
  const handleToggle = (option) => {
    const currentIndex = value.indexOf(option);
    const newValue = [...value];

    if (currentIndex === -1) {
      newValue.push(option);
    } else {
      newValue.splice(currentIndex, 1);
    }

    onChange(newValue);
  };

  return (
    <FormControl fullWidth variant="outlined" size="small" sx={{ width: size }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        displayEmpty
        value={value}
        onChange={() => {}} 
        renderValue={(selected) =>
          selected.length > 0 ? selected.join(', ') : '' 
        }
        label={label}
        IconComponent={ExpandMoreIcon}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} onClick={() => handleToggle(option.value)}>
            <Checkbox checked={value.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectWithCheckbox;