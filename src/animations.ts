import { CSSProperties } from "react";

const baseAppearStyles: CSSProperties = {
  opacity: 0,
  animationDuration: "250ms",
  animationDelay: "250ms",
  animationFillMode: "forwards",
};

export const fadeInAppearStyles: CSSProperties = {
  ...baseAppearStyles,
  animationName: "fadein",
};

export const slideInAppearStyles: CSSProperties = {
  ...baseAppearStyles,
  animationName: "slidein",
};
