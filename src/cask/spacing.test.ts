/// <reference types="vitest/globals" />
import { describe, expect, it } from "vitest";
import {
  generateSpacingCSS,
  type SpacingValue,
  spacingValueToVar,
} from "./spacing";

describe("Spacing Utilities", () => {
  describe("spacingValueToVar", () => {
    it('converts "0" to var(--space0)', () => {
      expect(spacingValueToVar("0")).toBe("var(--space0)");
    });

    it('converts "1" to var(--space)', () => {
      expect(spacingValueToVar("1")).toBe("var(--space)");
    });

    it('converts "xxs" to var(--spaceXXS)', () => {
      expect(spacingValueToVar("xxs")).toBe("var(--spaceXXS)");
    });

    it('converts "xs" to var(--spaceXS)', () => {
      expect(spacingValueToVar("xs")).toBe("var(--spaceXS)");
    });

    it('converts "s" to var(--spaceS)', () => {
      expect(spacingValueToVar("s")).toBe("var(--spaceS)");
    });

    it('converts "m" to var(--spaceM)', () => {
      expect(spacingValueToVar("m")).toBe("var(--spaceM)");
    });

    it('converts "l" to var(--spaceL)', () => {
      expect(spacingValueToVar("l")).toBe("var(--spaceL)");
    });

    it('converts "xl" to var(--spaceXL)', () => {
      expect(spacingValueToVar("xl")).toBe("var(--spaceXL)");
    });

    it('converts "xxl" to var(--spaceXXL)', () => {
      expect(spacingValueToVar("xxl")).toBe("var(--spaceXXL)");
    });

    it('converts "3xl" to var(--space3XL)', () => {
      expect(spacingValueToVar("3xl")).toBe("var(--space3XL)");
    });

    it('converts "4xl" to var(--space4XL)', () => {
      expect(spacingValueToVar("4xl")).toBe("var(--space4XL)");
    });

    it('converts "5xl" to var(--space5XL)', () => {
      expect(spacingValueToVar("5xl")).toBe("var(--space5XL)");
    });

    it('converts "6xl" to var(--space6XL)', () => {
      expect(spacingValueToVar("6xl")).toBe("var(--space6XL)");
    });
  });

  describe("generateSpacingCSS", () => {
    it("returns empty string for no props", () => {
      expect(generateSpacingCSS({})).toBe("");
    });

    describe("Single margin props", () => {
      it("generates CSS for m prop", () => {
        const css = generateSpacingCSS({ m: "xl" });
        expect(css).toBe("margin: var(--spaceXL);");
      });

      it("generates CSS for ml prop", () => {
        const css = generateSpacingCSS({ ml: "s" });
        expect(css).toBe("margin-left: var(--spaceS);");
      });

      it("generates CSS for mr prop", () => {
        const css = generateSpacingCSS({ mr: "m" });
        expect(css).toBe("margin-right: var(--spaceM);");
      });

      it("generates CSS for mt prop", () => {
        const css = generateSpacingCSS({ mt: "l" });
        expect(css).toBe("margin-top: var(--spaceL);");
      });

      it("generates CSS for mb prop", () => {
        const css = generateSpacingCSS({ mb: "xxl" });
        expect(css).toBe("margin-bottom: var(--spaceXXL);");
      });
    });

    describe("Composite margin props", () => {
      it("generates CSS for mx prop", () => {
        const css = generateSpacingCSS({ mx: "l" });
        expect(css).toBe(
          "margin-left: var(--spaceL);\n  margin-right: var(--spaceL);",
        );
      });

      it("generates CSS for my prop", () => {
        const css = generateSpacingCSS({ my: "xl" });
        expect(css).toBe(
          "margin-top: var(--spaceXL);\n  margin-bottom: var(--spaceXL);",
        );
      });
    });

    describe("Single padding props", () => {
      it("generates CSS for p prop", () => {
        const css = generateSpacingCSS({ p: "m" });
        expect(css).toBe("padding: var(--spaceM);");
      });

      it("generates CSS for pl prop", () => {
        const css = generateSpacingCSS({ pl: "xs" });
        expect(css).toBe("padding-left: var(--spaceXS);");
      });

      it("generates CSS for pr prop", () => {
        const css = generateSpacingCSS({ pr: "s" });
        expect(css).toBe("padding-right: var(--spaceS);");
      });

      it("generates CSS for pt prop", () => {
        const css = generateSpacingCSS({ pt: "l" });
        expect(css).toBe("padding-top: var(--spaceL);");
      });

      it("generates CSS for pb prop", () => {
        const css = generateSpacingCSS({ pb: "xl" });
        expect(css).toBe("padding-bottom: var(--spaceXL);");
      });
    });

    describe("Composite padding props", () => {
      it("generates CSS for px prop", () => {
        const css = generateSpacingCSS({ px: "m" });
        expect(css).toBe(
          "padding-left: var(--spaceM);\n  padding-right: var(--spaceM);",
        );
      });

      it("generates CSS for py prop", () => {
        const css = generateSpacingCSS({ py: "s" });
        expect(css).toBe(
          "padding-top: var(--spaceS);\n  padding-bottom: var(--spaceS);",
        );
      });
    });

    describe("Prop override precedence", () => {
      it("individual margin overrides m", () => {
        const css = generateSpacingCSS({ m: "xl", ml: "s" });
        expect(css).toContain("margin: var(--spaceXL);");
        expect(css).toContain("margin-left: var(--spaceS);");
        // Individual should come after composite in CSS cascade
        expect(css.indexOf("margin-left")).toBeGreaterThan(
          css.indexOf("margin: var"),
        );
      });

      it("individual margin overrides mx", () => {
        const css = generateSpacingCSS({ mx: "l", ml: "xs" });
        expect(css).toContain("margin-left: var(--spaceL);");
        expect(css).toContain("margin-right: var(--spaceL);");
        expect(css).toContain("margin-left: var(--spaceXS);");
        // Individual ml should come after mx
        const firstMl = css.indexOf("margin-left");
        const lastMl = css.lastIndexOf("margin-left");
        expect(lastMl).toBeGreaterThan(firstMl);
      });

      it("individual margin overrides my", () => {
        const css = generateSpacingCSS({ my: "xl", mt: "m" });
        expect(css).toContain("margin-top: var(--spaceXL);");
        expect(css).toContain("margin-bottom: var(--spaceXL);");
        expect(css).toContain("margin-top: var(--spaceM);");
        // Individual mt should come after my
        const firstMt = css.indexOf("margin-top");
        const lastMt = css.lastIndexOf("margin-top");
        expect(lastMt).toBeGreaterThan(firstMt);
      });

      it("individual padding overrides p", () => {
        const css = generateSpacingCSS({ p: "l", pt: "xxs" });
        expect(css).toContain("padding: var(--spaceL);");
        expect(css).toContain("padding-top: var(--spaceXXS);");
        expect(css.indexOf("padding-top")).toBeGreaterThan(
          css.indexOf("padding: var"),
        );
      });

      it("individual padding overrides px", () => {
        const css = generateSpacingCSS({ px: "s", pr: "xl" });
        expect(css).toContain("padding-left: var(--spaceS);");
        expect(css).toContain("padding-right: var(--spaceS);");
        expect(css).toContain("padding-right: var(--spaceXL);");
        const firstPr = css.indexOf("padding-right");
        const lastPr = css.lastIndexOf("padding-right");
        expect(lastPr).toBeGreaterThan(firstPr);
      });

      it("individual padding overrides py", () => {
        const css = generateSpacingCSS({ py: "m", pb: "3xl" });
        expect(css).toContain("padding-top: var(--spaceM);");
        expect(css).toContain("padding-bottom: var(--spaceM);");
        expect(css).toContain("padding-bottom: var(--space3XL);");
        const firstPb = css.indexOf("padding-bottom");
        const lastPb = css.lastIndexOf("padding-bottom");
        expect(lastPb).toBeGreaterThan(firstPb);
      });
    });

    describe("Combined margin and padding props", () => {
      it("generates CSS for both m and p", () => {
        const css = generateSpacingCSS({ m: "l", p: "s" });
        expect(css).toContain("margin: var(--spaceL);");
        expect(css).toContain("padding: var(--spaceS);");
        // Margin should come before padding
        expect(css.indexOf("margin")).toBeLessThan(css.indexOf("padding"));
      });

      it("generates CSS for mx and py", () => {
        const css = generateSpacingCSS({ mx: "xl", py: "m" });
        expect(css).toContain("margin-left: var(--spaceXL);");
        expect(css).toContain("margin-right: var(--spaceXL);");
        expect(css).toContain("padding-top: var(--spaceM);");
        expect(css).toContain("padding-bottom: var(--spaceM);");
      });

      it("generates CSS for all individual props", () => {
        const css = generateSpacingCSS({
          ml: "s",
          mr: "m",
          mt: "l",
          mb: "xl",
          pl: "xxs",
          pr: "xs",
          pt: "s",
          pb: "m",
        });
        expect(css).toContain("margin-left: var(--spaceS);");
        expect(css).toContain("margin-right: var(--spaceM);");
        expect(css).toContain("margin-top: var(--spaceL);");
        expect(css).toContain("margin-bottom: var(--spaceXL);");
        expect(css).toContain("padding-left: var(--spaceXXS);");
        expect(css).toContain("padding-right: var(--spaceXS);");
        expect(css).toContain("padding-top: var(--spaceS);");
        expect(css).toContain("padding-bottom: var(--spaceM);");
      });
    });

    describe("All spacing values", () => {
      const allValues: SpacingValue[] = [
        "0",
        "1",
        "xxs",
        "xs",
        "s",
        "m",
        "l",
        "xl",
        "xxl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
      ];

      allValues.forEach((value) => {
        it(`handles spacing value "${value}"`, () => {
          const css = generateSpacingCSS({ m: value });
          expect(css).toContain("margin:");
          expect(css).toContain(spacingValueToVar(value));
        });
      });
    });
  });
});
