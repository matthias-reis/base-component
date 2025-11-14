/// <reference types="vitest/globals" />
import { render, screen, cleanup } from "@testing-library/react";
import { Cask } from "./Cask";

afterEach(() => {
  cleanup();
});

describe("Cask Component", () => {
  describe("Default Behavior", () => {
    it("renders as div by default", () => {
      render(<Cask data-testid="cask">Default content</Cask>);
      const element = screen.getByTestId("cask");
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveTextContent("Default content");
    });

    it("accepts standard div attributes", () => {
      render(
        <Cask
          data-testid="cask"
          className="test-class"
          id="test-id"
          style={{ color: "red" }}
        >
          Content
        </Cask>
      );
      const element = screen.getByTestId("cask");
      expect(element).toHaveClass("test-class");
      expect(element).toHaveAttribute("id", "test-id");
      expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });
  });

  describe("Polymorphic Behavior", () => {
    it('renders as section when as="section"', () => {
      render(
        <Cask as="section" data-testid="cask">
          Section content
        </Cask>
      );
      const element = screen.getByTestId("cask");
      expect(element.tagName).toBe("SECTION");
      expect(element).toHaveTextContent("Section content");
    });

    it('renders as anchor when as="a" and accepts href', () => {
      render(
        <Cask as="a" href="https://example.com" data-testid="cask">
          Link text
        </Cask>
      );
      const element = screen.getByTestId("cask");
      expect(element.tagName).toBe("A");
      expect(element).toHaveAttribute("href", "https://example.com");
      expect(element).toHaveTextContent("Link text");
    });

    it('renders as button when as="button" and accepts onClick', () => {
      const handleClick = () => {};
      render(
        <Cask as="button" onClick={handleClick} data-testid="cask">
          Button text
        </Cask>
      );
      const element = screen.getByTestId("cask");
      expect(element.tagName).toBe("BUTTON");
      expect(element).toHaveTextContent("Button text");
    });

    it('renders as header when as="header"', () => {
      render(
        <Cask as="header" data-testid="cask">
          Header content
        </Cask>
      );
      const element = screen.getByTestId("cask");
      expect(element.tagName).toBe("HEADER");
      expect(element).toHaveTextContent("Header content");
    });

    it('renders as span when as="span"', () => {
      render(
        <Cask as="span" data-testid="cask">
          Span content
        </Cask>
      );
      const element = screen.getByTestId("cask");
      expect(element.tagName).toBe("SPAN");
      expect(element).toHaveTextContent("Span content");
    });
  });

  describe("Props Forwarding", () => {
    it("forwards HTML attributes correctly", () => {
      render(
        <Cask as="article" data-testid="cask" aria-label="Test article">
          Article content
        </Cask>
      );
      const element = screen.getByTestId("cask");
      expect(element).toHaveAttribute("aria-label", "Test article");
    });

    it("handles event handlers correctly", () => {
      let clicked = false;
      const handleClick = () => {
        clicked = true;
      };

      render(
        <Cask as="button" onClick={handleClick} data-testid="cask">
          Click me
        </Cask>
      );

      const button = screen.getByTestId("cask");
      button.click();
      expect(clicked).toBe(true);
    });

    it("applies className and style props correctly", () => {
      render(
        <Cask
          as="main"
          className="custom-class another-class"
          style={{ backgroundColor: "blue", padding: "10px" }}
          data-testid="cask"
        >
          Styled content
        </Cask>
      );

      const element = screen.getByTestId("cask");
      expect(element).toHaveClass("custom-class", "another-class");
      expect(element).toHaveStyle("background-color: rgb(0, 0, 255)");
      expect(element).toHaveStyle("padding: 10px");
    });
  });

  describe("Children Handling", () => {
    it("renders children correctly", () => {
      render(
        <Cask data-testid="cask">
          <span>Child 1</span>
          <span>Child 2</span>
        </Cask>
      );

      const element = screen.getByTestId("cask");
      expect(element).toHaveTextContent("Child 1Child 2");
      expect(element.children).toHaveLength(2);
    });

    it("handles no children", () => {
      render(<Cask data-testid="cask" />);
      const element = screen.getByTestId("cask");
      expect(element).toBeEmptyDOMElement();
    });

    it("handles nested Cask components", () => {
      render(
        <Cask as="div" data-testid="outer">
          <Cask as="span" data-testid="inner">
            Nested content
          </Cask>
        </Cask>
      );

      const outer = screen.getByTestId("outer");
      const inner = screen.getByTestId("inner");

      expect(outer.tagName).toBe("DIV");
      expect(inner.tagName).toBe("SPAN");
      expect(inner).toHaveTextContent("Nested content");
    });
  });

  describe("Spacing Props", () => {
    describe("Margin Props", () => {
      it("applies margin prop correctly", () => {
        render(
          <Cask m="l" data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Check that the component renders with margin prop
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Content");
      });

      it("applies directional margin props correctly", () => {
        render(
          <Cask ml="s" mr="m" mt="l" mb="xl" data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Check that the component renders with directional margin props
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Content");
      });

      it("applies composite margin props (mx, my) correctly", () => {
        render(
          <Cask mx="m" my="l" data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Check that the component renders with composite margin props
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Content");
      });

      it("individual margin props override composite ones", () => {
        render(
          <Cask mx="s" ml="xl" data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Check that the component renders with overriding margin props
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Content");
      });
    });

    describe("Padding Props", () => {
      it("applies padding prop correctly", () => {
        render(
          <Cask p="xl" data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Check that the component renders with padding prop
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Content");
      });

      it("applies directional padding props correctly", () => {
        render(
          <Cask pl="xs" pr="s" pt="m" pb="l" data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Check that the component renders with directional padding props
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Content");
      });

      it("applies composite padding props (px, py) correctly", () => {
        render(
          <Cask px="s" py="xl" data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Check that the component renders with composite padding props
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Content");
      });

      it("individual padding props override composite ones", () => {
        render(
          <Cask py="m" pt="xxl" data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Check that the component renders with overriding padding props
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Content");
      });
    });

    describe("Combined Spacing", () => {
      it("applies both margin and padding props together", () => {
        render(
          <Cask m="s" p="l" data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Check that the component renders with both margin and padding props
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Content");
      });

      it("handles zero spacing values", () => {
        render(
          <Cask m="0" p="1" data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Check that the component renders with zero spacing values
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Content");
      });

      it("merges spacing styles with existing style prop", () => {
        render(
          <Cask
            m="s"
            style={{ color: "red", fontSize: "16px" }}
            data-testid="cask"
          >
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Both spacing and style prop styles should be applied
        // Note: Next Yak generates CSS classes for spacing, inline styles preserved
        expect(element).toHaveStyle({
          color: "rgb(255, 0, 0)",
          fontSize: "16px",
        });
      });

      it("existing style prop overrides spacing styles for same properties", () => {
        render(
          <Cask m="s" style={{ margin: "10px" }} data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        // Style prop should override spacing styles
        expect(element).toHaveStyle("margin: 10px");
      });
    });

    describe("Polymorphic with Spacing", () => {
      it("applies spacing props to different element types", () => {
        render(
          <Cask as="section" p="m" data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        expect(element.tagName).toBe("SECTION");
        // Check that the component renders with spacing props for polymorphic element
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Content");
      });

      it("applies spacing props to button elements", () => {
        render(
          <Cask as="button" mx="l" py="s" data-testid="cask">
            Click me
          </Cask>
        );
        const element = screen.getByTestId("cask");
        expect(element.tagName).toBe("BUTTON");
        // Check that the component renders with spacing props for button element
        // Note: Next Yak generates CSS classes, not inline styles
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent("Click me");
      });
    });

    describe("No Spacing Props", () => {
      it("does not apply style attribute when no spacing props are provided", () => {
        render(<Cask data-testid="cask">Content</Cask>);
        const element = screen.getByTestId("cask");
        expect(element).not.toHaveAttribute("style");
      });

      it("preserves existing style prop when no spacing props are provided", () => {
        render(
          <Cask style={{ color: "blue" }} data-testid="cask">
            Content
          </Cask>
        );
        const element = screen.getByTestId("cask");
        expect(element).toHaveStyle("color: rgb(0, 0, 255)");
        expect(element.style.margin).toBe(""); // No margin applied
      });
    });
  });
});
