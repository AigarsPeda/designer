import { BACKGROUND_COLORS, COLORS, TRANSPARENT_COLOR } from "@/hardcoded";
import dotPattern from "@/utils/svgUtils/patterns/dotPattern";
import { fabric } from "fabric";

// const TRANSPARENT_COLOR = "transparent";

const createAllPatterns = () => {
  const patterns: Record<string, fabric.Pattern> = {};
  const colorsWithTransparent = [...COLORS, TRANSPARENT_COLOR];
  const backgroundWithTransparent = [...BACKGROUND_COLORS, TRANSPARENT_COLOR];

  // create all possible patterns
  colorsWithTransparent.forEach((color) => {
    backgroundWithTransparent.forEach((backgroundColor) => {
      patterns[`${color}-${backgroundColor}`] = dotPattern({
        fill: backgroundColor,
        objColor: color,
      });
    });
  });

  return patterns;
};

export default createAllPatterns;
