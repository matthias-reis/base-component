import type { ComponentProps, ElementType, ReactNode } from 'react'
import { styled } from 'next-yak'
import { SpacingProps, spacingValueToVar } from './spacing'

type PolymorphicProps<T extends ElementType = ElementType> = {
  as?: T
  children?: ReactNode
} & ComponentProps<T> & SpacingProps

// Create a styled component that handles all spacing
const StyledElement = styled.div<{ $spacing: SpacingProps }>`
  ${({ $spacing }) => {
    const styles: string[] = []
    
    // Margin props
    if ($spacing.m) styles.push(`margin: ${spacingValueToVar($spacing.m)};`)
    if ($spacing.mx) {
      styles.push(`margin-left: ${spacingValueToVar($spacing.mx)};`)
      styles.push(`margin-right: ${spacingValueToVar($spacing.mx)};`)
    }
    if ($spacing.my) {
      styles.push(`margin-top: ${spacingValueToVar($spacing.my)};`)
      styles.push(`margin-bottom: ${spacingValueToVar($spacing.my)};`)
    }
    if ($spacing.ml) styles.push(`margin-left: ${spacingValueToVar($spacing.ml)};`)
    if ($spacing.mr) styles.push(`margin-right: ${spacingValueToVar($spacing.mr)};`)
    if ($spacing.mt) styles.push(`margin-top: ${spacingValueToVar($spacing.mt)};`)
    if ($spacing.mb) styles.push(`margin-bottom: ${spacingValueToVar($spacing.mb)};`)

    // Padding props  
    if ($spacing.p) styles.push(`padding: ${spacingValueToVar($spacing.p)};`)
    if ($spacing.px) {
      styles.push(`padding-left: ${spacingValueToVar($spacing.px)};`)
      styles.push(`padding-right: ${spacingValueToVar($spacing.px)};`)
    }
    if ($spacing.py) {
      styles.push(`padding-top: ${spacingValueToVar($spacing.py)};`)
      styles.push(`padding-bottom: ${spacingValueToVar($spacing.py)};`)
    }
    if ($spacing.pl) styles.push(`padding-left: ${spacingValueToVar($spacing.pl)};`)
    if ($spacing.pr) styles.push(`padding-right: ${spacingValueToVar($spacing.pr)};`)
    if ($spacing.pt) styles.push(`padding-top: ${spacingValueToVar($spacing.pt)};`)
    if ($spacing.pb) styles.push(`padding-bottom: ${spacingValueToVar($spacing.pb)};`)

    return styles.join('\n  ')
  }}
`

export function Cask<T extends ElementType = 'div'>({
  as,
  children,
  // Spacing props
  m, ml, mr, mt, mb, mx, my,
  p, pl, pr, pt, pb, px, py,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'div'
  
  // Extract spacing props
  const spacingProps = { m, ml, mr, mt, mb, mx, my, p, pl, pr, pt, pb, px, py }
  
  // Check if any spacing props are defined
  const hasSpacing = Object.values(spacingProps).some(value => value !== undefined)
  
  // If we have spacing props, use the styled component
  if (hasSpacing) {
    return (
      <StyledElement 
        as={Component}
        $spacing={spacingProps}
        {...props}
      >
        {children}
      </StyledElement>
    )
  }
  
  // Otherwise use the regular component
  return (
    <Component {...props}>
      {children}
    </Component>
  )
}