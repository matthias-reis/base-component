import type { ComponentProps, ElementType, ReactNode } from 'react'
import { styled, css } from 'next-yak'
import { 
  SpacingProps, 
  getMarginCSS, 
  getPaddingCSS, 
  getMarginLeftCSS,
  getMarginRightCSS,
  getMarginTopCSS,
  getMarginBottomCSS,
  getPaddingLeftCSS,
  getPaddingRightCSS,
  getPaddingTopCSS,
  getPaddingBottomCSS,
  spacingValueToVar
} from './spacing'

type PolymorphicProps<T extends ElementType = ElementType> = {
  as?: T
  children?: ReactNode
} & ComponentProps<T> & SpacingProps

const StyledCask = styled.div<SpacingProps>`
  ${(props) => {
    // All margin props first
    if (props.m) {
      return css`${getMarginCSS(props.m)}`
    }
  }}
  
  ${(props) => {
    // Margin inline (mx) - applies to left and right
    if (props.mx) {
      return css`
        margin-left: ${spacingValueToVar(props.mx)};
        margin-right: ${spacingValueToVar(props.mx)};
      `
    }
  }}
  
  ${(props) => {
    // Margin block (my) - applies to top and bottom
    if (props.my) {
      return css`
        margin-top: ${spacingValueToVar(props.my)};
        margin-bottom: ${spacingValueToVar(props.my)};
      `
    }
  }}
  
  ${(props) => {
    // Individual margin props override composite ones
    if (props.ml) {
      return css`${getMarginLeftCSS(props.ml)}`
    }
  }}
  
  ${(props) => {
    if (props.mr) {
      return css`${getMarginRightCSS(props.mr)}`
    }
  }}
  
  ${(props) => {
    if (props.mt) {
      return css`${getMarginTopCSS(props.mt)}`
    }
  }}
  
  ${(props) => {
    if (props.mb) {
      return css`${getMarginBottomCSS(props.mb)}`
    }
  }}

  ${(props) => {
    // All padding props
    if (props.p) {
      return css`${getPaddingCSS(props.p)}`
    }
  }}
  
  ${(props) => {
    // Padding inline (px) - applies to left and right
    if (props.px) {
      return css`
        padding-left: ${spacingValueToVar(props.px)};
        padding-right: ${spacingValueToVar(props.px)};
      `
    }
  }}
  
  ${(props) => {
    // Padding block (py) - applies to top and bottom  
    if (props.py) {
      return css`
        padding-top: ${spacingValueToVar(props.py)};
        padding-bottom: ${spacingValueToVar(props.py)};
      `
    }
  }}
  
  ${(props) => {
    // Individual padding props override composite ones
    if (props.pl) {
      return css`${getPaddingLeftCSS(props.pl)}`
    }
  }}
  
  ${(props) => {
    if (props.pr) {
      return css`${getPaddingRightCSS(props.pr)}`
    }
  }}
  
  ${(props) => {
    if (props.pt) {
      return css`${getPaddingTopCSS(props.pt)}`
    }
  }}
  
  ${(props) => {
    if (props.pb) {
      return css`${getPaddingBottomCSS(props.pb)}`
    }
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
  // Extract spacing props
  const spacingProps = { m, ml, mr, mt, mb, mx, my, p, pl, pr, pt, pb, px, py }
  
  if (as) {
    // For polymorphic usage, we need to use styled with the specific component
    const StyledPolymorphic = styled(as as any)<SpacingProps>`
      ${(props) => {
        // All margin props first
        if (props.m) {
          return css`${getMarginCSS(props.m)}`
        }
      }}
      
      ${(props) => {
        // Margin inline (mx) - applies to left and right
        if (props.mx) {
          return css`
            margin-left: ${spacingValueToVar(props.mx)};
            margin-right: ${spacingValueToVar(props.mx)};
          `
        }
      }}
      
      ${(props) => {
        // Margin block (my) - applies to top and bottom
        if (props.my) {
          return css`
            margin-top: ${spacingValueToVar(props.my)};
            margin-bottom: ${spacingValueToVar(props.my)};
          `
        }
      }}
      
      ${(props) => {
        // Individual margin props override composite ones
        if (props.ml) {
          return css`${getMarginLeftCSS(props.ml)}`
        }
      }}
      
      ${(props) => {
        if (props.mr) {
          return css`${getMarginRightCSS(props.mr)}`
        }
      }}
      
      ${(props) => {
        if (props.mt) {
          return css`${getMarginTopCSS(props.mt)}`
        }
      }}
      
      ${(props) => {
        if (props.mb) {
          return css`${getMarginBottomCSS(props.mb)}`
        }
      }}

      ${(props) => {
        // All padding props
        if (props.p) {
          return css`${getPaddingCSS(props.p)}`
        }
      }}
      
      ${(props) => {
        // Padding inline (px) - applies to left and right
        if (props.px) {
          return css`
            padding-left: ${spacingValueToVar(props.px)};
            padding-right: ${spacingValueToVar(props.px)};
          `
        }
      }}
      
      ${(props) => {
        // Padding block (py) - applies to top and bottom  
        if (props.py) {
          return css`
            padding-top: ${spacingValueToVar(props.py)};
            padding-bottom: ${spacingValueToVar(props.py)};
          `
        }
      }}
      
      ${(props) => {
        // Individual padding props override composite ones
        if (props.pl) {
          return css`${getPaddingLeftCSS(props.pl)}`
        }
      }}
      
      ${(props) => {
        if (props.pr) {
          return css`${getPaddingRightCSS(props.pr)}`
        }
      }}
      
      ${(props) => {
        if (props.pt) {
          return css`${getPaddingTopCSS(props.pt)}`
        }
      }}
      
      ${(props) => {
        if (props.pb) {
          return css`${getPaddingBottomCSS(props.pb)}`
        }
      }}
    `
    
    return (
      <StyledPolymorphic {...spacingProps} {...props}>
        {children}
      </StyledPolymorphic>
    )
  }
  
  return (
    <StyledCask {...spacingProps} {...props}>
      {children}
    </StyledCask>
  )
}