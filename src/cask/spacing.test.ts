/// <reference types="vitest/globals" />
import { spacingValueToVar, generateSpacingStyles, generateSpacingCSS } from './spacing'

describe('Spacing utilities', () => {
  describe('spacingValueToVar', () => {
    it('converts spacing values to CSS variables correctly', () => {
      expect(spacingValueToVar('0')).toBe('var(--space0)')
      expect(spacingValueToVar('1')).toBe('var(--space)')
      expect(spacingValueToVar('xxs')).toBe('var(--spaceXXS)')
      expect(spacingValueToVar('xs')).toBe('var(--spaceXS)')
      expect(spacingValueToVar('s')).toBe('var(--spaceS)')
      expect(spacingValueToVar('m')).toBe('var(--spaceM)')
      expect(spacingValueToVar('l')).toBe('var(--spaceL)')
      expect(spacingValueToVar('xl')).toBe('var(--spaceXL)')
      expect(spacingValueToVar('xxl')).toBe('var(--spaceXXL)')
      expect(spacingValueToVar('3xl')).toBe('var(--space3XL)')
      expect(spacingValueToVar('4xl')).toBe('var(--space4XL)')
      expect(spacingValueToVar('5xl')).toBe('var(--space5XL)')
      expect(spacingValueToVar('6xl')).toBe('var(--space6XL)')
    })
  })

  describe('generateSpacingStyles', () => {
    it('generates no styles for empty props', () => {
      const styles = generateSpacingStyles({})
      expect(styles).toEqual({})
    })

    it('generates margin styles correctly', () => {
      const styles = generateSpacingStyles({ m: 'l' })
      expect(styles).toEqual({
        margin: 'var(--spaceL)'
      })
    })

    it('generates padding styles correctly', () => {
      const styles = generateSpacingStyles({ p: 'xl' })
      expect(styles).toEqual({
        padding: 'var(--spaceXL)'
      })
    })

    it('generates directional margin styles', () => {
      const styles = generateSpacingStyles({
        ml: 's',
        mr: 'm',
        mt: 'l',
        mb: 'xl'
      })
      expect(styles).toEqual({
        marginLeft: 'var(--spaceS)',
        marginRight: 'var(--spaceM)',
        marginTop: 'var(--spaceL)',
        marginBottom: 'var(--spaceXL)'
      })
    })

    it('generates directional padding styles', () => {
      const styles = generateSpacingStyles({
        pl: 'xs',
        pr: 's',
        pt: 'm',
        pb: 'l'
      })
      expect(styles).toEqual({
        paddingLeft: 'var(--spaceXS)',
        paddingRight: 'var(--spaceS)',
        paddingTop: 'var(--spaceM)',
        paddingBottom: 'var(--spaceL)'
      })
    })

    it('generates composite margin styles (mx, my)', () => {
      const styles = generateSpacingStyles({
        mx: 'm',
        my: 'l'
      })
      expect(styles).toEqual({
        marginLeft: 'var(--spaceM)',
        marginRight: 'var(--spaceM)',
        marginTop: 'var(--spaceL)',
        marginBottom: 'var(--spaceL)'
      })
    })

    it('generates composite padding styles (px, py)', () => {
      const styles = generateSpacingStyles({
        px: 's',
        py: 'xl'
      })
      expect(styles).toEqual({
        paddingLeft: 'var(--spaceS)',
        paddingRight: 'var(--spaceS)',
        paddingTop: 'var(--spaceXL)',
        paddingBottom: 'var(--spaceXL)'
      })
    })

    it('individual props override composite props', () => {
      const styles = generateSpacingStyles({
        mx: 'm',    // Should be overridden by ml
        ml: 'xl',   // Should override mx for left margin
        py: 's',    // Should be overridden by pt
        pt: 'l'     // Should override py for top padding
      })
      expect(styles).toEqual({
        marginLeft: 'var(--spaceXL)',   // ml overrides mx
        marginRight: 'var(--spaceM)',   // from mx
        paddingTop: 'var(--spaceL)',    // pt overrides py
        paddingBottom: 'var(--spaceS)', // from py
      })
    })

    it('handles all spacing props together', () => {
      const styles = generateSpacingStyles({
        m: 'xs',
        p: 's',
        ml: 'l',
        pt: 'xl'
      })
      expect(styles).toEqual({
        margin: 'var(--spaceXS)',
        padding: 'var(--spaceS)',
        marginLeft: 'var(--spaceL)',    // Should override margin shorthand
        paddingTop: 'var(--spaceXL)'    // Should override padding shorthand
      })
    })

    it('handles zero spacing value', () => {
      const styles = generateSpacingStyles({
        m: '0',
        p: '1'
      })
      expect(styles).toEqual({
        margin: 'var(--space0)',
        padding: 'var(--space)'
      })
    })
  })

  describe('generateSpacingCSS', () => {
    it('generates no CSS for empty props', () => {
      const css = generateSpacingCSS({})
      expect(css).toBe('')
    })

    it('generates CSS for margin props', () => {
      const css = generateSpacingCSS({ m: 'l' })
      expect(css).toBe('margin: var(--spaceL);')
    })

    it('generates CSS for padding props', () => {
      const css = generateSpacingCSS({ p: 'xl' })
      expect(css).toBe('padding: var(--spaceXL);')
    })

    it('generates CSS for directional margin props', () => {
      const css = generateSpacingCSS({
        ml: 's',
        mr: 'm',
        mt: 'l',
        mb: 'xl'
      })
      expect(css).toBe([
        'margin-left: var(--spaceS);',
        'margin-right: var(--spaceM);',
        'margin-top: var(--spaceL);',
        'margin-bottom: var(--spaceXL);'
      ].join('\n  '))
    })

    it('generates CSS for composite props', () => {
      const css = generateSpacingCSS({
        mx: 'm',
        py: 'l'
      })
      expect(css).toBe([
        'margin-left: var(--spaceM);',
        'margin-right: var(--spaceM);',
        'padding-top: var(--spaceL);',
        'padding-bottom: var(--spaceL);'
      ].join('\n  '))
    })

    it('individual props override composite props in CSS', () => {
      const css = generateSpacingCSS({
        mx: 'm',    // Should be overridden by ml
        ml: 'xl',   // Should override mx for left margin
        py: 's',    // Should be overridden by pt
        pt: 'l'     // Should override py for top padding
      })
      expect(css).toBe([
        'margin-left: var(--spaceM);',  // from mx
        'margin-right: var(--spaceM);', // from mx
        'margin-left: var(--spaceXL);', // ml overrides mx
        'padding-top: var(--spaceS);',  // from py
        'padding-bottom: var(--spaceS);', // from py
        'padding-top: var(--spaceL);'   // pt overrides py
      ].join('\n  '))
    })

    it('generates CSS for all spacing props together', () => {
      const css = generateSpacingCSS({
        m: 'xs',
        p: 's',
        ml: 'l',
        pt: 'xl'
      })
      expect(css).toBe([
        'margin: var(--spaceXS);',
        'margin-left: var(--spaceL);',
        'padding: var(--spaceS);',
        'padding-top: var(--spaceXL);'
      ].join('\n  '))
    })
  })
})