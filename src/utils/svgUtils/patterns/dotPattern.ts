import dotSVGBackGround from "@/utils/svgUtils/backgrounds/dotSVGBackGround";
import inlineSVGString from "@/utils/svgUtils/inlineSVGString";
import { fabric } from "fabric";

type DotPatternArgs = {
  fill?: string;
  objColor?: string;
};

const dotPattern = ({ fill, objColor }: DotPatternArgs) => {
  return new fabric.Pattern({
    source: inlineSVGString({
      svgString: dotSVGBackGround({
        fill: fill,
        circleColor: objColor,
      }),
    }),
    repeat: "repeat",
  });
};

export default dotPattern;
