export function mapStringToJS(v) {
  let s = v.toLowerCase()

  s = s.replaceAll('если ', 'if ')
  s = s.replaceAll(' или ', ' || ')
  s = s.replaceAll(' и ', ' && ')
  s = s.replaceAll('тогда ', 'return ')

  return s
}

export function mapJStoString(v) {
  let s = v.toLowerCase()

  s = s.replaceAll('if ', 'если ')
  s = s.replaceAll(' || ', ' или ')
  s = s.replaceAll(' && ', ' и ')
  s = s.replaceAll('return ', 'тогда ')

  return s
}
