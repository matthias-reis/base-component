import type { ComponentProps, ElementType, ReactNode, CSSProperties } from 'react'
import { SpacingProps, spacingValueToVar } from './spacing'

type PolymorphicProps<T extends ElementType = ElementType> = {
  as?: T
  children?: ReactNode
} & ComponentProps<T> & SpacingProps

// Generate spacing styles using CSS variables (Next Yak compatible)
function generateSpacingStyles(spacing: SpacingProps): CSSProperties {
  const styles: CSSProperties = {}
  
  // Margin props
  if (spacing.m) styles.margin = spacingValueToVar(spacing.m)
  if (spacing.mx) {
    styles.marginLeft = spacingValueToVar(spacing.mx)
    styles.marginRight = spacingValueToVar(spacing.mx)
  }
  if (spacing.my) {
    styles.marginTop = spacingValueToVar(spacing.my)
    styles.marginBottom = spacingValueToVar(spacing.my)
  }
  // Individual margin props override composite ones
  if (spacing.ml) styles.marginLeft = spacingValueToVar(spacing.ml)
  if (spacing.mr) styles.marginRight = spacingValueToVar(spacing.mr)
  if (spacing.mt) styles.marginTop = spacingValueToVar(spacing.mt)
  if (spacing.mb) styles.marginBottom = spacingValueToVar(spacing.mb)

  // Padding props  
  if (spacing.p) styles.padding = spacingValueToVar(spacing.p)
  if (spacing.px) {
    styles.paddingLeft = spacingValueToVar(spacing.px)
    styles.paddingRight = spacingValueToVar(spacing.px)
  }
  if (spacing.py) {
    styles.paddingTop = spacingValueToVar(spacing.py)
    styles.paddingBottom = spacingValueToVar(spacing.py)
  }
  // Individual padding props override composite ones
  if (spacing.pl) styles.paddingLeft = spacingValueToVar(spacing.pl)
  if (spacing.pr) styles.paddingRight = spacingValueToVar(spacing.pr)
  if (spacing.pt) styles.paddingTop = spacingValueToVar(spacing.pt)
  if (spacing.pb) styles.paddingBottom = spacingValueToVar(spacing.pb)

  return styles
}

export function Cask<T extends ElementType = 'div'>({
  as,
  children,
  style,
  // Spacing props
  m, ml, mr, mt, mb, mx, my,
  p, pl, pr, pt, pb, px, py,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'div'
  
  // Extract spacing props
  const spacingProps = { m, ml, mr, mt, mb, mx, my, p, pl, pr, pt, pb, px, py }
  
  // Generate spacing styles using CSS variables
  const spacingStyles = generateSpacingStyles(spacingProps)
  
  // Merge with existing style prop (style prop takes precedence)
  const mergedStyle = {
    ...spacingStyles,
    ...style,
  }
  
  // Only apply style if we have styles to apply
  const finalStyle = Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined
  
  return (
    <Component 
      style={finalStyle}
      {...props}
    >
      {children}
    </Component>
  )
}