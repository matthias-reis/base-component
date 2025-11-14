import { css } from "next-yak";
import type { ComponentProps, ElementType, ReactNode } from "react";
import type { SpacingProps } from "./spacing";
import { generateSpacingCSS } from "./spacing";

type PolymorphicProps<T extends ElementType = ElementType> = {
  as?: T;
  children?: ReactNode;
} & SpacingProps &
  ComponentProps<T>;

export function Cask<T extends ElementType = "div">({
  as,
  children,
  m,
  ml,
  mr,
  mt,
  mb,
  mx,
  my,
  p,
  pl,
  pr,
  pt,
  pb,
  px,
  py,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || "div";
  const spacingProps = { m, ml, mr, mt, mb, mx, my, p, pl, pr, pt, pb, px, py };

  return (
    <Component
      {...props}
      css={css`
        ${generateSpacingCSS(spacingProps)}
      `}
    >
      {children}
    </Component>
  );
}
