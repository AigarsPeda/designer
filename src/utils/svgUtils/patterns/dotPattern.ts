import dotSVGBackGround from "@/utils/svgUtils/backgrounds/dotSVGBackGround";
import inlineSVGString from "@/utils/svgUtils/inlineSVGString";
import { fabric } from "fabric";

type DotPatternArgs = {
  fill?: string;
  objColor?: string;
};

const dotPattern = ({ fill, objColor }: DotPatternArgs) => {
  const svg = dotSVGBackGround({
    fill: fill,
    circleColor: objColor,
  });

  const pattern = new fabric.Pattern({
    source: inlineSVGString({
      svgString: svg,
    }),
    repeat: "repeat",
  });

  return { pattern, svgString: svg };
};

export default dotPattern;
