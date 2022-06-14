export function getComparisonChar(a, b) {
  if (a === b) return '='
  if (a > b) return '>'
  return '<'
}
