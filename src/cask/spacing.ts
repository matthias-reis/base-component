// Spacing system type definitions and utilities

export type SpacingValue = 
  | '0' 
  | '1' 
  | 'xxs' 
  | 'xs' 
  | 's' 
  | 'm' 
  | 'l' 
  | 'xl' 
  | 'xxl' 
  | '3xl' 
  | '4xl' 
  | '5xl' 
  | '6xl'

export interface MarginProps {
  /** All margins */
  m?: SpacingValue
  /** Margin left */
  ml?: SpacingValue
  /** Margin right */
  mr?: SpacingValue
  /** Margin top */
  mt?: SpacingValue
  /** Margin bottom */
  mb?: SpacingValue
  /** Margin inline (left and right) */
  mx?: SpacingValue
  /** Margin block (top and bottom) */
  my?: SpacingValue
}

export interface PaddingProps {
  /** All padding */
  p?: SpacingValue
  /** Padding left */
  pl?: SpacingValue
  /** Padding right */
  pr?: SpacingValue
  /** Padding top */
  pt?: SpacingValue
  /** Padding bottom */
  pb?: SpacingValue
  /** Padding inline (left and right) */
  px?: SpacingValue
  /** Padding block (top and bottom) */
  py?: SpacingValue
}

export interface SpacingProps extends MarginProps, PaddingProps {}

// Map spacing prop values to CSS variable names
const spacingValueToCSSVar: Record<SpacingValue, string> = {
  '0': '--space0',
  '1': '--space',
  'xxs': '--spaceXXS',
  'xs': '--spaceXS',
  's': '--spaceS',
  'm': '--spaceM',
  'l': '--spaceL',
  'xl': '--spaceXL',
  'xxl': '--spaceXXL',
  '3xl': '--space3XL',
  '4xl': '--space4XL',
  '5xl': '--space5XL',
  '6xl': '--space6XL',
}

/**
 * Convert spacing value to CSS custom property
 */
export function spacingValueToVar(value: SpacingValue): string {
  return `var(${spacingValueToCSSVar[value]})`
}

/**
 * Generate margin CSS based on spacing value
 */
export function getMarginCSS(value: SpacingValue): string {
  switch (value) {
    case '0': return `margin: var(--space0);`
    case '1': return `margin: var(--space);`
    case 'xxs': return `margin: var(--spaceXXS);`
    case 'xs': return `margin: var(--spaceXS);`
    case 's': return `margin: var(--spaceS);`
    case 'm': return `margin: var(--spaceM);`
    case 'l': return `margin: var(--spaceL);`
    case 'xl': return `margin: var(--spaceXL);`
    case 'xxl': return `margin: var(--spaceXXL);`
    case '3xl': return `margin: var(--space3XL);`
    case '4xl': return `margin: var(--space4XL);`
    case '5xl': return `margin: var(--space5XL);`
    case '6xl': return `margin: var(--space6XL);`
  }
}

/**
 * Generate padding CSS based on spacing value
 */
export function getPaddingCSS(value: SpacingValue): string {
  switch (value) {
    case '0': return `padding: var(--space0);`
    case '1': return `padding: var(--space);`
    case 'xxs': return `padding: var(--spaceXXS);`
    case 'xs': return `padding: var(--spaceXS);`
    case 's': return `padding: var(--spaceS);`
    case 'm': return `padding: var(--spaceM);`
    case 'l': return `padding: var(--spaceL);`
    case 'xl': return `padding: var(--spaceXL);`
    case 'xxl': return `padding: var(--spaceXXL);`
    case '3xl': return `padding: var(--space3XL);`
    case '4xl': return `padding: var(--space4XL);`
    case '5xl': return `padding: var(--space5XL);`
    case '6xl': return `padding: var(--space6XL);`
  }
}

/**
 * Generate margin-left CSS based on spacing value
 */
export function getMarginLeftCSS(value: SpacingValue): string {
  return `margin-left: ${spacingValueToVar(value)};`
}

/**
 * Generate margin-right CSS based on spacing value
 */
export function getMarginRightCSS(value: SpacingValue): string {
  return `margin-right: ${spacingValueToVar(value)};`
}

/**
 * Generate margin-top CSS based on spacing value
 */
export function getMarginTopCSS(value: SpacingValue): string {
  return `margin-top: ${spacingValueToVar(value)};`
}

/**
 * Generate margin-bottom CSS based on spacing value
 */
export function getMarginBottomCSS(value: SpacingValue): string {
  return `margin-bottom: ${spacingValueToVar(value)};`
}

/**
 * Generate padding-left CSS based on spacing value
 */
export function getPaddingLeftCSS(value: SpacingValue): string {
  return `padding-left: ${spacingValueToVar(value)};`
}

/**
 * Generate padding-right CSS based on spacing value
 */
export function getPaddingRightCSS(value: SpacingValue): string {
  return `padding-right: ${spacingValueToVar(value)};`
}

/**
 * Generate padding-top CSS based on spacing value
 */
export function getPaddingTopCSS(value: SpacingValue): string {
  return `padding-top: ${spacingValueToVar(value)};`
}

/**
 * Generate padding-bottom CSS based on spacing value
 */
export function getPaddingBottomCSS(value: SpacingValue): string {
  return `padding-bottom: ${spacingValueToVar(value)};`
}

/**
 * Generate CSS template literal string for spacing props (deprecated - use generateSpacingMixin for Next Yak)
 */
export function generateSpacingCSS(props: SpacingProps): string {
  const cssLines: string[] = []

  // Process in consistent order for testing
  // All margin props first
  if (props.m) cssLines.push(`margin: ${spacingValueToVar(props.m)};`)
  if (props.mx) {
    cssLines.push(`margin-left: ${spacingValueToVar(props.mx)};`)
    cssLines.push(`margin-right: ${spacingValueToVar(props.mx)};`)
  }
  if (props.my) {
    cssLines.push(`margin-top: ${spacingValueToVar(props.my)};`)
    cssLines.push(`margin-bottom: ${spacingValueToVar(props.my)};`)
  }
  // Individual margin props override composite ones
  if (props.ml) cssLines.push(`margin-left: ${spacingValueToVar(props.ml)};`)
  if (props.mr) cssLines.push(`margin-right: ${spacingValueToVar(props.mr)};`)
  if (props.mt) cssLines.push(`margin-top: ${spacingValueToVar(props.mt)};`)
  if (props.mb) cssLines.push(`margin-bottom: ${spacingValueToVar(props.mb)};`)

  // All padding props second  
  if (props.p) cssLines.push(`padding: ${spacingValueToVar(props.p)};`)
  if (props.px) {
    cssLines.push(`padding-left: ${spacingValueToVar(props.px)};`)
    cssLines.push(`padding-right: ${spacingValueToVar(props.px)};`)
  }
  if (props.py) {
    cssLines.push(`padding-top: ${spacingValueToVar(props.py)};`)
    cssLines.push(`padding-bottom: ${spacingValueToVar(props.py)};`)
  }
  // Individual padding props override composite ones
  if (props.pl) cssLines.push(`padding-left: ${spacingValueToVar(props.pl)};`)
  if (props.pr) cssLines.push(`padding-right: ${spacingValueToVar(props.pr)};`)
  if (props.pt) cssLines.push(`padding-top: ${spacingValueToVar(props.pt)};`)
  if (props.pb) cssLines.push(`padding-bottom: ${spacingValueToVar(props.pb)};`)

  return cssLines.join('\n  ')
}

/**
 * Generate CSS styles object for spacing props (kept for backward compatibility)
 */
export function generateSpacingStyles(props: SpacingProps): Record<string, string> {
  const styles: Record<string, string> = {}

  // Margin props
  if (props.m) styles.margin = spacingValueToVar(props.m)
  if (props.mx) {
    styles.marginLeft = spacingValueToVar(props.mx)
    styles.marginRight = spacingValueToVar(props.mx)
  }
  if (props.my) {
    styles.marginTop = spacingValueToVar(props.my)
    styles.marginBottom = spacingValueToVar(props.my)
  }
  // Individual margin props override composite ones
  if (props.ml) styles.marginLeft = spacingValueToVar(props.ml)
  if (props.mr) styles.marginRight = spacingValueToVar(props.mr)
  if (props.mt) styles.marginTop = spacingValueToVar(props.mt)
  if (props.mb) styles.marginBottom = spacingValueToVar(props.mb)

  // Padding props
  if (props.p) styles.padding = spacingValueToVar(props.p)
  if (props.px) {
    styles.paddingLeft = spacingValueToVar(props.px)
    styles.paddingRight = spacingValueToVar(props.px)
  }
  if (props.py) {
    styles.paddingTop = spacingValueToVar(props.py)
    styles.paddingBottom = spacingValueToVar(props.py)
  }
  // Individual padding props override composite ones
  if (props.pl) styles.paddingLeft = spacingValueToVar(props.pl)
  if (props.pr) styles.paddingRight = spacingValueToVar(props.pr)
  if (props.pt) styles.paddingTop = spacingValueToVar(props.pt)
  if (props.pb) styles.paddingBottom = spacingValueToVar(props.pb)

  return styles
}