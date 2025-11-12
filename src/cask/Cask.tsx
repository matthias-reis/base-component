import type { ComponentProps, ElementType, ReactNode } from 'react'

type PolymorphicProps<T extends ElementType = ElementType> = {
  as?: T
  children?: ReactNode
} & ComponentProps<T>

export function Cask<T extends ElementType = 'div'>({
  as,
  children,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'div'
  
  return <Component {...props}>{children}</Component>
}