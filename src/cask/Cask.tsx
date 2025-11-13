import type { ComponentProps, ElementType, ReactNode } from 'react'
import { generateSpacingStyles, SpacingProps } from './spacing'

type PolymorphicProps<T extends ElementType = ElementType> = {
  as?: T
  children?: ReactNode
} & ComponentProps<T> & SpacingProps

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
  
  // Generate spacing styles
  const spacingStyles = generateSpacingStyles(spacingProps)
  
  // Merge spacing styles with existing style prop
  const mergedStyle = {
    ...spacingStyles,
    ...style,
  }
  
  return (
    <Component 
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
      {...props}
    >
      {children}
    </Component>
  )
}