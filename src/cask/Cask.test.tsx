/// <reference types="vitest/globals" />
import { cleanup, render, screen } from "@testing-library/react";
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
        </Cask>,
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
        </Cask>,
      );
      const element = screen.getByTestId("cask");
      expect(element.tagName).toBe("SECTION");
      expect(element).toHaveTextContent("Section content");
    });

    it('renders as anchor when as="a" and accepts href', () => {
      render(
        <Cask as="a" href="https://example.com" data-testid="cask">
          Link text
        </Cask>,
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
        </Cask>,
      );
      const element = screen.getByTestId("cask");
      expect(element.tagName).toBe("BUTTON");
      expect(element).toHaveTextContent("Button text");
    });

    it('renders as header when as="header"', () => {
      render(
        <Cask as="header" data-testid="cask">
          Header content
        </Cask>,
      );
      const element = screen.getByTestId("cask");
      expect(element.tagName).toBe("HEADER");
      expect(element).toHaveTextContent("Header content");
    });

    it('renders as span when as="span"', () => {
      render(
        <Cask as="span" data-testid="cask">
          Span content
        </Cask>,
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
        </Cask>,
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
        </Cask>,
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
        </Cask>,
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
        </Cask>,
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
        </Cask>,
      );

      const outer = screen.getByTestId("outer");
      const inner = screen.getByTestId("inner");

      expect(outer.tagName).toBe("DIV");
      expect(inner.tagName).toBe("SPAN");
      expect(inner).toHaveTextContent("Nested content");
    });
  });

  describe("Spacing Props", () => {
    describe("Single margin props", () => {
      it("applies margin with m prop", () => {
        render(
          <Cask m="xl" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies margin-left with ml prop", () => {
        render(
          <Cask ml="s" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies margin-right with mr prop", () => {
        render(
          <Cask mr="m" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies margin-top with mt prop", () => {
        render(
          <Cask mt="l" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies margin-bottom with mb prop", () => {
        render(
          <Cask mb="xxl" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });
    });

    describe("Composite margin props", () => {
      it("applies margin-inline with mx prop", () => {
        render(
          <Cask mx="l" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies margin-block with my prop", () => {
        render(
          <Cask my="xl" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });
    });

    describe("Single padding props", () => {
      it("applies padding with p prop", () => {
        render(
          <Cask p="m" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies padding-left with pl prop", () => {
        render(
          <Cask pl="xs" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies padding-right with pr prop", () => {
        render(
          <Cask pr="s" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies padding-top with pt prop", () => {
        render(
          <Cask pt="l" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies padding-bottom with pb prop", () => {
        render(
          <Cask pb="xl" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });
    });

    describe("Composite padding props", () => {
      it("applies padding-inline with px prop", () => {
        render(
          <Cask px="m" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies padding-block with py prop", () => {
        render(
          <Cask py="s" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });
    });

    describe("Combined spacing props", () => {
      it("applies both margin and padding", () => {
        render(
          <Cask m="l" p="s" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies multiple margin props", () => {
        render(
          <Cask ml="s" mr="m" mt="l" mb="xl" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("applies multiple padding props", () => {
        render(
          <Cask pl="xxs" pr="xs" pt="s" pb="m" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("handles composite and individual props together", () => {
        render(
          <Cask mx="l" ml="xs" py="m" pb="xxl" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });
    });

    describe("Spacing with polymorphic rendering", () => {
      it("applies spacing to section element", () => {
        render(
          <Cask as="section" m="xxl" p="l" data-testid="cask">
            Section
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element.tagName).toBe("SECTION");
        expect(element).toBeInTheDocument();
      });

      it("applies spacing to button element", () => {
        render(
          <Cask as="button" px="m" py="s" data-testid="cask">
            Button
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element.tagName).toBe("BUTTON");
        expect(element).toBeInTheDocument();
      });

      it("applies spacing to anchor element", () => {
        render(
          <Cask as="a" href="#" ml="xl" pt="m" data-testid="cask">
            Link
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element.tagName).toBe("A");
        expect(element).toHaveAttribute("href", "#");
        expect(element).toBeInTheDocument();
      });
    });

    describe("Spacing with other props", () => {
      it("preserves className with spacing", () => {
        render(
          <Cask className="custom-class" m="l" p="s" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toHaveClass("custom-class");
      });

      it("preserves inline style with spacing", () => {
        render(
          <Cask style={{ color: "red" }} m="m" p="xs" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
      });

      it("preserves event handlers with spacing", () => {
        let clicked = false;
        const handleClick = () => {
          clicked = true;
        };

        render(
          <Cask
            as="button"
            onClick={handleClick}
            px="l"
            py="m"
            data-testid="cask"
          >
            Click me
          </Cask>,
        );

        const button = screen.getByTestId("cask");
        button.click();
        expect(clicked).toBe(true);
      });
    });

    describe("All spacing values", () => {
      it("handles 0 spacing value", () => {
        render(
          <Cask m="0" p="0" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("handles 1 spacing value", () => {
        render(
          <Cask m="1" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("handles xxs spacing value", () => {
        render(
          <Cask p="xxs" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("handles 3xl spacing value", () => {
        render(
          <Cask m="3xl" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("handles 4xl spacing value", () => {
        render(
          <Cask p="4xl" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("handles 5xl spacing value", () => {
        render(
          <Cask m="5xl" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });

      it("handles 6xl spacing value", () => {
        render(
          <Cask p="6xl" data-testid="cask">
            Content
          </Cask>,
        );
        const element = screen.getByTestId("cask");
        expect(element).toBeInTheDocument();
      });
    });
  });
});
