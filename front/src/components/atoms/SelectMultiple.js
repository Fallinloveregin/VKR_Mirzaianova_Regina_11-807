import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as SelectMui } from '@mui/material'

SelectMultiple.propTypes = {
  /* Can be disabled for selection */
  disabled: PropTypes.bool,

  /** The value of selector */
  value: PropTypes.arrayOf(PropTypes.string),

  /** Can display an optional label */
  label: PropTypes.string,

  /** Can display a helper text under input */
  helperText: PropTypes.string,

  /** Can display error state */
  error: PropTypes.bool,

  /** Options for selector */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),

  /** Called after the select action */
  onChange: PropTypes.func.isRequired,
}

/**
 * Stateless Select Component which can select multiple options
 */
export default function SelectMultiple({
  value = [],
  onChange,
  options = [],
  label,
  helperText = '',
  error = false,
  disabled: selectDisabled = false,
  ...rest
}) {
  const disabled = selectDisabled || options.length === 0

  return (
    <FormControl fullWidth disabled={disabled} variant="outlined" error={error}>
      {label && <InputLabel>{label}</InputLabel>}
      <SelectMui
        multiple
        label={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        inputProps={{ disabled }}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </SelectMui>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
