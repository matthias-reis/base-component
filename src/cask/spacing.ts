// Spacing system type definitions and utilities

/**
 * Valid spacing scale values mapping to CSS custom properties
 */
export type SpacingValue =
  | "0"
  | "1"
  | "xxs"
  | "xs"
  | "s"
  | "m"
  | "l"
  | "xl"
  | "xxl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

/**
 * Margin properties for the Cask component
 */
export interface MarginProps {
  /** All margins */
  m?: SpacingValue;
  /** Margin left */
  ml?: SpacingValue;
  /** Margin right */
  mr?: SpacingValue;
  /** Margin top */
  mt?: SpacingValue;
  /** Margin bottom */
  mb?: SpacingValue;
  /** Margin inline (left and right) */
  mx?: SpacingValue;
  /** Margin block (top and bottom) */
  my?: SpacingValue;
}

/**
 * Padding properties for the Cask component
 */
export interface PaddingProps {
  /** All padding */
  p?: SpacingValue;
  /** Padding left */
  pl?: SpacingValue;
  /** Padding right */
  pr?: SpacingValue;
  /** Padding top */
  pt?: SpacingValue;
  /** Padding bottom */
  pb?: SpacingValue;
  /** Padding inline (left and right) */
  px?: SpacingValue;
  /** Padding block (top and bottom) */
  py?: SpacingValue;
}

/**
 * Combined spacing properties (margin and padding)
 */
export interface SpacingProps extends MarginProps, PaddingProps {}

/**
 * Map spacing prop values to CSS variable names
 */
const spacingValueToCSSVar: Record<SpacingValue, string> = {
  "0": "--space0",
  "1": "--space",
  xxs: "--spaceXXS",
  xs: "--spaceXS",
  s: "--spaceS",
  m: "--spaceM",
  l: "--spaceL",
  xl: "--spaceXL",
  xxl: "--spaceXXL",
  "3xl": "--space3XL",
  "4xl": "--space4XL",
  "5xl": "--space5XL",
  "6xl": "--space6XL",
};

/**
 * Convert spacing value to CSS custom property reference
 * @param value - The spacing value key
 * @returns CSS var() reference string
 */
export function spacingValueToVar(value: SpacingValue): string {
  return `var(${spacingValueToCSSVar[value]})`;
}

/**
 * Generate CSS template literal string for spacing props
 * Follows cascade order: m → mx/my → ml/mr/mt/mb → p → px/py → pl/pr/pt/pb
 * Individual props override composite props
 * @param props - Spacing props to convert to CSS
 * @returns CSS string for use in Next Yak css template
 */
export function generateSpacingCSS(props: SpacingProps): string {
  const cssLines: string[] = [];

  // Margin props in cascade order
  if (props.m) cssLines.push(`margin: ${spacingValueToVar(props.m)};`);
  if (props.mx) {
    cssLines.push(`margin-left: ${spacingValueToVar(props.mx)};`);
    cssLines.push(`margin-right: ${spacingValueToVar(props.mx)};`);
  }
  if (props.my) {
    cssLines.push(`margin-top: ${spacingValueToVar(props.my)};`);
    cssLines.push(`margin-bottom: ${spacingValueToVar(props.my)};`);
  }
  // Individual margin props override composite ones
  if (props.ml) cssLines.push(`margin-left: ${spacingValueToVar(props.ml)};`);
  if (props.mr) cssLines.push(`margin-right: ${spacingValueToVar(props.mr)};`);
  if (props.mt) cssLines.push(`margin-top: ${spacingValueToVar(props.mt)};`);
  if (props.mb) cssLines.push(`margin-bottom: ${spacingValueToVar(props.mb)};`);

  // Padding props in cascade order
  if (props.p) cssLines.push(`padding: ${spacingValueToVar(props.p)};`);
  if (props.px) {
    cssLines.push(`padding-left: ${spacingValueToVar(props.px)};`);
    cssLines.push(`padding-right: ${spacingValueToVar(props.px)};`);
  }
  if (props.py) {
    cssLines.push(`padding-top: ${spacingValueToVar(props.py)};`);
    cssLines.push(`padding-bottom: ${spacingValueToVar(props.py)};`);
  }
  // Individual padding props override composite ones
  if (props.pl) cssLines.push(`padding-left: ${spacingValueToVar(props.pl)};`);
  if (props.pr) cssLines.push(`padding-right: ${spacingValueToVar(props.pr)};`);
  if (props.pt) cssLines.push(`padding-top: ${spacingValueToVar(props.pt)};`);
  if (props.pb)
    cssLines.push(`padding-bottom: ${spacingValueToVar(props.pb)};`);

  return cssLines.join("\n  ");
}
