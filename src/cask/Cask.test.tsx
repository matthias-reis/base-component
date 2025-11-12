/// <reference types="vitest/globals" />
import { render, screen, cleanup } from '@testing-library/react'
import { Cask } from './Cask'

afterEach(() => {
  cleanup()
})

describe('Cask Component', () => {
  describe('Default Behavior', () => {
    it('renders as div by default', () => {
      render(<Cask data-testid="cask">Default content</Cask>)
      const element = screen.getByTestId('cask')
      expect(element.tagName).toBe('DIV')
      expect(element).toHaveTextContent('Default content')
    })

    it('accepts standard div attributes', () => {
      render(
        <Cask 
          data-testid="cask" 
          className="test-class" 
          id="test-id"
          style={{ color: 'red' }}
        >
          Content
        </Cask>
      )
      const element = screen.getByTestId('cask')
      expect(element).toHaveClass('test-class')
      expect(element).toHaveAttribute('id', 'test-id')
      expect(element).toHaveStyle({ color: 'rgb(255, 0, 0)' })
    })
  })

  describe('Polymorphic Behavior', () => {
    it('renders as section when as="section"', () => {
      render(<Cask as="section" data-testid="cask">Section content</Cask>)
      const element = screen.getByTestId('cask')
      expect(element.tagName).toBe('SECTION')
      expect(element).toHaveTextContent('Section content')
    })

    it('renders as anchor when as="a" and accepts href', () => {
      render(
        <Cask as="a" href="https://example.com" data-testid="cask">
          Link text
        </Cask>
      )
      const element = screen.getByTestId('cask')
      expect(element.tagName).toBe('A')
      expect(element).toHaveAttribute('href', 'https://example.com')
      expect(element).toHaveTextContent('Link text')
    })

    it('renders as button when as="button" and accepts onClick', () => {
      const handleClick = () => {}
      render(
        <Cask as="button" onClick={handleClick} data-testid="cask">
          Button text
        </Cask>
      )
      const element = screen.getByTestId('cask')
      expect(element.tagName).toBe('BUTTON')
      expect(element).toHaveTextContent('Button text')
    })

    it('renders as header when as="header"', () => {
      render(<Cask as="header" data-testid="cask">Header content</Cask>)
      const element = screen.getByTestId('cask')
      expect(element.tagName).toBe('HEADER')
      expect(element).toHaveTextContent('Header content')
    })

    it('renders as span when as="span"', () => {
      render(<Cask as="span" data-testid="cask">Span content</Cask>)
      const element = screen.getByTestId('cask')
      expect(element.tagName).toBe('SPAN')
      expect(element).toHaveTextContent('Span content')
    })
  })

  describe('Props Forwarding', () => {
    it('forwards HTML attributes correctly', () => {
      render(
        <Cask 
          as="article" 
          data-testid="cask"
          aria-label="Test article"
        >
          Article content
        </Cask>
      )
      const element = screen.getByTestId('cask')
      expect(element).toHaveAttribute('aria-label', 'Test article')
    })

    it('handles event handlers correctly', () => {
      let clicked = false
      const handleClick = () => { clicked = true }
      
      render(
        <Cask as="button" onClick={handleClick} data-testid="cask">
          Click me
        </Cask>
      )
      
      const button = screen.getByTestId('cask')
      button.click()
      expect(clicked).toBe(true)
    })

    it('applies className and style props correctly', () => {
      render(
        <Cask 
          as="main"
          className="custom-class another-class"
          style={{ backgroundColor: 'blue', padding: '10px' }}
          data-testid="cask"
        >
          Styled content
        </Cask>
      )
      
      const element = screen.getByTestId('cask')
      expect(element).toHaveClass('custom-class', 'another-class')
      expect(element).toHaveStyle('background-color: rgb(0, 0, 255)')
      expect(element).toHaveStyle('padding: 10px')
    })
  })

  describe('Children Handling', () => {
    it('renders children correctly', () => {
      render(
        <Cask data-testid="cask">
          <span>Child 1</span>
          <span>Child 2</span>
        </Cask>
      )
      
      const element = screen.getByTestId('cask')
      expect(element).toHaveTextContent('Child 1Child 2')
      expect(element.children).toHaveLength(2)
    })

    it('handles no children', () => {
      render(<Cask data-testid="cask" />)
      const element = screen.getByTestId('cask')
      expect(element).toBeEmptyDOMElement()
    })

    it('handles nested Cask components', () => {
      render(
        <Cask as="div" data-testid="outer">
          <Cask as="span" data-testid="inner">
            Nested content
          </Cask>
        </Cask>
      )
      
      const outer = screen.getByTestId('outer')
      const inner = screen.getByTestId('inner')
      
      expect(outer.tagName).toBe('DIV')
      expect(inner.tagName).toBe('SPAN')
      expect(inner).toHaveTextContent('Nested content')
    })
  })
})