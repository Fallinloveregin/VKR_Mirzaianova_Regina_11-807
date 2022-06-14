import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

InputControl.propTypes = {
  /** An input/control component to render */
  children: PropTypes.node.isRequired,

  /** The property name used to provide data to the component */
  field: PropTypes.string.isRequired,

  /** The formik props that the control will use */
  formikProps: PropTypes.shape({
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  }).isRequired,
}

/**
 * A wrapper/helper to pass the typical formik props to a component.
 *
 * This will inject a number of properties into the child component that are used
 * by formik to provide the standard behavior. The "field" value will be used for
 * the id, name, label, data-testid.
 *
 * @example
 * const { values, handleChange, handleBlur, touched, errors } = useFormik({
 *    const formikProps = { values, touched, errors, handleChange, handleBlur }
 *
 *    return (
 *      <InputControl field="doctorName" formikProps={formikProps}>
 *        <TextField required />
 *      </InputControl>
 *  )
 * })
 */
export default function InputControl({ children, field, formikProps }) {
  // Pull any known props from the child for re-use
  const childFullWidth = children.props.fullWidth || true
  const childRequired = children.props.required || false
  const childLabel = children.props.label
  const childOnChange = children.props.onChange
  const childOnBlur = children.props.onBlur

  const additionalProps = {
    required: childRequired,
    fullWidth: childFullWidth,
    variant: 'outlined',
    id: field,
    name: field,
    value: get(formikProps.values, field),
    label: childLabel ?? camelToTitleCase(field),
    onChange: childOnChange ?? formikProps.handleChange,
    onBlur: childOnBlur ?? formikProps.handleBlur,
    error: get(formikProps.touched, field) && Boolean(get(formikProps.errors, field)),
    helperText: get(formikProps.touched, field) && get(formikProps.errors, field),
    inputProps: { required: false, ...children.props.inputProps },
  }

  return React.cloneElement(children, additionalProps)
}

/**
 * Convert a camel case string into title case. This will separate the words and capitalize each one
 *
 * @param {string} str - a string to convert
 * @return { {string} } - The passed string in title case, i.e. "goForth" to "Go Forth"
 */
export const camelToTitleCase = str => {
  if (str === '') return str
  if (!str || typeof str !== 'string') throw new Error('camelToTitleCase requires a string argument')

  const withSpaces = str.replace(/([A-Z])/g, ' $1')
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
}
