import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as SelectMui, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

Select.propTypes = {
  /** Can provide additional 'None' option */
  clearable: PropTypes.bool,

  /* Can be disabled for selection */
  disabled: PropTypes.bool,

  /** The value of selector */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

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
      disabled: PropTypes.bool,
      hint: PropTypes.string,
    })
  ),

  /** Called after the select action */
  onChange: PropTypes.func,

  /** The size of the select component */
  size: PropTypes.oneOf(['small', 'medium']),
}

/**
 * Stateless Select Component which can select single options
 */
export default function Select({
  clearable = false,
  value = '',
  onChange = () => undefined,
  options = [],
  label,
  helperText = '',
  error = false,
  size = 'medium',
  margin = 'none',
  fullWidth = true,
  disabled: selectDisabled = false,
  ...rest
}) {
  const currentValue = mapEmpty(value, options)
  const disabled = selectDisabled || options.length === 0

  const mappedOptions = useMemo(() => {
    if (clearable) {
      return [{ label: 'None', value: '' }, ...options]
    }
    return options
  }, [clearable, options])

  const handleChange = value => {
    onChange(value)
  }

  return (
    <FormControl fullWidth={fullWidth} margin={margin} disabled={disabled} variant="outlined" error={error} size={size}>
      {label && <InputLabel>{label}</InputLabel>}
      <SelectMui
        value={currentValue}
        onChange={e => handleChange(e.target.value)}
        label={label}
        inputProps={{ disabled }}
        {...rest}
      >
        {mappedOptions.map(({ label, value, disabled, hint }) => {
          return (
            <MenuItem sx={{ verticalAlign: 'middle' }} key={value} value={value} disabled={disabled}>
              {label === 'None' ? <em>{label}</em> : label}
              {hint && (
                <Tooltip title={hint}>
                  <HelpOutlineIcon
                    color="action"
                    sx={{ fontSize: '1em', lineHeight: '1em', ml: 0.5, pointerEvents: 'auto', verticalAlign: 'middle' }}
                  />
                </Tooltip>
              )}
            </MenuItem>
          )
        })}
      </SelectMui>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

/**
 * - Removes warnings about absent value in options
 * - Maps initial empty value properly
 */
function mapEmpty(value, options) {
  const valueExists = options.some(o => o.value === value)
  if (Boolean(value) && valueExists) return value
  return ''
}
